//import 'package:flutter/material.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:provider/provider.dart';
import 'ui/core/shared/export.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:go_router/go_router.dart';
import 'services/auth_service.dart'; // Importa o authService

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  debugPrintGlobalKeyedWidgetLifecycle = true; 
  await initializeDateFormatting('pt_PT', null);
  await authService.init(); // Inicializa antes do runApp
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
      ],
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
  // constrói UMA vez
  late final GoRouter _router = rotas;   // rotas já contém o refreshListenable

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      routerConfig: _router,           // sempre a mesma instância
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color.fromARGB(255, 106, 107, 108),
        ),
      ),
    );
  }
}
