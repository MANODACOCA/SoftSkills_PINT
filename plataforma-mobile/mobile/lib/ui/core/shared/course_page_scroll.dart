import 'export.dart';
import 'card_course.dart';

class CourseScroll extends StatefulWidget {
  const CourseScroll({super.key, required this.cursos});

  final List<Map<String, dynamic>> cursos;

  @override
  State<CourseScroll> createState() => _CourseScroll();
}

class _CourseScroll extends State<CourseScroll> {
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
        SizedBox(
          child: GridView.count(
            controller: _scrollController,
            crossAxisCount: 2,
            childAspectRatio: 0.70,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(), 
            children: widget.cursos.map((curso) {
              final nome = curso['nome_curso'] ?? 'Curso';
              final fallbackImg = 'https://ui-avatars.com/api/?name=${Uri.encodeComponent(nome)}&background=random&bold=true';

              return Padding(
                padding: EdgeInsets.symmetric( vertical: 6, horizontal: 2),
                child: CardCourse(
                  title: nome,
                  typeCourse: curso['issincrono'] == true ? 'Síncrono' : 'Assíncrono',
                  startDate: DateTime.parse(curso['data_inicio_curso']),
                  endDate: DateTime.parse(curso['data_fim_curso']),
                  currentMembers: curso['contador_formandos'],
                  maxMembers: curso['sincrono'] != null ? curso['sincrono']['numero_vagas'] : 0,
                  img: curso['imagem'] ?? fallbackImg,
                  id: curso['id_curso'],
                ),
              );
            }).toList(),
          )
        )
      ]
    );
  }
}

  