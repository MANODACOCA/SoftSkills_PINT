import 'package:mobile/ui/core/shared/dropdown_component.dart';
import 'export.dart';

class DropdownFilter extends StatefulWidget {
  const DropdownFilter({super.key});

  static void show(BuildContext context) {
    showGeneralDialog(
      context: context,
      barrierLabel: 'Fechar',
      barrierDismissible: true,
      barrierColor: Color.fromARGB(150, 0, 0, 0),
      transitionDuration: Duration(milliseconds: 300),
      pageBuilder: (context, animation, secondaryAnimation) {
        return Stack(
          children: [
            GestureDetector(
              onTap: () => Navigator.of(context).pop(),
              child: Container(color: Colors.transparent),
            ),
            Align(
              alignment: Alignment.topCenter,
              child: SafeArea(
                child: Material(
                  color: Colors.transparent,
                  child: DropdownFilter(),
                ),
              ),
            ),
          ],
        );
      },
      transitionBuilder: (context, animation, secondaryAnimation, child) {
        return FadeTransition(opacity: animation, child: child);
      },
    );
  }

  @override
  State<DropdownFilter> createState() => _DropdownFilterState();
}

class _DropdownFilterState extends State<DropdownFilter> {
  final List<String> tipologia = ['Sincrono', 'Assincrono'];
  final List<String> items = [
    'Android',
    'iOS',
    'Flutter',
    'Node',
    'Java',
    'Python',
    'PHP',
    'React',
    'Vue.js',
    'Angular',
    'Kotlin',
    'Swift',
    'Dart',
    'C#',
    '.NET',
    'Ruby',
    'Laravel',
    'Spring Boot',
    'Express.js',
    'TypeScript',
    'Go',
    'Rust',
    'SQL',
    'NoSQL',
    'Firebase',
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'AWS',
    'Azure',
    'Docker',
    'Kubernetes',
  ];

  String? selectedRelevancia;
  String? selectedTipologia;
  String? selectedCategoria;
  String? selectedArea;
  String? selectedTopico;

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    return Container(
      width: screenWidth,
      padding: EdgeInsets.symmetric(horizontal: 20, vertical: 30),
      decoration: BoxDecoration(
        color: AppColors.background,
        borderRadius: BorderRadius.only(
          bottomLeft: Radius.circular(15),
          bottomRight: Radius.circular(15),
        ),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text('Filtrar por:', style: TextStyle(fontWeight: FontWeight.w600)),
          SizedBox(height: 15),
          DropdownComponent(
            type: 'Tipologia',
            items: tipologia,
            onChanged: (value) => setState(() => selectedTipologia = value),
          ),
          SizedBox(height: 15),
          DropdownComponent(
            type: 'Categoria',
            items: items,
            onChanged: (value) => setState(() => selectedCategoria = value),
          ),
          SizedBox(height: 15),
          DropdownComponent(
            type: 'Área',
            items: items,
            onChanged: (value) => setState(() => selectedArea = value),
          ),
          SizedBox(height: 15),
          DropdownComponent(
            type: 'Tópico',
            items: items,
            onChanged: (value) => setState(() => selectedTopico = value),
          ),
          SizedBox(height: 30),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
              fixedSize: Size(screenWidth - 40, 46),
            ),
            onPressed: () {
              // ignore: avoid_print
              print('Tipologia: $selectedTipologia');
              // ignore: avoid_print
              print('Categoria: $selectedCategoria');
              // ignore: avoid_print
              print('Área: $selectedArea');
              // ignore: avoid_print
              print('Tópico: $selectedTopico');

              Navigator.of(context).pop();
            },
            child: Text('Aplicar', style: TextStyle(color: Colors.white)),
          ),
          SizedBox(height: 15),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.red,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
              fixedSize: Size(screenWidth - 40, 46),
            ),
            onPressed: () => Navigator.of(context).pop(),
            child: Text('Cancelar', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }
}
