import 'package:go_router/go_router.dart';
import '../../../core/shared/export.dart';

class Support extends StatefulWidget {
  const Support({super.key});

  @override
  State<Support> createState() => _SupportState();
}

class _SupportState extends State<Support> {
  final List<Map<String, String>> faqItems = [
    {
      'question': 'Os cursos têm prazo para conclusão?',
      'answer': 'Sim, cada curso tem um prazo específico definido no início.',
    },
    {
      'question': 'Como posso aceder ao curso depois da inscrição?',
      'answer':
          'Após a inscrição, o curso estará disponível na sua área pessoal.',
    },
    {
      'question': 'Os cursos são em direto ou gravados?',
      'answer': 'Oferecemos tanto cursos em direto quanto gravados.',
    },
    {
      'question': 'Posso aceder ao curso a partir do telemóvel?',
      'answer': 'Sim, a plataforma é totalmente responsiva.',
    },
    {
      'question': 'Posso esclarecer dúvidas com os formadores?',
      'answer': 'Sim, através do fórum de discussão disponível em cada curso.',
    },
    {
      'question': 'Quem pode inscrever-se nos cursos?',
      'answer': 'Todos os colaboradores da empresa podem inscrever-se.',
    },
    {
      'question': 'O que devo fazer se tiver problemas de acesso?',
      'answer': 'Entre em contacto com o suporte técnico através do email.',
    },
  ];
  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBar(
        title: const Text('Suporte', style: TextStyle(color: Colors.white)),
        backgroundColor: AppColors.primary,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          color: Colors.white,
          onPressed: () {
            context.go('/profile');
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
              'Perguntas frequentes',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 20),
            ListView.builder(
              shrinkWrap: true,
              physics: NeverScrollableScrollPhysics(),
              itemCount: faqItems.length,
              itemBuilder: (context, index) {
                return ExpansionTile(
                  expandedAlignment: Alignment.centerLeft,
                  title: Text(
                    faqItems[index]['question']!,
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
                  ),
                  children: [
                    Padding(
                      padding: EdgeInsets.all(16),
                      child: Text(
                        faqItems[index]['answer']!,
                        style: TextStyle(fontSize: 14),
                      ),
                    ),
                  ],
                );
              },
            ),
            SizedBox(height: 20),
            Text(
              'Contactos',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 5),
            Text(
              'Tem alguma dúvida ou precisa de ajuda? A nossa equipa de suporte está disponível para o ajudar com quaisquer questões relacionadas com a plataforma de cursos',
            ),
            SizedBox(height: 50),
            Row(
              children: <Widget>[
                Icon(
                  Icons.email_rounded,
                  color: const Color.fromARGB(255, 88, 85, 85),
                ),
                SizedBox(width: 10),
                Text(
                  'E-mail de suporte: suporte@softinsa.com',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
              ],
            ),
            SizedBox(height: 50),
            Text(
              'Horário de Atendimento:',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 5),
            Row(
              children: <Widget>[
                Icon(
                  Icons.schedule,
                  color: const Color.fromARGB(255, 88, 85, 85),
                ),
                SizedBox(width: 10),
                Text(
                  'Segunda a Sexta-feira, das 9:00 às 18:00',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
              ],
            ),
            SizedBox(height: 50),
            Text(
              'Responderemos o seu pedido o mais breve possível',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
          ],
        ),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
