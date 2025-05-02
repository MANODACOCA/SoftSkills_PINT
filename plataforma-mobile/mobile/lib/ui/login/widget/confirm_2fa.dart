import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'dart:math';
import 'package:pin_code_fields/pin_code_fields.dart';

class TwoFactorAuthentication extends StatefulWidget {
  const TwoFactorAuthentication({super.key});

  @override
  State<TwoFactorAuthentication> createState() => _TwoFactorAuthentication();
}

class _TwoFactorAuthentication extends State<TwoFactorAuthentication> {
  final codeController = TextEditingController();
  int code = 0;

  @override
  void initState() {
    super.initState();
    randomCode();
  }

  void randomCode() {
    code = Random().nextInt(99999) + 10000;
    print('O código é : $code');
  }
  
  void validar() {
    if (codeController.text == code.toString()) {
      context.go("/homepage");
    } else {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Código incorreto!')));
    }
  }
  // Confirmacao do email utilizados
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          onPressed: () {
            context.go("/");
          },
          icon: Icon(Icons.arrow_back),
          color: Colors.white,
        ),
        backgroundColor: Color(0XFF0D47A1),
        title: Text(
          'Cofirmação do Email',
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
                  //Dependencia para o envio de email ja foram feitas
                  Text(
                    'Foi-lhe enviado um código de verificação para o seu email',
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 16),
                  ),
                  SizedBox(height: 45),
                  //Aqui vem o local para inserir o código de verificação
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
                      inactiveColor: Colors.grey,
                      selectedColor: Colors.blueAccent,
                      activeFillColor: Colors.white,
                      inactiveFillColor: Colors.white,
                      borderWidth: 1,
                      borderRadius: BorderRadius.circular(5),
                    ),
                    onChanged: ((value) {}),
                  ),
                  SizedBox(height: 150),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0XFF0D47A1),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                      fixedSize: const Size(310, 46),
                    ),
                    onPressed: () {
                      validar();
                    },
                    child: const Text(
                      'Confirmar',
                      style: TextStyle(color: Colors.white),
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