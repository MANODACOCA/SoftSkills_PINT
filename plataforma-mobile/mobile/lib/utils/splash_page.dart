import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../services/auth_service.dart';
import '../provider/auth_provider.dart';
import '../API/utilizadores_api.dart';
import '../provider/user.dart';
import 'dart:convert';

class SplashPage extends StatefulWidget {
  const SplashPage({super.key});

  @override
  State<SplashPage> createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> {
  @override
  void initState() {
    super.initState();
    _checkAuth();
  }

  Future<void> _checkAuth() async {
    await Future.delayed(const Duration(milliseconds: 500)); // pequeno delay para UX
    if (authService.isLoggedIn && authService.token != null) {
      try {
        // Decodificar token para obter o id
        final parts = authService.token!.split('.');
        if (parts.length == 3) {
          final payload = utf8.decode(base64Url.decode(base64Url.normalize(parts[1])));
          final payloadMap = json.decode(payload);
          final userId = payloadMap['id'];
          if (userId != null) {
            if (!mounted) return;
            final authProvider = Provider.of<AuthProvider>(context, listen: false);
            // Tenta buscar dados completos da API
            try {
              final api = UtilizadoresApi();
              final userData = await api.getUtilizador(int.parse(userId.toString()));
              final user = User.fromJson(userData);
              if (mounted) authProvider.setUser(user, token: authService.token);
            } catch (e) {
              // Se falhar (ex: offline), preenche só com o ID
              if (mounted) authProvider.setUser(User(id: userId.toString()), token: authService.token);
            }
          }
        }
      } catch (e) {
        // Se falhar, ignora e segue para homepage
      }
      if (mounted) context.go('/homepage');
    } else {
      if (mounted) context.go('/login');
    }
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: CircularProgressIndicator(),
      ),
    );
  }
}
