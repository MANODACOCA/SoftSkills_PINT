// ignore_for_file: use_build_context_synchronously

import '../../../core/shared/export.dart';
import 'package:go_router/go_router.dart';
import '../../../../API/utilizadores_api.dart';

class ForgetPassword extends StatefulWidget {
  const ForgetPassword({super.key});

  @override
  State<ForgetPassword> createState() => _ForgetPassword();
}

class _ForgetPassword extends State<ForgetPassword> {
  final _api = UtilizadoresApi();
  TextEditingController emailController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Esqueceu Password',
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
        onTap: () => FocusScope.of(context).unfocus(),
        child: Center(
          child: SingleChildScrollView(
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 20.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Image.asset(
                    'assets/forget.png',
                    width: double.infinity,
                    height: 200,
                  ),
                  SizedBox(height: 15),
                  Text(
                    'Não se preocupe! Acontece. Por favor introduza o e-mail associado na sua conta',
                    style: TextStyle(
                      fontSize: 16,
                      fontStyle: FontStyle.italic,
                      color: Color.fromRGBO(105, 105, 105, 100),
                    ),
                  ),
                  SizedBox(height: 23),
                  SizedBox(
                    width: screenWidth,
                    height: 46,
                    child: TextField(
                      controller: emailController,
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
                  SizedBox(height: 75),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                      fixedSize: Size(screenWidth, 46),
                    ),
                    onPressed: () async {
                      final email = emailController.text.trim();
                      if (email.isEmpty) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('Por favor, insira o seu email.'),
                          ),
                        );
                        return;
                      }
                      try {
                        final resposta = await _api.esqueceuPassword(email);
                        print(resposta);
                        await showDialog(
                          context: context,
                          builder:
                              (context) => AlertDialog(
                                title: const Text('Sucesso'),
                                content: const Text(
                                  'Email enviado com sucesso!',
                                ),
                                actions: [
                                  TextButton(
                                    onPressed: () {
                                      context.pop();
                                    },
                                    child: const Text('OK'),
                                  ),
                                ],
                              ),
                        );
                        context.go("/confirmacao", extra: {'email': email});
                      } catch (e) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Erro ao enviar email.')),
                        );
                      }
                    },
                    child: const Text(
                      'Enviar Email',
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
