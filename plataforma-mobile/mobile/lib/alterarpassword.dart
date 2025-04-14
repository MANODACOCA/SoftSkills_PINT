import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class Alterarpassword extends StatefulWidget {
  const Alterarpassword({super.key});

  @override
  State<Alterarpassword> createState() => Alterar();
}

class Alterar extends State<Alterarpassword> {
  bool isPasswordVisible = false;
  final newpass = TextEditingController();
  final pass = TextEditingController();
  Icon passwordIcon = const Icon(
    Icons.visibility_off,
    color: Color(0XFF0D47A1),
  );

  void analisar() {
    if (newpass.text == pass.text) {
      context.go("/alterar");
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('As passwords não coincidem!')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Criar Nova Password',
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: Color(0XFF0D47A1),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          color: Colors.white,
          onPressed: () {
            context.go("/login");
          },
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
                children: [
                  Text(
                    'Por favor, crie uma nova password. Certifique que esta é diferente da anterior.',
                    style: TextStyle(
                      fontSize: 16,
                      fontStyle: FontStyle.italic,
                      color: Color.fromRGBO(128, 127, 127, 1),
                    ),
                  ),
                  const SizedBox(height: 50),
                  SizedBox(
                    width: 374,
                    height: 46,
                    child: TextField(
                      controller: pass,
                      obscureText: isPasswordVisible ? false : true,
                      decoration: InputDecoration(
                        suffixIcon: IconButton(
                          icon: passwordIcon,
                          onPressed: () {
                            setState(() {
                              isPasswordVisible = !isPasswordVisible;
                              if (isPasswordVisible) {
                                passwordIcon = Icon(
                                  Icons.visibility,
                                  color: Color(0XFF0D47A1),
                                );
                              } else {
                                passwordIcon = Icon(
                                  Icons.visibility_off,
                                  color: Color(0XFF0D47A1),
                                );
                              }
                            });
                          },
                        ),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                          borderSide: BorderSide(
                            color: Color.fromRGBO(211, 211, 211, 100),
                          ),
                        ),
                        labelText: 'Password',
                      ),
                    ),
                  ),
                  const SizedBox(height: 31),
                  SizedBox(
                    width: 374,
                    height: 46,
                    child: TextField(
                      controller: newpass,
                      obscureText: isPasswordVisible ? false : true,
                      decoration: InputDecoration(
                        suffixIcon: IconButton(
                          icon: passwordIcon,
                          onPressed: () {
                            setState(() {
                              isPasswordVisible = !isPasswordVisible;
                              if (isPasswordVisible) {
                                passwordIcon = Icon(
                                  Icons.visibility,
                                  color: Color(0XFF0D47A1),
                                );
                              } else {
                                passwordIcon = Icon(
                                  Icons.visibility_off,
                                  color: Color(0XFF0D47A1),
                                );
                              }
                            });
                          },
                        ),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                          borderSide: BorderSide(
                            color: Color.fromRGBO(211, 211, 211, 100),
                          ),
                        ),
                        labelText: 'Repita Passowrd',
                      ),
                    ),
                  ),
                  const SizedBox(height: 90),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0XFF0D47A1),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                      fixedSize: const Size(310, 46),
                    ),
                    onPressed: () {
                      analisar();
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