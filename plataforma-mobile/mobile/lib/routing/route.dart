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

    if (!initialized) return null; // Não redireciona enquanto não inicializar!
    if (!loggedIn && !goingLogin) return '/login';
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