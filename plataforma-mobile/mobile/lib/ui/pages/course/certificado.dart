import 'package:mobile/ui/core/shared/base_comp/app_bar_arrow.dart';
import 'package:go_router/go_router.dart';
import '../../core/shared/export.dart';
import '../../../API/certificado_api.dart';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class CertificadoPage extends StatefulWidget {
  final int cursoId;
  final int formandoId;

  const CertificadoPage({
    super.key,
    required this.cursoId,
    required this.formandoId,
  });

  @override
  State<CertificadoPage> createState() => _CertificadoPageState();
}

class _CertificadoPageState extends State<CertificadoPage> {
  late final WebViewController _controller;
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(Colors.white);

    _loadHtml();
  }

  Future<void> _loadHtml() async {
    try {
      final html = await CertificadoApi().geraCertificado(widget.cursoId, widget.formandoId);
      await _controller.loadHtmlString(html);
    } catch (e) {
      if(!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erro ao carregar certificado: $e')),
      );
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBarArrow(title: 'Certificado', onBack: () => context.go('/cursos-completed')),
      body: Stack(
        children: [
          WebViewWidget(controller: _controller),
          if (_loading)
            const Center(child: CircularProgressIndicator()),
        ],
      ),
    );
  }
}
