//import 'package:flutter/material.dart';
import 'package:mobile/data/local/auth_local_data_source.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:provider/provider.dart';
import 'ui/core/shared/export.dart';
//import 'routing/route.dart';
import 'package:intl/date_symbol_data_local.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initializeDateFormatting('pt_PT', null);
  final authLocal = AuthLocalDataSource();
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider(authLocal)),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  
  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      routerConfig: rotas,
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color.fromARGB(255, 106, 107, 108)),
      ),
    );
  }
}
