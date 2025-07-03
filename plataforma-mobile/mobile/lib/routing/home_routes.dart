import 'package:go_router/go_router.dart';
import 'package:mobile/ui/home/widgets/homepage.dart';
import 'package:mobile/ui/login/widget/page_open_app.dart';

final List<GoRoute> homeRoutes = [
  GoRoute(
    name: 'initial',
    path: '/',
    builder: (context, state) => const MyHomePage(),
  ),
  GoRoute(
    name: 'homepage',
    path: '/homepage',
    builder: (context, state) => HomePage(),
  ),
];