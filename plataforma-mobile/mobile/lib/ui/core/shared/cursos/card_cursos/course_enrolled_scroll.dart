import 'package:mobile/ui/core/shared/cursos/card_cursos/card_course_enrolled.dart';

import '../../export.dart';

class CourseEnrolledScroll extends StatefulWidget {
  const CourseEnrolledScroll({super.key, required this.cursos});

  final List<Map<String, dynamic>> cursos;

  @override
  State<CourseEnrolledScroll> createState() => _CourseEnrolledScrollState();
}

class _CourseEnrolledScrollState extends State<CourseEnrolledScroll> {
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
          child: ListView.builder(
            controller: _scrollController,
            scrollDirection: Axis.vertical,
            shrinkWrap: true,
            itemCount: widget.cursos.length,
            itemBuilder: (context, index) {
              final curso = widget.cursos[index];
              return Container(
                height: 155,
                width: 200,
                margin: EdgeInsets.symmetric(horizontal: 5),
                child: CardCourseEnrolled(curso: curso)
              );
            },
          ),
        )
      ]
    );
  }
}

  