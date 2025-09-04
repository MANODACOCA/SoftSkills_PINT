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
import 'dart:convert';

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
    onDidReceiveNotificationResponse: (NotificationResponse response) {
      if (response.payload != null) {
        try {
          final data = jsonDecode(response.payload!);

          final route = data['route']?.toString();
          final idCursoStr = data['id_curso']?.toString();
          final idCurso = idCursoStr != null ? int.tryParse(idCursoStr) : null;

          print('Notification response - Route: $route, IdCurso: $idCurso');

          if (route != null && route.isNotEmpty && idCurso != null) {
            rotas.push(route, extra: idCurso);
          } else {
            print('Erro: route ou idCurso inválidos - Route: $route, IdCurso: $idCurso');
          }
        } catch (e) {
          print('Erro ao processar notificação: $e');
        }
      }
    },
  );
}

void showLocalNotification(RemoteMessage message) async {
  try {
    const AndroidNotificationDetails androidDetails = AndroidNotificationDetails(
      'default_channel',
      'Default',
      importance: Importance.max,
      priority: Priority.high,
    );

    const NotificationDetails platformDetails = NotificationDetails(
      android: androidDetails,
    );

    // Verificar se os dados da mensagem são válidos antes de codificar
    String? payload;
    if (message.data.isNotEmpty) {
      try {
        payload = jsonEncode(message.data);
        print('Payload da notificação: $payload');
      } catch (e) {
        print('Erro ao codificar payload: $e');
        payload = null;
      }
    }

    await flutterLocalNotificationsPlugin.show(
      message.hashCode,
      message.notification?.title ?? 'Notificação',
      message.notification?.body ?? '',
      platformDetails,
      payload: payload,
    );
  } catch (e) {
    print('Erro ao mostrar notificação local: $e');
  }
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
    FirebaseMessaging messaging = FirebaseMessaging.instance;

    NotificationSettings settings = await messaging.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );

    //App Aberta(para lançar a notificacao)
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      if (message.notification != null) {
        showLocalNotification(message);
      }
    });

    //Background e app aberta (para abrir a notificacao)
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      print('onMessageOpenedApp triggered with data: ${message.data}');
      _handleMessage(message);
    });

    //Killed(App está morta)
    FirebaseMessaging.instance.getInitialMessage().then((
      RemoteMessage? message,
    ) {
      if (message != null) {
        print('getInitialMessage triggered with data: ${message.data}');
        // Adicionar um pequeno delay para garantir que a app está totalmente inicializada
        Future.delayed(const Duration(milliseconds: 500), () {
          _handleMessage(message);
        });
      }
    });

    // Token
    //  String? token = await messaging.getToken();
    //print('FCM Token: $token');
  }

  void _handleMessage(RemoteMessage message) {
    try {
      final data = message.data;
      final idCursoStr = data['id_curso']?.toString();
      final idCurso = idCursoStr != null ? int.tryParse(idCursoStr) : null;
      final route = data['route']?.toString();

      print('Handle message - Route: $route, IdCurso: $idCurso, Data: $data');

      if (idCurso != null && route != null && route.isNotEmpty) {
        rotas.push(route, extra: idCurso);
      } else {
        print('Erro: Dados da notificação inválidos - Route: $route, IdCurso: $idCurso');
        // Fallback para página inicial se os dados estiverem incorretos
        rotas.go('/');
      }
    } catch (e) {
      print('Erro ao processar mensagem: $e');
      // Em caso de erro, navegar para a página inicial
      rotas.go('/');
    }
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
