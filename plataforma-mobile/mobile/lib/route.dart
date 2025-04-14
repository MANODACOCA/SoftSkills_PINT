import 'alterarpassword.dart';
import 'confirm_2fa.dart';
import 'forgetpassword.dart';
import 'verificacao.dart';
import 'primeirologin.dart';
import 'registar.dart';
import 'confirm_criar_conta.dart';
import 'success.dart';
import 'loginpage.dart';
import 'package:go_router/go_router.dart';
import 'page_open_app.dart';

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
      builder: (context, state) => Verificar(),
    ),
    GoRoute(
      name: 'firstlogin',
      path: '/firstlogin',
      builder: (context, state) => Primeirologin(),
    ),
    GoRoute(
      name: 'forgetpassword',
      path: '/forgetpassword',
      builder: (context, state) => Forgetpassword(),
    ),
    GoRoute(
      name: 'confirmacao',
      path: '/confirmacao',
      builder: (context, state) => Confirmacao(),
    ),
    GoRoute(
      name: 'alterarpassword',
      path: '/alterarpassword',
      builder: (context, state) => Alterarpassword(),
    ),
    GoRoute(
      name: 'alterar',
      path: '/alterar',
      builder: (context, state) => CheckmarkScreen(),
    ),
     GoRoute(
      name: 'registo',
      path: '/registo',
      builder: (context, state) => Registo(),
    ),
     GoRoute(
      name: 'confirmar',
      path: '/confirmar',
      builder: (context, state) => ConfirmacaoPage(),
    ),
  ],
);
