import 'package:go_router/go_router.dart';
import 'package:mobile/ui/core/shared/export.dart';
import 'package:pinput/pinput.dart';
//import '../../../../API/utilizadores_api.dart';

class ConfirmTwoFaScreen extends StatefulWidget {
  const ConfirmTwoFaScreen({super.key});

  @override
  State<ConfirmTwoFaScreen> createState() => _ConfirmTwoFaScreenState();
}

class _ConfirmTwoFaScreenState extends State<ConfirmTwoFaScreen> {
  final String _codigo = '12345';
  final TextEditingController pininputController = TextEditingController();
  bool errouCodigo = false;
  
  Color colorPIN = AppColors.primary;

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
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  if (pininputController.text == _codigo) {
                    context.go('/home');
                  } else {
                    // Exibir mensagem de erro se o código estiver incorreto
                    setState(() {
                      errouCodigo = true;
                      colorPIN = Colors.red;
                    });
                  }
                  // Lógica para verificar o código
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
