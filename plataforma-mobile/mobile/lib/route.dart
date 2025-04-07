import 'package:mobile/alterarpassword.dart';
import 'package:mobile/confirmar.dart';
import 'package:mobile/forgetpassword.dart';
import 'package:mobile/verificacao.dart';
import 'primeirologin.dart';
import 'main.dart';
import 'success.dart';
import 'loginpage.dart';
import 'package:go_router/go_router.dart';

final rotas = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      name: 'homepage',
      path: '/',
      builder:
          (context, state) => const MyHomePage(title: 'Flutter Demo Home Page'),
    ),
    GoRoute(
      name: 'loginpage',
      path: '/login',
      builder: (context, state) => LoginPage(),
    ),
    GoRoute(
      name: 'verificacao',
      path: '/verificacao',
      builder: (context, state) => verificar(),
    ),
    GoRoute(
      name: 'firstlogin',
      path: '/firstlogin',
      builder: (context, state) => primeirologin(),
    ),
    GoRoute(
      name: 'forgetpassword',
      path: '/forgetpassword',
      builder: (context, state) => forgetpassword(),
    ),
    GoRoute(
      name: 'confirmacao',
      path: '/confirmacao',
      builder: (context, state) => confirmacao(),
    ),
    GoRoute(
      name: 'alterarpassword',
      path: '/alterarpassword',
      builder: (context, state) => alterarpassword(),
    ),
    GoRoute(
      name: 'alterar',
      path: '/alterar',
      builder: (context, state) => CheckmarkScreen(),
    ),
  ],
);
