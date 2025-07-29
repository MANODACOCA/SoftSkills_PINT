// ignore_for_file: prefer_typing_uninitialized_variables, use_build_context_synchronously, prefer_const_constructors_in_immutables, avoid_print

import 'dart:async';
import 'package:go_router/go_router.dart';
import 'package:mobile/ui/core/shared/export.dart';
import 'package:pinput/pinput.dart';
import '../../../../API/utilizadores_api.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../services/auth_service.dart';
import '../../../../provider/user.dart';
import '../../../../provider/auth_provider.dart';

class ConfirmTwoFaScreen extends StatefulWidget {
  ConfirmTwoFaScreen({super.key, required this.id});

  final String id;

  @override
  State<ConfirmTwoFaScreen> createState() => _ConfirmTwoFaScreenState();
}

class _ConfirmTwoFaScreenState extends State<ConfirmTwoFaScreen> {
  final TextEditingController pininputController = TextEditingController();
  bool errouCodigo = false;
  Color colorPIN = AppColors.primary;
  Map<String, dynamic> user = {};
  bool codigo_valido = true;
  int tempoRestante = 60;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    fetchUtilizador(int.parse(widget.id));
    _checkRememberMe();
    iniciarTimer();
  }

  void iniciarTimer() {
    _timer?.cancel();
    setState(() {
      tempoRestante = 60;
      codigo_valido = true;
    });

    _timer = Timer.periodic(Duration(seconds: 1), (timer) {
      if (tempoRestante > 0) {
        setState(() {
          tempoRestante--;
        });
      } else {
        timer.cancel();
        setState(() {
          codigo_valido = false;
        });
        UtilizadoresApi().resendCodigo(user['email']);
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    pininputController.dispose();
    super.dispose();
  }

  Future<void> _checkRememberMe() async {
    final prefs = await SharedPreferences.getInstance();
    final rememberMe = prefs.getBool('remember_me') ?? false;
    final token = prefs.getString('token') ?? '';
  }

  Future<void> fetchUtilizador(int userid) async {
    try {
      final esteUtilizador = await UtilizadoresApi().getUtilizador(userid);
      setState(() {
        user = esteUtilizador;
      });
    } catch (e) {
      print('Erro ao buscar o utilizador: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBar(
        title: Text(
          "Verificação de Código",
          style: TextStyle(color: Colors.white),
        ),
        centerTitle: true,
        backgroundColor: AppColors.primary,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            context.go('/login');
          },
        ),
      ),
      body: GestureDetector(
        child: Container(
          padding: EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                "Insira o código de verificação enviado para o seu e-mail.",
                style: TextStyle(fontSize: 16, color: Colors.black54),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 30),
              Form(
                child: Column(
                  children: [
                    Pinput(
                      controller: pininputController,
                      length: 5,
                      defaultPinTheme: PinTheme(
                        width: 50,
                        height: 50,
                        textStyle: TextStyle(fontSize: 20, color: Colors.black),
                        decoration: BoxDecoration(
                          border: Border.all(color: colorPIN),
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 10),
              if (errouCodigo)
                Text(
                  "Código incorreto ou inválido. Tente novamente.",
                  style: TextStyle(color: Colors.red, fontSize: 14),
                ),
              SizedBox(height: 5),
              Container(
                padding: EdgeInsets.only(right: 25),
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        "Tempo restante: ",
                        style: TextStyle(
                          color: AppColors.secondary,
                          fontSize: 12,
                        ),
                      ),
                      Text(
                        "$tempoRestante",
                        style: TextStyle(
                          color: AppColors.secondary,
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        " s",
                        style: TextStyle(
                          color: AppColors.secondary,
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              SizedBox(height: 20),
              if (codigo_valido)
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () async {
                      try {
                        final response = await UtilizadoresApi()
                            .verificarCodigo(
                              user['email'],
                              pininputController.text,
                            );
                        if (response['success'] == true) {
                          final prefs = await SharedPreferences.getInstance();
                          final token = prefs.getString('pending_token');
                          final userIdStr = prefs.getString('pending_userId');
                          if (token != null && userIdStr != null) {
                            final authProvider = Provider.of<AuthProvider>(
                              context,
                              listen: false,
                            );
                            final userModel = User(id: userIdStr);
                            authProvider.setUser(userModel, token: token);
                            final rememberMe =
                                prefs.getBool('remember_me') ?? false;
                            await authService.login(token, rememberMe);
                            await prefs.remove('pending_token');
                            await prefs.remove('pending_userId');
                          }
                          context.go('/homepage');
                        } else {
                          setState(() {
                            errouCodigo = true;
                            colorPIN = Colors.red;
                          });
                        }
                      } catch (e) {
                        setState(() {
                          errouCodigo = true;
                          colorPIN = Colors.red;
                        });
                      }
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary,
                      padding: EdgeInsets.symmetric(
                        horizontal: 32,
                        vertical: 12,
                      ),
                      textStyle: TextStyle(fontSize: 16),
                    ),
                    child: Text(
                      "Verificar",
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                )
              else
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () {
                      UtilizadoresApi().resendCodigo(user['email']);
                      iniciarTimer(); // Reinicia o timer
                      setState(() {
                        errouCodigo = false;
                        colorPIN = AppColors.primary;
                      });
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary,
                      padding: EdgeInsets.symmetric(
                        horizontal: 32,
                        vertical: 12,
                      ),
                      textStyle: TextStyle(fontSize: 16),
                    ),
                    child: Text(
                      "Reenviar Código",
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
