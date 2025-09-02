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
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool isPasswordVisible = false;
  Icon passwordIcon = const Icon(
    Icons.visibility_off,
    color: AppColors.primary,
  );

  @override
  void initState() {
    super.initState();
    _checkAutoLogin();
  }

  Future<void> _checkAutoLogin() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');

    if (token != null && token.isNotEmpty) {
      // ignore: await_only_futures
      var userId = await api.getUserIdFromToken(token);
      if (userId != null) {
        // ignore: use_build_context_synchronously
        final authProvider = Provider.of<AuthProvider>(context, listen: false);
        await authProvider.setUser(User(id: userId), token: token);
        if (!mounted) return;
        context.go('/homepage');
      }
    }
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GestureDetector(
        onTap: () => FocusScope.of(context).unfocus(),
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
                              passwordIcon = isPasswordVisible
                                  ? const Icon(Icons.visibility, color: AppColors.primary)
                                  : const Icon(Icons.visibility_off, color: AppColors.primary);
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
                        onTap: () => context.go("/forgetpassword"),
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
                      if (_emailController.text.isEmpty || _passwordController.text.isEmpty) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Por favor, preencha todos os campos.')),
                        );
                        return;
                      }
                      try {
                        final response = await api.login(
                          _emailController.text,
                          _passwordController.text,
                        );
                        if (response['success'] == true) {
                          final token = response['token'];
                          final prefs = await SharedPreferences.getInstance();
                          // ignore: await_only_futures
                          var userId = await api.getUserIdFromToken(token);

                          if (userId == null) {
                            // ignore: use_build_context_synchronously
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(content: Text('Erro ao obter ID do utilizador.')),
                            );
                            return;
                          }

                          if (response['twoFa'] == true && response['jaAtivou'] != null) {
                            await prefs.setString('pending_token', token);
                            await prefs.setString('pending_userId', userId.toString());
                            if (!mounted) return;
                            // ignore: use_build_context_synchronously
                            context.go('/twofauten', extra: userId.toString());
                          } else if ((response['twoFa'] == false || response['twoFa'] == null) &&
                              response['jaAtivou'] != null) {
                            // login normal
                            await prefs.setString('token', token);
                            // ignore: use_build_context_synchronously
                            final authProvider = Provider.of<AuthProvider>(context, listen: false);
                            await authProvider.setUser(User(id: userId), token: token);
                            await authService.login(token, true); // auto login
                            // ignore: use_build_context_synchronously
                            context.go('/homepage');
                          } else if (response['jaAtivou'] == null) {
                            // ignore: use_build_context_synchronously
                            context.go('/firstlogin', extra: {'email': _emailController.text});
                          }
                        }
                      } catch (error) {
                        // ignore: use_build_context_synchronously
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Erro: $error')),
                        );
                      }
                    },
                    child: const Text('Login', style: TextStyle(color: Colors.white)),
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
                    onPressed: () => context.go("/registo"),
                    child: const Text('Criar conta', style: TextStyle(color: Colors.white)),
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
