import 'package:go_router/go_router.dart';
import '../utils/splash_page.dart';
import 'login_routes.dart';
import 'home_routes.dart';
import 'forum_routes.dart';
import 'cursos_routes.dart';
import 'profile_routes.dart';
import '../services/auth_service.dart';

final rotas = GoRouter(
  initialLocation: '/',
  refreshListenable: authService,
  redirect: (context, state) {
    final loggedIn = authService.isLoggedIn;
    final initialized = authService.isInitialized;
    final goingLogin = state.uri.path == '/login';
    final goingSplash = state.uri.path == '/';
    final goingRegisto = state.uri.path == '/registo';
    final goingFirstLogin = state.uri.path == '/firstlogin';
    final goingForgetPassword = state.uri.path == '/forgetpassword';
    final goingConfirmacao = state.uri.path == '/confirmacao';
    final goingChangeForgotPass = state.uri.path == '/changeforgotpass';

    if (!initialized) return null; // Não redireciona enquanto não inicializar!
    // Permitir acesso a /login, /registo, /firstlogin, /forgetpassword, /confirmacao e /changeforgotpass sem login
    if (!loggedIn && !goingLogin && !goingRegisto && !goingFirstLogin && !goingForgetPassword && !goingConfirmacao && !goingChangeForgotPass) return '/login';
    if (loggedIn && goingLogin) return '/';
    return null;
  },
  routes: [
    GoRoute(
      path: '/',
      builder: (_, __) => const SplashPage(),
    ),
    ...loginRoutes,
    ...homeRoutes,
    ...forumRoutes,
    ...cursosRoutes,
    ...profileRoutes,
  ],
);

// final rotas = GoRouter(
//   initialLocation: '/',
//   routes: [
//     ...homeRoutes,
//     ...loginRoutes,
//     ...forumRoutes,
//     ...cursosRoutes,
//     ...profileRoutes,
//   ],
// );