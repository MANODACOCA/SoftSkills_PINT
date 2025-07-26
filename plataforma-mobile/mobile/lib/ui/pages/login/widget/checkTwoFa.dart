// ignore: file_names
import 'package:go_router/go_router.dart';
import 'package:mobile/ui/core/shared/export.dart';
import '../../../../API/two_fa.dart';

//FALTA COLOCAR NUMA ROTA

class ConfirmTwoFaScreen extends StatefulWidget {
  const ConfirmTwoFaScreen({super.key});

  @override
  State<ConfirmTwoFaScreen> createState() => _ConfirmTwoFaScreenState();
}

class _ConfirmTwoFaScreenState extends State<ConfirmTwoFaScreen> {
  String? _twoFaCode;
  @override
  void initState() {
    super.initState();
    //Funcao de criar twofa
    _twoFaCode = '123456'; // Simulação de código TwoFA
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
