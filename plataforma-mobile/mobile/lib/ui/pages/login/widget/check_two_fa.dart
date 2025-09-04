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
  final String id;

  ConfirmTwoFaScreen({super.key, required this.id});

  @override
  State<ConfirmTwoFaScreen> createState() => _ConfirmTwoFaScreenState();
}

class _ConfirmTwoFaScreenState extends State<ConfirmTwoFaScreen> {
  final TextEditingController pininputController = TextEditingController();
  final FocusNode _focusNode = FocusNode();
  final ValueNotifier<int> _tempoRestanteNotifier = ValueNotifier<int>(60);
  final ValueNotifier<bool> _codigoValidoNotifier = ValueNotifier<bool>(true);
  bool isLoading = false;

  bool errouCodigo = false;
  Color colorPIN = AppColors.primary;
  Map<String, dynamic> user = {};

  Timer? _timer;
  bool _isTimerActive = false;

  @override
  void initState() {
    super.initState();
    fetchUtilizador(int.parse(widget.id));
    _checkRememberMe();
    _iniciarTimer();
  }

  @override
  void dispose() {
    _timer?.cancel();
    _focusNode.dispose();
    _tempoRestanteNotifier.dispose();
    _codigoValidoNotifier.dispose();
    pininputController.dispose();
    super.dispose();
  }

  void _iniciarTimer() {
    if (_isTimerActive) return;

    _timer?.cancel();
    _isTimerActive = true;

    _timer = Timer.periodic(Duration(seconds: 1), (timer) {
      if (!mounted) {
        timer.cancel();
        _isTimerActive = false;
        return;
      }

      if (_tempoRestanteNotifier.value > 0) {
        _tempoRestanteNotifier.value = _tempoRestanteNotifier.value - 1;
      } else {
        timer.cancel();
        _isTimerActive = false;
        _codigoValidoNotifier.value = false;
        if (user.containsKey('email')) {
          UtilizadoresApi().resendCodigo(user['email']);
        }
      }
    });
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

  void _reenviarCodigo() {
    if (user.containsKey('email')) {
      UtilizadoresApi().resendCodigo(user['email']);
    }

    _timer?.cancel();
    _isTimerActive = false;

    setState(() {
      errouCodigo = false;
      colorPIN = AppColors.primary;
    });

    _tempoRestanteNotifier.value = 60;
    _codigoValidoNotifier.value = true;

    _iniciarTimer();
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
      body: Container(
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
            Pinput(
              controller: pininputController,
              focusNode: _focusNode,
              length: 5,
              autofocus: false,
              keyboardType: TextInputType.number,
              onChanged: (value) {
                if (errouCodigo) {
                  setState(() {
                    errouCodigo = false;
                    colorPIN = AppColors.primary;
                  });
                }
              },
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
            SizedBox(height: 10),
            if (errouCodigo)
              Text(
                "Código incorreto ou inválido. Tente novamente.",
                style: TextStyle(color: Colors.red, fontSize: 14),
              ),
            SizedBox(height: 5),
            Align(
              alignment: Alignment.centerRight,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    "Tempo restante: ",
                    style: TextStyle(color: AppColors.secondary, fontSize: 12),
                  ),
                  ValueListenableBuilder<int>(
                    valueListenable: _tempoRestanteNotifier,
                    builder: (context, tempo, child) {
                      return Text(
                        "$tempo",
                        style: TextStyle(
                          color: AppColors.secondary,
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                      );
                    },
                  ),
                  Text(
                    " s",
                    style: TextStyle(color: AppColors.secondary, fontSize: 12),
                  ),
                ],
              ),
            ),
            SizedBox(height: 20),
            ValueListenableBuilder<bool>(
              valueListenable: _codigoValidoNotifier,
              builder: (context, codigoValido, child) {
                if (codigoValido) {
                  return SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: isLoading ? null : _verificarCodigo,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primary,
                        padding: EdgeInsets.symmetric(
                          horizontal: 32,
                          vertical: 12,
                        ),
                        textStyle: TextStyle(fontSize: 16),
                      ),
                      child:
                          isLoading
                              ? const SizedBox(
                                height: 24,
                                width: 24,
                                child: CircularProgressIndicator(
                                  color: Colors.white,
                                  strokeWidth: 2,
                                ),
                              )
                              : const Text(
                                'Verificar',
                                style: TextStyle(color: Colors.white),
                              ),
                    ),
                  );
                } else {
                  return SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: _reenviarCodigo,
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
                  );
                }
              },
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _verificarCodigo() async {
    setState(() {
      isLoading = true;
    });
    await Future.delayed(Duration(milliseconds: 100));
    try {
      final response = await UtilizadoresApi().verificarCodigo(
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

          final rememberMe = prefs.getBool('remember_me') ?? false;
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
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }
}
