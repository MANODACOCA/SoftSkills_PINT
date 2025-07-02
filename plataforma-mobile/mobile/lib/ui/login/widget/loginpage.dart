//import 'dart:convert';
//import 'package:mobile/data/services/basedados.dart';
// ignore_for_file: use_build_context_synchronously, await_only_futures

import '../../core/shared/export.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../API/utilizadores_api.dart';
//import 'package:crypto/crypto.dart';
//import '../../profile/widget/activate_twofa.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPage();
}

class _LoginPage extends State<LoginPage> {
  UtilizadoresApi api = UtilizadoresApi();
  bool isSwitched = false;
  bool isRememberMe = false;
  bool? twoFactorEnabled;
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  String text = '';
  bool isPasswordVisible = false;
  Icon passwordIcon = const Icon(
    Icons.visibility_off,
    color: AppColors.primary,
  );

  @override
  void initState() {
    super.initState();
    _loadSwitchState();
  }

  Future<void> _saveRememberMe(bool value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('remember_me', value);
  }

  Future<void> _loadSwitchState() async {
    final prefs = await SharedPreferences.getInstance();
    final rememberMe = prefs.getBool('remember_me') ?? false;
    setState(() {
      isSwitched = rememberMe;
    });
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
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
                  const SizedBox(height: 60),
                  Image.asset('assets/logo-softinsa.png'),
                  const SizedBox(height: 90.0),
                  SizedBox(
                    width: screenWidth - 40,
                    height: 46,
                    child: TextField(
                      controller: _emailController,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                          borderSide: BorderSide(
                            color: Color.fromRGBO(211, 211, 211, 100),
                          ),
                        ),
                        labelText: 'Email',
                      ),
                    ),
                  ),
                  const SizedBox(height: 25),
                  SizedBox(
                    width: screenWidth - 40,
                    height: 46,
                    child: TextField(
                      controller: _passwordController,
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
                                  color: AppColors.primary,
                                );
                              } else {
                                passwordIcon = Icon(
                                  Icons.visibility_off,
                                  color: AppColors.primary,
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
                  const SizedBox(height: 15),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      GestureDetector(
                        onTap: () {
                          context.go("/forgetpassword");
                        },
                        child: Text(
                          'Esqueceste-te da password?',
                          textAlign: TextAlign.right,
                          style: TextStyle(
                            color: Colors.blueAccent,
                            decoration: TextDecoration.underline,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 5),
                  SizedBox(
                    width: double.infinity,
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: Row(
                        /*Alinha todos os elementos dentro da mesma*/
                        children: [
                          Switch(
                            activeColor: AppColors.primary,
                            value: isSwitched,
                            onChanged: (value) async {
                              setState(() {
                                isSwitched = value;
                                // ignore: avoid_print
                                print('Switch is $isSwitched');
                              });
                              await _saveRememberMe(value);
                            },
                          ),
                          const SizedBox(width: 10),
                          Text(
                            'Manter sessão iniciada',
                            style: TextStyle(color: AppColors.primary),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 20.0),
                  Center(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        /*SizedBox(
                          width: 60,
                          height: 60,
                          child: IconButton(
                            onPressed: () {},
                            icon: Image.asset("assets/facebook.png"),
                          ),
                        ),
                        const SizedBox(width: 20),
                        SizedBox(
                          width: 60,
                          height: 60,
                          child: IconButton(
                            onPressed: () {},
                            icon: Image.asset("assets/google.png"),
                          ),
                        ),*/
                      ],
                    ),
                  ),
                  const SizedBox(height: 30.0),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                      fixedSize: Size(screenWidth - 40, 46),
                    ),
                    onPressed: () async {
                      if (_emailController.text.isEmpty ||
                          _passwordController.text.isEmpty) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text(
                              'Por favor, preencha todos os campos.',
                            ),
                          ),
                        );
                        return;
                      }
                      try {
                        final response = await api.login(
                          _emailController.text,
                          _passwordController.text,
                        );
                        print('response: $response');
                        if (response['success'] == true) {
                          if (response['twoFa'] == false || response['twoFa'] == null) {
                            final token = response['token'];

                            final prefs = await SharedPreferences.getInstance();
                            await prefs.setString('token', token);
                            
                            var userId = await api.getUserIdFromToken(token);
                            if (userId == null) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(
                                    'Erro ao obter ID do utilizador.',
                                  ),
                                ),
                              );
                              return;
                            } else {
                              context.go('/homepage', extra: userId);
                            }
                          //} else {
                            //context.go("/twofa");
                          //}
                        }
                      } catch (error) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('Erro ao efetuar login: $error'),
                          ),
                        );
                      }
                    },
                    child: const Text(
                      'Login',
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                  SizedBox(height: 20),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                      fixedSize: Size(screenWidth - 40, 46),
                    ),
                    onPressed: () {
                      context.go("/registo");
                    },
                    child: const Text(
                      'Registo',
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
