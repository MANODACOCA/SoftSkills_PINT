import 'export.dart';
import 'card_course.dart';

class CardsScroll extends StatefulWidget {
  const CardsScroll({super.key, required this.tema});

  final String tema;
  
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

  final List<Map<String, dynamic>> cursos = [
    {
      'title': 'Curso de Flutter',
      'typeCourse': 'Assíncrono',
      'startDate': DateTime(2025, 6, 1),
      'endDate': DateTime(2025, 7, 1),
      'currentMembers': 25,
      'maxMembers': 100,
    },
    {
      'title': 'Curso de Python',
      'typeCourse': 'Síncrono',
      'startDate': DateTime(2025, 6, 10),
      'endDate': DateTime(2025, 7, 20),
      'currentMembers': 40,
      'maxMembers': 80,
    },
    {
      'title': 'Curso de Java',
      'typeCourse': 'Assíncrono',
      'startDate': DateTime(2025, 5, 15),
      'endDate': DateTime(2025, 6, 30),
      'currentMembers': 32,
      'maxMembers': 90,
    },
    {
      'title': 'Curso de Web com React',
      'typeCourse': 'Síncrono',
      'startDate': DateTime(2025, 6, 5),
      'endDate': DateTime(2025, 7, 25),
      'currentMembers': 18,
      'maxMembers': 60,
    },
    {
      'title': 'Curso de C++',
      'typeCourse': 'Assíncrono',
      'startDate': DateTime(2025, 7, 1),
      'endDate': DateTime(2025, 8, 1),
      'currentMembers': 50,
      'maxMembers': 100,
    },
    {
      'title': 'Curso de Machine Learning',
      'typeCourse': 'Síncrono',
      'startDate': DateTime(2025, 6, 20),
      'endDate': DateTime(2025, 8, 10),
      'currentMembers': 12,
      'maxMembers': 40,
    },
  ];

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
            itemCount: cursos.length,
            itemBuilder: (context, index) {
              final curso = cursos[index];
              return Container(
                width: 200,
                margin: EdgeInsets.only(left: index == 0 ? 5.0 : 0.0, right: 5.0, ),
                child: CardCourse(
                  title: curso['title'],
                  typeCourse: curso['typeCourse'],
                  startDate: curso['startDate'],
                  endDate: curso['endDate'],
                  currentMembers: curso['currentMembers'],
                  maxMembers: curso['maxMembers'],
                ),
              );
            },
          ),
        )
      ]
    );
  }
}

  