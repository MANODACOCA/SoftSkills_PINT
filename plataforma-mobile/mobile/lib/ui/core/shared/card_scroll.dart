import 'export.dart';
import 'card_course.dart';

class CardsScroll extends StatefulWidget {
  const CardsScroll({super.key, required this.tema, required this.cursos});

  final String tema;
  final List<Map<String, dynamic>> cursos;
  
  @override
  State<CardsScroll> createState() => _CardsScrollState();
}

class _CardsScrollState extends State<CardsScroll> {
  final ScrollController _scrollController = ScrollController();

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Padding(
          padding: EdgeInsets.symmetric( vertical: 8),
          child: Text(
            widget.tema,
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        SizedBox(
        height: 280,
          child: ListView.builder(
            controller: _scrollController,
            scrollDirection: Axis.horizontal,
            itemCount: widget.cursos.length,
            itemBuilder: (context, index) {
              final curso = widget.cursos[index];
              return Container(
                width: 200,
                margin: EdgeInsets.only(left: index == 0 ? 5.0 : 0.0, right: 5.0, ),
                child: CardCourse(
                  title: curso['nome_curso'],
                  typeCourse: curso['issincrono'] ? 'Assíncrono' : 'Síncrono',
                  startDate: curso['data_inicio_curso'],
                  endDate: curso['data_fim_curso'],
                  currentMembers: curso['contador_formandos'],
                  maxMembers: curso['contador_formandos'],
                ),
              );
            },
          ),
        )
      ]
    );
  }
}

  