// ignore_for_file: prefer_typing_uninitialized_variables, use_build_context_synchronously

import 'package:go_router/go_router.dart';
import 'package:mobile/ui/core/shared/export.dart';
import 'package:pinput/pinput.dart';
import '../../../../API/utilizadores_api.dart';
//import '../../../../API/utilizadores_api.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../services/auth_service.dart';
import '../../../../provider/user.dart';
import '../../../../provider/auth_provider.dart';

class ConfirmTwoFaScreen extends StatefulWidget {
  const ConfirmTwoFaScreen({super.key, required this.id});

  final String id;

  @override
  State<ConfirmTwoFaScreen> createState() => _ConfirmTwoFaScreenState();
}

class _ConfirmTwoFaScreenState extends State<ConfirmTwoFaScreen> {
  final TextEditingController pininputController = TextEditingController();
  bool errouCodigo = false;
  Color colorPIN = AppColors.primary;
  Map<String, dynamic> user = {};

  @override
  void initState() {
    super.initState();
    //Funcao de criar twofa
    fetchUtilizador(int.parse(widget.id));
    _checkRememberMe();
    // verificarCodigo -> Funcao de verificar o codigo twofa
  }

  Future<void> _checkRememberMe() async {
    final prefs = await SharedPreferences.getInstance();
    final rememberMe = prefs.getBool('remember_me') ?? false;
    final token = prefs.getString('token') ?? '';
  }

  Future<void> fetchUtilizador(int userid) async {
    try {
      final esteUtilizador = await UtilizadoresApi().getUtilizador(userid);
      setState(() {
        user = esteUtilizador;
      });
    } catch (e) {
      print('Erro ao buscar o curso: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBar(
        title: Text(
          "Verificação de Código",
          style: TextStyle(color: Colors.white),
        ),
        centerTitle: true,
        backgroundColor: AppColors.primary,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            context.go('/login');
          },
        ),
      ),
      body: GestureDetector(
        child: Container(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                "Insira o código de verificação enviado para o seu e-mail.",
                style: TextStyle(fontSize: 16, color: Colors.black54),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 30),
              Form(
                child: Column(
                  children: [
                    Pinput(
                      controller: pininputController,
                      length: 5,
                      defaultPinTheme: PinTheme(
                        width: 50,
                        height: 50,
                        textStyle: const TextStyle(
                          fontSize: 20,
                          color: Colors.black,
                        ),
                        decoration: BoxDecoration(
                          border: Border.all(color: colorPIN),
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 10),
              if (errouCodigo == true)
                Text(
                  "Código incorreto ou inválido. Tente novamente.",
                  style: TextStyle(color: Colors.red, fontSize: 14),
                ),
              SizedBox(height: 5),
              Container(
                padding: const EdgeInsets.only(right: 25),
                child: Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    style: TextButton.styleFrom(
                      padding: EdgeInsets.zero,
                      minimumSize: Size(0, 0),
                      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                    ),
                    onPressed: () {
                      colorPIN = AppColors.primary;
                      pininputController.clear();
                      setState(() {
                        errouCodigo = false;
                      });
                      UtilizadoresApi().resendCodigo(user['email']);
                    },
                    child: Text(
                      "Reenviar Código",
                      style: TextStyle(
                        color: AppColors.secondary,
                        fontSize: 14,
                        decoration: TextDecoration.underline,
                      ),
                    ),
                  ),
                ),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () async {
                  try {
                    final response = await UtilizadoresApi().verificarCodigo(
                      user['email'],
                      pininputController.text,
                    );
                    if (response['success'] == true) {
                      // recupera token e userId pendentes
                      final prefs = await SharedPreferences.getInstance();
                      final token = prefs.getString('pending_token');
                      final userIdStr = prefs.getString('pending_userId');
                      if (token != null && userIdStr != null) {
                        final authProvider = Provider.of<AuthProvider>(
                          context,
                          listen: false,
                        );
                        final userModel = User(id: userIdStr);
                        authProvider.setUser(userModel, token: token);
                        final rememberMe =
                            prefs.getBool('remember_me') ?? false;
                        await authService.login(token, rememberMe);
                        // limpa valores pendentes
                        await prefs.remove('pending_token');
                        await prefs.remove('pending_userId');
                      }
                      // finalmente navega para a home
                      context.go('/homepage');
                    } else {
                      setState(() {
                        errouCodigo = true;
                        colorPIN = Colors.red;
                      });
                    }
                  } catch (e) {
                    setState(() {
                      errouCodigo = true;
                      colorPIN = Colors.red;
                    });
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  padding: EdgeInsets.symmetric(horizontal: 32, vertical: 12),
                  textStyle: TextStyle(fontSize: 16),
                ),
                child: Text("Verificar", style: TextStyle(color: Colors.white)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
