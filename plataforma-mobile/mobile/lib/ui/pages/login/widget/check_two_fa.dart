import 'package:go_router/go_router.dart';
import 'package:mobile/ui/core/shared/export.dart';
//import '../../../../API/utilizadores_api.dart';

class ConfirmTwoFaScreen extends StatefulWidget {
  const ConfirmTwoFaScreen({super.key});

  @override
  State<ConfirmTwoFaScreen> createState() => _ConfirmTwoFaScreenState();
}

class _ConfirmTwoFaScreenState extends State<ConfirmTwoFaScreen> {
  @override
  void initState() {
    super.initState();
    //Funcao de criar twofa
    // verificarCodigo -> Funcao de verificar o codigo twofa
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBar(
        title: Text("Confirmação de TWOFA", style: TextStyle(color: Colors.white)),
        centerTitle: true,
        backgroundColor: AppColors.primary,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            context.pop();
          },
        ),
      ),
      body: Center(
        child: Text("Conteúdo da tela de confirmação TWOFA"),
      ),
    );
  }
}
