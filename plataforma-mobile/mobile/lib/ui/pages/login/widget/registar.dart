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

  final _formKey = GlobalKey<FormState>();
  bool isLoading = false;

  String? _validateEmail(String? value) {
    if (value == null || value.isEmpty) {
      return 'O email é obrigatório';
    }
    // regex simples para validar email
    final emailRegex = RegExp(r'^[^@]+@[^@]+\.[^@]+');
    if (!emailRegex.hasMatch(value)) {
      return 'Insira um email válido';
    }
    return null;
  }

  String? _validateUserName(String? value) {
    if (value == null || value.isEmpty) {
      return 'O nome de utilizador é obrigatório';
    }
    if (value.length < 3) {
      return 'O nome deve ter pelo menos 3 caracteres';
    }
    return null;
  }

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
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20.0),
            child: Form(
              key: _formKey, // adicionamos o form
              child: Column(
                children: [
                  const SizedBox(height: 20),
                  Image.asset(
                    'assets/welcome.png',
                    width: double.infinity,
                    height: 290,
                    fit: BoxFit.cover,
                  ),
                  const SizedBox(height: 70),
                  const Text(
                    'Seja bem-vindo à SoftSkills',
                    style: TextStyle(
                      fontSize: 16,
                      fontStyle: FontStyle.italic,
                      color: Color.fromRGBO(105, 105, 105, 100),
                    ),
                  ),
                  const SizedBox(height: 30),
                  TextFormField(
                    controller: _userNomeController,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                      labelText: 'Nome de Utilizador',
                    ),
                    validator: _validateUserName,
                  ),
                  const SizedBox(height: 25),
                  TextFormField(
                    controller: _emailController,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                      labelText: 'Email',
                    ),
                    validator: _validateEmail,
                  ),
                  const SizedBox(height: 30),
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
                            : () async {
                              if (_formKey.currentState!.validate()) {
                                setState(() {
                                  isLoading = true;
                                });
                                try {
                                  var response = await api.createUtilizador(
                                    _userNomeController.text,
                                    _emailController.text,
                                  );

                                  if (response['success'] == true) {
                                    // Conta criada com sucesso
                                    await showDialog(
                                      context: context,
                                      builder:
                                          (context) => AlertDialog(
                                            title: const Text('Sucesso'),
                                            content: const Text(
                                              'Conta criada com sucesso!',
                                            ),
                                            actions: [
                                              TextButton(
                                                onPressed:
                                                    () =>
                                                        Navigator.of(
                                                          context,
                                                        ).pop(),
                                                child: const Text('OK'),
                                              ),
                                            ],
                                          ),
                                    );
                                    context.go('/login');
                                  }
                                } catch (error) {
                                  String message =
                                      'Ocorreu um erro inesperado: $error';

                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(content: Text(message)),
                                  );
                                } finally {
                                  setState(() {
                                    isLoading = false;
                                  });
                                }
                              }
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
                              'Criar Conta',
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
