import '../../core/shared/export.dart';
import 'package:go_router/go_router.dart';
import '../../../API/utilizadores_api.dart';

class ChangePasswordForget extends StatefulWidget {
  const ChangePasswordForget({super.key});

  @override
  State<ChangePasswordForget> createState() => _ChangePassword();
}

class _ChangePassword extends State<ChangePasswordForget> {
  bool isPasswordVisible = false;
  final newpass = TextEditingController();
  final pass = TextEditingController();
  Icon passwordIcon = const Icon(
    Icons.visibility_off,
    color: AppColors.primary,
  );
  final UtilizadoresApi api = UtilizadoresApi();
  String? email;

  

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final extra = GoRouterState.of(context).extra;
    if (extra is Map && extra['email'] != null) {
      email = extra['email'] as String;
    }
  }

  Future<void> analisar() async {
    if (newpass.text == pass.text) {
      if (email == null) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Email não encontrado!')),
        );
        return;
      }
      final result = await api.alterarPassword(email!, pass.text);
      if (!mounted) return;
      if (result['success'] == true) {
        await showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: const Text('Sucesso'),
            content: const Text('Password alterada com sucesso!'),
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
          context.go('/login');
        }
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Erro ao alterar password: \\${result['message']}')),
        );
      }
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
        backgroundColor: AppColors.primary,
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
                        labelText: 'Repita Passowrd',
                      ),
                    ),
                  ),
                  const SizedBox(height: 90),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary,
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

  confirm() {
    return showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Aviso'),
          content: Text('Quer guardar as alterações?'),
          actions: <Widget>[
            TextButton(
              style: TextButton.styleFrom(backgroundColor: Colors.green),
              child: Text('Sim', style: TextStyle(color: Colors.white)),
              onPressed: () {
                context.go('/login');
               
                print('Alterações guardadas!');
              },
            ),
            TextButton(
              style: TextButton.styleFrom(backgroundColor: Colors.red),
              child: Text('Não', style: TextStyle(color: Colors.white)),
              onPressed: () {
                context.pop(); 
                
                print('Alterações não foram guardadas!');
              },
            ),
          ],
        );
      },
    );
  }
}
