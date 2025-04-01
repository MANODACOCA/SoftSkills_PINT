import 'package:flutter/material.dart';

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

  void show() {
    setState(() {
      text = 'Login Efetuado com Sucesso';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SingleChildScrollView( //Evita o erro de overflow
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const SizedBox(height: 150),
              Image.asset('assets/logo-softinsa.png'),
              const SizedBox(height: 100),
              TextField(
                //controller -> to store inside a database
                decoration: const InputDecoration(
                  border: UnderlineInputBorder(),
                  labelText: 'Email',
                ),
              ),
              const SizedBox(height: 25),
              TextField(
                obscureText: true,
                decoration: const InputDecoration(
                  border: UnderlineInputBorder(),
                  labelText: 'Password',
                ),
              ),
              const SizedBox(height: 100),
              ElevatedButton(onPressed: show, child: const Text('Login')),
              const SizedBox(height: 20),
              Text(text),
              Padding(padding: const EdgeInsets.all(100)),
            ],
          ),
        ),
      ),
    );
  }
}
