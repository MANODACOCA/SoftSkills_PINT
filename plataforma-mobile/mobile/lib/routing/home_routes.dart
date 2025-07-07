import 'package:go_router/go_router.dart';
import 'package:mobile/ui/home/widgets/homepage.dart';

final List<GoRoute> homeRoutes = [
  GoRoute(
    name: 'homepage',
    path: '/homepage',
    builder: (context, state) => HomePage(),
  ),
];