import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Login App',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const LoginPage(),
    );
  }
}

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  String text = '';
  bool isPasswordVisible = false;
  Icon passwordIcon = const Icon(
    Icons.visibility_off,
    color: Color(0XFF0D47A1),
  );

  void show() {
    setState(() {
      text = 'Login Efetuado com Sucesso';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GestureDetector(
        onTap: () {
          FocusScope.of(context).unfocus();
        },
        child: Center(
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const SizedBox(height: 60),
                  Image.asset('assets/logo-softinsa.png'),
                  const SizedBox(height: 90),
                  SizedBox(
                    width: 374,
                    height: 46,
                    child: TextField(
                      decoration: InputDecoration(
                        fillColor: Color.fromARGB(246, 211, 211, 211),
                        filled: true,
                        border: UnderlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                        labelText: 'Email',
                      ),
                    ),
                  ),
                  const SizedBox(height: 25),
                  SizedBox(
                    width: 374,
                    height: 46,
                    child: TextField(
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
                        fillColor: Color.fromARGB(237, 211, 211, 211),
                        filled: true,
                        border: UnderlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                        labelText: 'Password',
                      ),
                    ),
                  ),
                  const SizedBox(height: 15),
                  SizedBox(
                    width: double.infinity, /*Ocupa toda a largura disponível*/
                    child: Text(
                      'Esqueceste-te da password?',
                      textAlign: TextAlign.right,
                      style: TextStyle(color: Colors.blueAccent),
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
                    onPressed: show,
                    child: const Text(
                      'Login',
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                  Text(text),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
