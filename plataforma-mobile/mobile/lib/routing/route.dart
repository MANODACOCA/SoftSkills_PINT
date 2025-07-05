import 'package:go_router/go_router.dart';
import 'home_routes.dart';
import 'cursos_routes.dart';
import 'profile_routes.dart';
import 'login_routes.dart';
import 'forum_routes.dart';
import 'splash_routes.dart';

final rotas = GoRouter(
  initialLocation: '/',
  routes: [
    ...splashRoutes,
    ...homeRoutes,
    ...loginRoutes,
    ...forumRoutes,
    ...cursosRoutes,
    ...profileRoutes,
  ],
);