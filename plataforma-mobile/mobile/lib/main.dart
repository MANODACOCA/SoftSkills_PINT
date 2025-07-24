import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:mobile/routing/route.dart';
import 'package:mobile/services/auth_service.dart';
import 'package:provider/provider.dart';
import 'firebase_options.dart'; // Gerado com `flutterfire configure`

final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
    FlutterLocalNotificationsPlugin();

Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp();
  //print("Background message: ${message.messageId}");
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

  await _initializeLocalNotifications();
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

Future<void> _initializeLocalNotifications() async {
  const AndroidInitializationSettings androidSettings =
      AndroidInitializationSettings('@mipmap/ic_launcher');
  const DarwinInitializationSettings iosSettings =
      DarwinInitializationSettings();

  await flutterLocalNotificationsPlugin.initialize(
    const InitializationSettings(android: androidSettings, iOS: iosSettings),
  );
}

void showLocalNotification(RemoteMessage message) async {
  const AndroidNotificationDetails androidDetails = AndroidNotificationDetails(
    'default_channel',
    'Default',
    importance: Importance.max,
    priority: Priority.high,
  );

  const NotificationDetails platformDetails = NotificationDetails(
    android: androidDetails,
  );

  await flutterLocalNotificationsPlugin.show(
    message.hashCode,
    message.notification?.title ?? 'Notificação',
    message.notification?.body ?? '',
    platformDetails,
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: NotificationPage());
  }
}

class NotificationPage extends StatefulWidget {
  const NotificationPage({super.key});

  @override
  State<NotificationPage> createState() => _NotificationPageState();
}

class _NotificationPageState extends State<NotificationPage> {
  late final GoRouter _router = rotas;
  String mensagem = 'Aguardando notificações...';
  @override
  void initState() {
    super.initState();
    _setupFCM();
  }

  void _setupFCM() async {
    //FirebaseMessaging messaging = FirebaseMessaging.instance;

    /*NotificationSettings settings = await messaging.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );
*/
    //print('Permission: ${settings.authorizationStatus}');

    // Foreground
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      //print('Foreground message: ${message.notification?.title}');
      if (message.notification != null) {
        showLocalNotification(message);
        setState(() {
          mensagem = message.notification!.body!;
        });
      }
    });

    // App aberta por notificação
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      //print('Notification opened: ${message.notification?.title}');
    });

    // Token
    //  String? token = await messaging.getToken();
    //print('FCM Token: $token');
  }

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
