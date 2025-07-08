import 'package:mobile/API/cat_area_top_api.dart';
import 'package:mobile/ui/core/shared/dropdown_component.dart';
import 'export.dart';

class DropdownFilter extends StatefulWidget {
  const DropdownFilter({super.key , required this.onApply});
  final void Function({String? tipologia, String? categoria, String? area, String? topico,}) onApply;

  static void show(BuildContext context, void Function({String? tipologia, String? categoria, String? area, String? topico}) onApply) {
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
                  child: DropdownFilter(onApply: onApply,),
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
  final CatAreaTopApi _cateAreaTopApi = CatAreaTopApi();

  List<Map<String,dynamic>> categorias = [];
  List<Map<String,dynamic>> areas = [];
  List<Map<String,dynamic>> topicos = [];
  final List<String> tipologia = ['todos', 'sincrono', 'assincrono'];

  String? selectedTipologia;
  String? selectedCategoria;
  String? selectedArea;
  String? selectedTopico;

  @override
  void initState() {
    super.initState();
    loadCategorias();
  }

  Future<void> loadCategorias() async {
    try {
      final response = await _cateAreaTopApi.getCatAreaTop();
      setState(() {
        categorias = response;
      });
    } catch (e) {
      print('Erro ao carregar categorias, áreas e tópicos: $e');
    }
  }

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
          SizedBox(height: 15),
          Align(
            alignment: Alignment.centerLeft,
            child: Text('Tipologia:', style: TextStyle(fontWeight: FontWeight.w600)),
          ),
          SizedBox(height: 15),
          DropdownComponent(
            key: ValueKey('tipologia-$selectedTipologia'),
            type: 'Tipologia',
            items: tipologia,
            value: selectedTipologia,
            onChanged: (value) => setState(() => selectedTipologia = value),
          ),
          SizedBox(height: 15),
          Align(
            alignment: Alignment.centerLeft,
            child: Text('Explorar:', style: TextStyle(fontWeight: FontWeight.w600)),
          ),
          SizedBox(height: 15),
          DropdownComponent(
            key: ValueKey('categoria-$selectedCategoria'),
            type: 'Categoria',
            items: categorias.map((e) => e['nome_cat'] as String).toList(),
            value: selectedCategoria,
            onChanged: (value) {
              setState(() {
                selectedCategoria = value;
                selectedArea = null;
                selectedTopico = null;
                final categoria = categorias.firstWhere((e) => e['nome_cat'] == value, orElse: () => {'areas': []},);
                areas = List<Map<String, dynamic>>.from(categoria['areas'] ?? []);
                topicos = [];
                /* for (int i = 0; i < areas.length; i++) {
                  final topicosCategoria = areas[i]['topicos'] ?? [];
                  topicos.addAll(List<Map<String,dynamic>>.from(topicosCategoria)); 
                } */
              });
            },
          ),
          SizedBox(height: 15),
          DropdownComponent(
            key: ValueKey('area-$selectedArea'),
            type: 'Área',
            items: areas.map((e) => e['nome_area'] as String).toList(),
            value: selectedArea,
            onChanged: (value) {
              setState(() {
                selectedArea = value;
                selectedTopico = null;
                final area = areas.firstWhere((e) => e['nome_area'] == value, orElse: () => {'topicos' : []});
                topicos = List<Map<String, dynamic>>.from(area['topicos'] ?? []);
              });
            },
          ),
          SizedBox(height: 15),
          DropdownComponent(
            key: ValueKey('topico-$selectedTopico'),
            type: 'Tópico',
            items: topicos.map((e) => e['nome_topico'] as String).toList(),
            value: selectedTopico,
            onChanged: (value) {
              setState(() {
                selectedTopico = value;
              });
            },
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
              final selectedTopicoId = topicos.firstWhere(
                (t) => t['nome_topico'] == selectedTopico,
                orElse: () => {'id_topico': null},
              )['id_topico'];

              widget.onApply(
                tipologia: selectedTipologia,
                categoria: selectedCategoria,
                area: selectedArea,
                topico: selectedTopicoId?.toString(),
              );
              print('Tipologia: $selectedTipologia');
              print('Categoria: $selectedCategoria');
              print('Área: $selectedArea');
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
