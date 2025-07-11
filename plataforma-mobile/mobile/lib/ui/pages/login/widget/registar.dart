// ignore_for_file: use_build_context_synchronously

import '../../../core/shared/export.dart';
import 'package:go_router/go_router.dart';
import '../../../../API/utilizadores_api.dart';

class Register extends StatefulWidget {
  const Register({super.key});

  @override
  State<Register> createState() => _Register();
}

class _Register extends State<Register> {
  final UtilizadoresApi api = UtilizadoresApi();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _userNomeController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Bem-Vindo',
          style: TextStyle(color: Colors.white),
          textAlign: TextAlign.center,
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
        child: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 20.0),
                child: Column(
                  children: [
                    SizedBox(height: 20),
                    Image.asset(
                      'assets/welcome.png',
                      width: double.infinity,
                      height: 290,
                      fit: BoxFit.cover,
                    ),
                    Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: <Widget>[
                        SizedBox(height: 70),
                        Text(
                          'Seja bem-vindo à SoftSkills',
                          style: TextStyle(
                            fontSize: 16,
                            fontStyle: FontStyle.italic,
                            color: Color.fromRGBO(105, 105, 105, 100),
                          ),
                        ),
                        SizedBox(height: 30),
                        TextField(
                          controller: _userNomeController,
                          decoration: InputDecoration(
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(20),
                              borderSide: BorderSide(
                                color: Color.fromRGBO(211, 211, 211, 100),
                              ),
                            ),
                            labelText: 'Nome de Utilizador',
                          ),
                        ),
                        SizedBox(height: 25),
                        TextField(
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
                        SizedBox(height: 30),
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.primary,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(20),
                            ),
                            fixedSize: const Size(310, 46),
                          ),
                          onPressed: () async {
                            var success = await api.createUtilizador(
                              _userNomeController.text,
                              _emailController.text,
                            );
                            if (success['success'] == true) {
                              await showDialog(
                                context: context,
                                builder: (context) => AlertDialog(
                                  title: const Text('Sucesso'),
                                  content: const Text('Conta criada com sucesso!'),
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
                              context.go('/firstlogin',
                                extra: {'email': _emailController.text},
                              );
                            } else {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(
                                    'Erro ao criar utilizador: ${success['message']}',
                                  ),
                                ),
                              );
                            }
                          },
                          child: const Text(
                            'Criar Conta',
                            style: TextStyle(color: Colors.white),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
