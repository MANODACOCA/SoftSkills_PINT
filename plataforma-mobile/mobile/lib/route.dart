import 'homepage.dart';
import 'alterarpassword.dart';
import 'confirm_2fa.dart';
import 'forgetpassword.dart';
//import 'primeirologin.dart';
import 'registar.dart';
//import 'confirm_criar_conta.dart';
import 'success.dart';
import 'loginpage.dart';
import 'package:go_router/go_router.dart';
import 'page_open_app.dart';

final rotas = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      name: 'initial',
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
      name: 'firstlogin',
      path: '/firstlogin',
      builder: (context, state) => LoginPage(),
    ),
    GoRoute(
      name: 'forgetpassword',
      path: '/forgetpassword',
      builder: (context, state) => ForgetPassword(),
    ),
    GoRoute(
      name: 'confirmacao',
      path: '/confirmacao',
      builder: (context, state) => LoginPage(),
    ),
    GoRoute(
      name: 'alterarpassword',
      path: '/alterarpassword',
      builder: (context, state) => ChangePassword(),
    ),
    GoRoute(
      name: 'check',
      path: '/check',
      builder: (context, state) => CheckmarkScreen(),
    ),
    GoRoute(
      name: 'registo',
      path: '/registo',
      builder: (context, state) => Register(),
    ),
    GoRoute(
      name: 'twofa',
      path: '/twofa',
      builder: (context, state) => TwoFactorAuthentication(), 
    ),
    GoRoute(
      name: 'homepage',
      path: '/homepage',
      builder: (context, state) => HomePage(),
    ),
  ],
);
