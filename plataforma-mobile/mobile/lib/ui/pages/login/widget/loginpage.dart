//import 'dart:convert';
//import 'package:mobile/data/services/basedados.dart';
// ignore_for_file: use_build_context_synchronously, await_only_futures

import 'package:mobile/provider/user.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:mobile/services/auth_service.dart';
import 'package:provider/provider.dart';
import '../../../core/shared/export.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../API/utilizadores_api.dart';

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
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
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
              padding: const EdgeInsets.symmetric(horizontal: 20.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const SizedBox(height: 60),
                  Image.asset('assets/logo-softinsa.png'),
                  const SizedBox(height: 90.0),
                  SizedBox(
                    height: 46,
                    child: TextField(
                      controller: _emailController,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                          borderSide: const BorderSide(
                            color: Color.fromRGBO(211, 211, 211, 100),
                          ),
                        ),
                        labelText: 'Email',
                      ),
                    ),
                  ),
                  const SizedBox(height: 25),
                  SizedBox(
                    height: 46,
                    child: TextField(
                      controller: _passwordController,
                      obscureText: !isPasswordVisible,
                      decoration: InputDecoration(
                        suffixIcon: IconButton(
                          icon: passwordIcon,
                          onPressed: () {
                            setState(() {
                              isPasswordVisible = !isPasswordVisible;
                              if (isPasswordVisible) {
                                passwordIcon = const Icon(
                                  Icons.visibility,
                                  color: AppColors.primary,
                                );
                              } else {
                                passwordIcon = const Icon(
                                  Icons.visibility_off,
                                  color: AppColors.primary,
                                );
                              }
                            });
                          },
                        ),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                          borderSide: const BorderSide(
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
                        child: const Text(
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
                        children: [
                          Switch(
                            activeColor: AppColors.primary,
                            value: isSwitched,
                            onChanged: (value) async {
                              setState(() {
                                isSwitched = value;
                              });
                              await _saveRememberMe(value);
                            },
                          ),
                          const SizedBox(width: 10),
                          const Text(
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
                      children: const [],
                    ),
                  ),
                  const SizedBox(height: 30.0),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.all(Radius.circular(20)),
                      ),
                      minimumSize: const Size.fromHeight(46),
                    ),
                    onPressed: () async {
                      if (_emailController.text.isEmpty ||
                          _passwordController.text.isEmpty) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
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
                        print('Response: $response');
                        if (response['success'] == true) {
                          final token = response['token'];
                          final prefs = await SharedPreferences.getInstance();

                          var userId = await api.getUserIdFromToken(token);
                          print('User ID: $userId');
                          if (userId == null) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text(
                                  'Erro ao obter ID do utilizador.',
                                ),
                              ),
                            );
                            return;
                          }

                          if (response['twoFa'] == true) {
                            print(
                              '====== Two-Factor Authentication is enabled ======',
                            );
                            // Guarda o token temporariamente (não faz login ainda!)
                            await prefs.setString('pending_token', token);
                            await prefs.setString(
                              'pending_userId',
                              userId.toString(),
                            );
                            if (!mounted) return;
                            context.go('/twofauten', extra: userId.toString());
                          } else {
                            // Login normal, porque 2FA está desativado
                            await prefs.setString(
                              'token',
                              token,
                            ); // só agora grava o token real
                            final authProvider = Provider.of<AuthProvider>(
                              context,
                              listen: false,
                            );
                            final user = User(id: userId);
                            if (!mounted) return;
                            authProvider.setUser(user, token: token);
                            await authService.login(token, isSwitched);
                            context.go('/homepage');
                          }
                        }
                      } catch (error) {
                        String mensagem = 'Erro: $error';
                        ScaffoldMessenger.of(
                          context,
                        ).showSnackBar(SnackBar(content: Text(mensagem)));
                      }
                    },
                    child: const Text(
                      'Login',
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                  const SizedBox(height: 20),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.all(Radius.circular(20)),
                      ),
                      minimumSize: const Size.fromHeight(46),
                    ),
                    onPressed: () {
                      context.go("/registo");
                    },
                    child: const Text(
                      'Criar conta',
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
