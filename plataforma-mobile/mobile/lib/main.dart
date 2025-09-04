import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:mobile/provider/user.dart';
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
            // Aguardar que o utilizador esteja carregado antes de navegar
            _waitForUserAndNavigate(route, idCurso);
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

// Função auxiliar para notificações locais
void _waitForUserAndNavigate(String route, int idCurso) async {
  print('Notificação local: Aguardando que o utilizador seja carregado...');
  
  int attempts = 0;
  const maxAttempts = 60; // 30 segundos máximo
  bool userLoadAttempted = false;
  
  while (attempts < maxAttempts) {
    try {
      // Tentar obter o contexto e o AuthProvider
      final context = rotas.routerDelegate.navigatorKey.currentContext;
      if (context != null) {
        // ignore: use_build_context_synchronously
        final authProvider = Provider.of<AuthProvider>(context, listen: false);
        
        // Verificar se o utilizador está carregado
        if (authProvider.user != null) {
          print('Utilizador carregado: ${authProvider.user!.id}');
          print('Navegando para: $route com idCurso: $idCurso');
          rotas.push(route, extra: idCurso);
          return;
        }
        
        // Se o utilizador não está carregado e ainda não tentamos carregar
        if (!userLoadAttempted && authService.isLoggedIn && authService.token != null) {
          print('Tentando carregar utilizador do token...');
          await _loadUserFromTokenGlobal(authProvider);
          userLoadAttempted = true;
          // Dar uma chance para o carregamento processar
          await Future.delayed(const Duration(milliseconds: 1000));
          continue;
        }
        
        print('AuthProvider sem utilizador. Tentativa ${attempts + 1}');
      } else {
        print('Contexto não disponível. Tentativa ${attempts + 1}');
      }
    } catch (e) {
      print('Erro ao verificar AuthProvider: $e');
    }
    
    attempts++;
    await Future.delayed(const Duration(milliseconds: 500));
  }
  
  print('Timeout: Utilizador não foi carregado após ${maxAttempts * 0.5} segundos');
  print('Navegando mesmo assim para: $route');
  rotas.push(route, extra: idCurso);
}

// Função global para carregar utilizador do token
Future<void> _loadUserFromTokenGlobal(AuthProvider authProvider) async {
  try {
    if (authService.token != null) {
      final parts = authService.token!.split('.');
      if (parts.length == 3) {
        final payload = utf8.decode(base64Url.decode(base64Url.normalize(parts[1])));
        final payloadMap = json.decode(payload);
        final userId = payloadMap['id'];
        
        if (userId != null) {
          print('Carregando utilizador com ID: $userId');
          await authProvider.setUser(User(id: userId.toString()), token: authService.token);
          print('Utilizador carregado com sucesso');
        }
      }
    }
  } catch (e) {
    print('Erro ao carregar utilizador do token: $e');
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
        // Delay maior para app morta para garantir que tudo está inicializado
        Future.delayed(const Duration(milliseconds: 2000), () {
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
        // Aguardar que o utilizador esteja carregado antes de navegar
        _waitForUserAndNavigate(route, idCurso);
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

  // Função para aguardar que o utilizador esteja carregado no AuthProvider
  void _waitForUserAndNavigate(String route, int idCurso) async {
    print('Aguardando que o utilizador seja carregado no AuthProvider...');
    
    int attempts = 0;
    const maxAttempts = 60; // 30 segundos máximo
    bool userLoadAttempted = false;
    
    while (attempts < maxAttempts) {
      try {
        // Tentar obter o contexto e o AuthProvider
        final context = rotas.routerDelegate.navigatorKey.currentContext;
        if (context != null) {
          // ignore: use_build_context_synchronously
          final authProvider = Provider.of<AuthProvider>(context, listen: false);
          
          // Verificar se o utilizador está carregado
          if (authProvider.user != null) {
            print('Utilizador carregado: ${authProvider.user!.id}');
            print('Navegando para: $route com idCurso: $idCurso');
            rotas.push(route, extra: idCurso);
            return;
          } 
          
          // Se o utilizador não está carregado e ainda não tentamos carregar
          if (!userLoadAttempted && authService.isLoggedIn && authService.token != null) {
            print('Tentando carregar utilizador do token...');
            await _loadUserFromToken(authProvider);
            userLoadAttempted = true;
            // Dar uma chance para o carregamento processar
            await Future.delayed(const Duration(milliseconds: 1000));
            continue;
          }
          
          print('AuthProvider sem utilizador. Tentativa ${attempts + 1}');
        } else {
          print('Contexto não disponível. Tentativa ${attempts + 1}');
        }
      } catch (e) {
        print('Erro ao verificar AuthProvider: $e');
      }
      
      attempts++;
      await Future.delayed(const Duration(milliseconds: 500));
    }
    
    print('Timeout: Utilizador não foi carregado após ${maxAttempts * 0.5} segundos');
    print('Navegando mesmo assim para: $route');
    rotas.push(route, extra: idCurso);
  }

  // Função para carregar utilizador do token
  Future<void> _loadUserFromToken(AuthProvider authProvider) async {
    try {
      if (authService.token != null) {
        final parts = authService.token!.split('.');
        if (parts.length == 3) {
          final payload = utf8.decode(base64Url.decode(base64Url.normalize(parts[1])));
          final payloadMap = json.decode(payload);
          final userId = payloadMap['id'];
          
          if (userId != null) {
            print('Carregando utilizador com ID: $userId');
            await authProvider.setUser(User(id: userId.toString()), token: authService.token);
            print('Utilizador carregado com sucesso');
          }
        }
      }
    } catch (e) {
      print('Erro ao carregar utilizador do token: $e');
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
