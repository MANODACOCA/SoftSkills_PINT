import 'package:go_router/go_router.dart';
import '../ui/login/auto_login/splash_screen.dart';

final splashRoutes = <GoRoute>[
  GoRoute(
    path: '/',         
    name: 'splash',
    builder: (context, state) => const SplashScreen(),
  ),
];
