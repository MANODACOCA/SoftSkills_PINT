// ignore_for_file: prefer_typing_uninitialized_variables, use_build_context_synchronously

import 'package:mobile/provider/auth_provider.dart';
import 'package:provider/provider.dart';

import '../../../../API/utilizadores_api.dart';
import '../../../core/shared/export.dart';
import 'package:go_router/go_router.dart';

class ChangeInfoPassword extends StatefulWidget {
  const ChangeInfoPassword({super.key, this.idUser});

  final String? idUser;

  @override
  State<ChangeInfoPassword> createState() => _ChangeInfoPasswordState();
}

class _ChangeInfoPasswordState extends State<ChangeInfoPassword> {
  final UtilizadoresApi api = UtilizadoresApi();
  bool isPasswordVisible1 = false;
  bool isPasswordVisible2 = false;
  final newPasswordController = TextEditingController();
  final repeatPasswordController = TextEditingController();
  Icon passwordIcon1 = const Icon(
    Icons.visibility_off,
    color: AppColors.primary,
  );
  Icon passwordIcon2 = const Icon(
    Icons.visibility_off,
    color: AppColors.primary,
  );

  var response;
  String email = '';

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final userId = Provider.of<AuthProvider>(context, listen: false).user?.id;
      if (userId != null) {
        print('Id utilizador: $userId');
        fetchUser();
      }
    });
  }

  Future<void> fetchUser() async {
    response = await api.getUtilizador(int.parse(widget.idUser!));
    setState(() {
      email = response['email'];
    });
  }

  Future<void> analisar() async {
    if (newPasswordController.text.isEmpty ||
        repeatPasswordController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Por favor, preencha ambos os campos de password.'),
        ),
      );
      return;
    }
    if (newPasswordController.text != repeatPasswordController.text) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('As passwords não coincidem!')),
      );
      return;
    }
    try {
      await api.alterarPassword(email, newPasswordController.text);

      // Mostra popup de confirmação de sucesso
      await showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: const Text('Sucesso'),
            content: const Text('A sua password foi alterada com sucesso!'),
            actions: [
              TextButton(
                style: TextButton.styleFrom(backgroundColor: Colors.green),
                child: const Text('OK', style: TextStyle(color: Colors.white)),
                onPressed: () {
                  Navigator.of(context, rootNavigator: true).pop();
                },
              ),
            ],
          );
        },
      );
      context.go('/profile');
    } catch (error) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erro ao alterar a password: $error')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text(
          'Alterar Password',
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: AppColors.primary,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          color: Colors.white,
          onPressed: () {
            context.go('/profile', extra: widget.idUser);
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
              padding: const EdgeInsets.symmetric(horizontal: 20.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const SizedBox(height: 50),
                  SizedBox(
                    width: 374,
                    height: 46,
                    child: TextField(
                      controller: newPasswordController,
                      obscureText: !isPasswordVisible1,
                      decoration: InputDecoration(
                        suffixIcon: IconButton(
                          icon: passwordIcon1,
                          onPressed: () {
                            setState(() {
                              isPasswordVisible1 = !isPasswordVisible1;
                              passwordIcon1 = Icon(
                                isPasswordVisible1
                                    ? Icons.visibility
                                    : Icons.visibility_off,
                                color: AppColors.primary,
                              );
                            });
                          },
                        ),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                          borderSide: const BorderSide(
                            color: Color.fromRGBO(211, 211, 211, 100),
                          ),
                        ),
                        labelText: 'Nova Password',
                      ),
                    ),
                  ),
                  const SizedBox(height: 31),
                  SizedBox(
                    width: 374,
                    height: 46,
                    child: TextField(
                      controller: repeatPasswordController,
                      obscureText: !isPasswordVisible2,
                      decoration: InputDecoration(
                        suffixIcon: IconButton(
                          icon: passwordIcon2,
                          onPressed: () {
                            setState(() {
                              isPasswordVisible2 = !isPasswordVisible2;
                              passwordIcon2 = Icon(
                                isPasswordVisible2
                                    ? Icons.visibility
                                    : Icons.visibility_off,
                                color: AppColors.primary,
                              );
                            });
                          },
                        ),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                          borderSide: const BorderSide(
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
                    onPressed: analisar,
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
      bottomNavigationBar: Footer(),
    );
  }
}
