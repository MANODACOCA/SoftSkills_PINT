import '../../export.dart';
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
            shrinkWrap: true,
            itemCount: widget.cursos.length,
            itemBuilder: (context, index) {
              final curso = widget.cursos[index];
              final nome = curso['nome_curso'];
              final fallbackImg = 'https://ui-avatars.com/api/?name=${Uri.encodeComponent(nome)}&background=random&bold=true';
              return Container(
                width: 200,
                margin: EdgeInsets.only(left: index == 0 ? 5.0 : 0.0, right: 5.0, ),
                child: CardCourse(
                  title: curso['nome_curso'],
                  typeCourse: curso['issincrono'] == true ? 'Síncrono' : 'Assíncrono',
                  startDate: DateTime.parse(curso['data_inicio_curso']),
                  endDate: DateTime.parse(curso['data_fim_curso']),
                  currentMembers: curso['contador_formandos'],
                  maxMembers: curso['sincrono'] != null ? curso['sincrono']['numero_vagas'] : 0,
                  img: curso['imagem'] ?? fallbackImg,
                  id: curso['id_curso'],
                ),
              );
            },
          ),
        )
      ]
    );
  }
}

  