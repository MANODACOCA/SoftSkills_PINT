import 'package:go_router/go_router.dart';
//import 'package:mobile/ui/core/shared/navigationbar_component.dart';
import '../../../core/shared/export.dart';

class PrivacyPolitics extends StatefulWidget {
  const PrivacyPolitics({super.key});

  @override
  State<PrivacyPolitics> createState() => _PrivacyPoliticsState();
}

class _PrivacyPoliticsState extends State<PrivacyPolitics> {
  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBar(
        title: const Text(
          'Política de Privacidade',
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: AppColors.primary,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          color: Colors.white,
          onPressed: () {
            context.pop();
          },
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Text(
              'Política de Privacidade',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 30),
            SizedBox(
              child: Column(
                children: <Widget>[
                  SizedBox(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: <Widget>[
                        Text(
                          '1. Tipos de dados que recolhemos',
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 10),
                        Text(
                          'Neste projeto, são recolhidas apenas as informações estritamente necessárias para o seu funcionamento, como dados de identificação, contactos ou informações de uso da aplicação. Estes dados permitem melhorar a experiência do utilizador, garantir a segurança do sistema e acompanhar o desempenho do projeto. Toda a informação é tratada de forma confidencial e em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD).',
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.normal,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 20),
                  SizedBox(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: <Widget>[
                        Text(
                          '2. Utilização dos seus dados pessoais',
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 10),
                        Text(
                          'Utilizamos as tuas informações pessoais apenas para os fins a que deste consentimento, como melhorar a tua experiência, prestar serviços personalizados e garantir o bom funcionamento da plataforma. Os teus dados são tratados com segurança, não são partilhados com terceiros sem autorização, e podes, a qualquer momento, consultar, alterar ou eliminar as tuas informações. Respeitamos sempre a tua privacidade e cumprimos a legislação em vigor, nomeadamente o RGPD.',
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.normal,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 20),
                  SizedBox(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: <Widget>[
                        Text(
                          '3. Divulgação dos seus dados pessoais',
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 10),
                        Text(
                          'As informações pessoais que partilhas podem ser acedidas por entidades autorizadas, como empresas, plataformas digitais ou serviços públicos, conforme o teu consentimento e a legislação aplicável, como o Regulamento Geral sobre a Proteção de Dados (RGPD). Esses dados podem ser utilizados para finalidades específicas, como melhorar serviços, personalizar conteúdos, enviar comunicações ou cumprir obrigações legais. Tens sempre o direito de saber quem tem acesso aos teus dados, para que fins são usados, e podes solicitar a sua correção ou eliminação a qualquer momento.',
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.normal,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 30),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
