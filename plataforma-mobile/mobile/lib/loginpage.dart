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
  Icon passwordIcon = const Icon(Icons.visibility_off, color: Color(0XFF0D47A1),);

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
                        fillColor: const Color(0XFFECEFF1),
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
                      obscureText: true,
                      decoration: InputDecoration(
                        suffixIcon: IconButton(
                          onPressed: (){}, 
                          icon: icon //FICAMOS NO MINUTO 3:44 NO VIDEO "ADD ICON WITH TEXTFIELD IN FLUTTER" 
                        )
                        fillColor: const Color(0XFFECEFF1),
                        filled: true,
                        border: UnderlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                        labelText: 'Password',
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
