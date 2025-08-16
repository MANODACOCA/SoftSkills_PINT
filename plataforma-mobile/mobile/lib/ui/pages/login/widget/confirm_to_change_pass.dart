import 'dart:async';

import '../../../core/shared/export.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:pin_code_fields/pin_code_fields.dart';
import '../../../../API/utilizadores_api.dart';

class ConfirmAccountScreen extends StatefulWidget {
  const ConfirmAccountScreen({super.key});

  @override
  State<ConfirmAccountScreen> createState() => _ConfirmAccountScreen();
}

class _ConfirmAccountScreen extends State<ConfirmAccountScreen> {
  final codeController = TextEditingController();
  final UtilizadoresApi api = UtilizadoresApi();
  String? email;
  bool errouCodigo = false;
  Color colorPIN = AppColors.primary;
  int tempoRestante = 60;
  bool codigo_valido = true;
  Timer? _timer;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final extra = GoRouterState.of(context).extra;
    if (extra is Map && extra['email'] != null) {
      email = extra['email'] as String;
    }
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
        api.resendCodigo(email!);
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    codeController.dispose();
    super.dispose();
  }

  Future<void> validar() async {
    if (email == null) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Email não encontrado!')));
      return;
    }
    final codigo = codeController.text.trim();
    if (codigo.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Insira o código recebido.')),
      );
      return;
    }
    try {
      final result = await api.verificarCodigo(email!, codigo);
      if (!mounted) return;
      if (result['success'] == true) {
        await showDialog(
          context: context,
          builder:
              (context) => AlertDialog(
                title: const Text('Sucesso'),
                content: const Text('Código verificado com sucesso!'),
                actions: [
                  TextButton(
                    onPressed: () {
                      Navigator.of(context).pop();
                    },
                    child: const Text('OK'),
                  ),
                ],
              ),
        );
        if (mounted) {
          context.go("/changeforgotpass", extra: {'email': email});
        }
      } else {
        setState(() {
          errouCodigo = true;
          colorPIN = Colors.red;
        });
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(result['message'] ?? 'Código incorreto!')),
        );
      }
    } catch (e) {
      setState(() {
        errouCodigo = true;
        colorPIN = Colors.red;
      });
      if (!mounted) return;
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Erro ao validar código!')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          onPressed: () {
            context.go("/forgetpassword");
          },
          icon: Icon(Icons.arrow_back),
          color: Colors.white,
        ),
        backgroundColor: AppColors.primary,
        title: Text(
          'Confirmação do Email',
          textAlign: TextAlign.center,
          style: TextStyle(color: Colors.white),
        ),
      ),
      body: GestureDetector(
        onTap: () {
          FocusScope.of(context).unfocus();
        },
        child: Center(
          child: SingleChildScrollView(
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 20.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  SizedBox(height: 90),
                  Text(
                    'Foi-lhe enviado um código de verificação para o seu email',
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 16),
                  ),
                  SizedBox(height: 45),
                  PinCodeTextField(
                    keyboardType: TextInputType.number,
                    appContext: context,
                    controller: codeController,
                    length: 5,
                    cursorHeight: 19,
                    enableActiveFill: true,
                    textStyle: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.normal,
                    ),
                    inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                    pinTheme: PinTheme(
                      shape: PinCodeFieldShape.box,
                      fieldHeight: 50,
                      inactiveColor: colorPIN,
                      selectedColor: colorPIN,
                      activeFillColor: Colors.white,
                      inactiveFillColor: Colors.white,
                      borderWidth: 1,
                      borderRadius: BorderRadius.circular(5),
                    ),
                    onChanged: ((value) {}),
                  ),
                  if (errouCodigo)
                    Padding(
                      padding: const EdgeInsets.only(top: 8.0),
                      child: Text(
                        "Código incorreto ou inválido. Tente novamente.",
                        style: TextStyle(color: Colors.red, fontSize: 14),
                      ),
                    ),
                  SizedBox(height: 10),
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
                        onPressed: validar,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.primary,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                          fixedSize: const Size(310, 46),
                        ),
                        child: const Text(
                          'Confirmar',
                          style: TextStyle(color: Colors.white),
                        ),
                      ),
                    )
                  else
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: () {
                          api.resendCodigo(email!);
                          iniciarTimer();
                          setState(() {
                            errouCodigo = false;
                            colorPIN = AppColors.primary;
                          });
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.primary,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                          fixedSize: const Size(310, 46),
                        ),
                        child: const Text(
                          "Reenviar Código",
                          style: TextStyle(color: Colors.white),
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
