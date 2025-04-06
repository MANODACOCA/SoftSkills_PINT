import 'package:mobile/verificacao.dart';

import 'main.dart';
import 'loginpage.dart';
import 'package:go_router/go_router.dart';

final rotas = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      name: 'homepage',
      path: '/',
      builder: (context, state) => const MyHomePage(title: 'Flutter Demo Home Page'),
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
  ],
);