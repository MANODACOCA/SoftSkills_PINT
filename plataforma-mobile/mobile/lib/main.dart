import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:permission_handler/permission_handler.dart';

import 'package:firebase_core/firebase_core.dart';
import 'package:mobile/Firebase/firebase_api.dart';
import 'package:mobile/Firebase/flutter_notificartions.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:provider/provider.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:go_router/go_router.dart';
import 'services/auth_service.dart';
import 'ui/core/shared/export.dart';

Future<void> requestNotificationPermission() async {
  if (await Permission.notification.request().isGranted) {
    print('========================================');
    print('Permissão para notificações concedida');
    print('========================================');
  } else {
    print('========================================');
    print('Permissão para notificações NEGADA');
    print('========================================');

  }
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  FirebaseMessaging.onBackgroundMessage(handleBackgroundMessage);
  await setupFlutterNotifications();
  await FirebaseAPI().initNotifications();

  await requestNotificationPermission();

  debugPrintGlobalKeyedWidgetLifecycle = true;
  await initializeDateFormatting('pt_PT', null);
  await authService.init();

  runApp(
    MultiProvider(
      providers: [ChangeNotifierProvider(create: (_) => AuthProvider())],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late final GoRouter _router = rotas;

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      routerConfig: _router,
      title: 'SoftSkills',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xff6A6B6C)),
      ),
    );
  }
}
