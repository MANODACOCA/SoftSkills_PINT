// ignore_for_file: use_build_context_synchronously

import '../../../core/shared/export.dart';
import 'package:go_router/go_router.dart';
import '../../../../API/utilizadores_api.dart';

class CreatePassword extends StatefulWidget {
  final String email;
  const CreatePassword({super.key, required this.email});

  @override
  State<CreatePassword> createState() => _CreatePassword();
}

class _CreatePassword extends State<CreatePassword> {
  final UtilizadoresApi api = UtilizadoresApi();
  bool isPasswordVisible = false;
  final newpass = TextEditingController();
  final pass = TextEditingController();
  bool isLoading = false;
  Icon passwordIcon = const Icon(
    Icons.visibility_off,
    color: AppColors.primary,
  );

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
                        labelText: 'Repita Password',
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
                    onPressed:
                        isLoading
                            ? null
                            : () {
                              confirm();
                            },
                    child:
                        isLoading
                            ? const SizedBox(
                              height: 24,
                              width: 24,
                              child: CircularProgressIndicator(
                                color: Colors.white,
                                strokeWidth: 2,
                              ),
                            )
                            : const Text(
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

  Future<void> analisar() async {
    final password = pass.text.trim();
    final confirmPassword = newpass.text.trim();

    // 1. Verifica se os campos estão preenchidos
    if (password.isEmpty || confirmPassword.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Por favor, preencha todos os campos.')),
      );
      return;
    }

    // 2. Verifica tamanho mínimo
    if (password.length < 8) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('A password deve ter pelo menos 8 caracteres.'),
        ),
      );
      return;
    }

    // 3. Verifica se são iguais
    if (password != confirmPassword) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('As passwords não coincidem!')),
      );
      return;
    }

    // 4. Se passou em todas as validações → chama API
    setState(() {
      isLoading = true;
    });

    try {
      var success = await api.alterarPassword(widget.email, password);

      if (success['success'] == true) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Password alterada com sucesso!')),
        );

        // pausa para o utilizador ver a mensagem
        await Future.delayed(const Duration(seconds: 2));

        if (!mounted) return;
        context.go("/login");
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Erro ao alterar password: ${success['message']}'),
          ),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Erro inesperado: $e')));
    } finally {
      if (mounted) {
        setState(() {
          isLoading = false;
        });
      }
    }
  }

  Future<void> confirm() {
    return showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Confirmação'),
          content: const Text('Tem a certeza da password que escolheu?'),
          actions: <Widget>[
            TextButton(
              style: TextButton.styleFrom(backgroundColor: Colors.green),
              child: const Text('Sim', style: TextStyle(color: Colors.white)),
              onPressed: () {
                Navigator.of(context).pop(); // fecha o diálogo 👈
                analisar(); // chama a função
              },
            ),
            TextButton(
              style: TextButton.styleFrom(backgroundColor: Colors.red),
              child: const Text('Não', style: TextStyle(color: Colors.white)),
              onPressed: () {
                Navigator.of(context).pop(); // fecha só o diálogo
              },
            ),
          ],
        );
      },
    );
  }
}
