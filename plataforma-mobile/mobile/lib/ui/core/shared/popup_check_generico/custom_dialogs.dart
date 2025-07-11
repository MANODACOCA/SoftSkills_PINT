// ignore_for_file: use_build_context_synchronously

import 'package:flutter/material.dart';

/// Mostra um popup de sucesso genérico
Future<void> showSuccessDialog({
  required BuildContext context,
  String message = 'Operação realizada com sucesso!',
  Duration duration = const Duration(seconds: 1),
  IconData icon = Icons.check_circle,
  Color iconColor = Colors.green,
}) async {
  await showDialog(
    context: context,
    barrierDismissible: false,
    builder: (dialogCtx) {
      Future.delayed(duration, () {
        Navigator.of(dialogCtx).pop();
        });
      return AlertDialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
        contentPadding: const EdgeInsets.all(24),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, color: iconColor, size: 72),
            const SizedBox(height: 16),
            Text(
              message,
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
            ),
          ],
        ),
      );
    },
  );
}

/// Mostra um popup de confirmação genérico
Future<bool?> showConfirmDialog({
  required BuildContext context,
  String title = 'Aviso',
  String content = 'Tem certeza?',
  String confirmText = 'Sim',
  String cancelText = 'Não',
  Color confirmColor = Colors.green,
  Color cancelColor = Colors.red,
}) {
  return showDialog<bool>(
    context: context,
    builder: (context) => AlertDialog(
      title: Text(title),
      content: Text(content),
      actions: [
        TextButton(
          style: TextButton.styleFrom(backgroundColor: cancelColor),
          child: Text(cancelText, style: const TextStyle(color: Colors.white)),
          onPressed: () => Navigator.of(context).pop(false),
        ),
        TextButton(
          style: TextButton.styleFrom(backgroundColor: confirmColor),
          child: Text(confirmText, style: const TextStyle(color: Colors.white)),
          onPressed: () => Navigator.of(context).pop(true),
        ),
      ],
    ),
  );
}
