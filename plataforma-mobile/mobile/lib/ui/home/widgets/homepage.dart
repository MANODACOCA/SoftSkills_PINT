import '../../core/shared/navigationbar_component.dart';
import '../../core/shared/card_course.dart';
import '../../core/shared/search_bar.dart';
import '../../core/shared/export.dart';
import 'package:carousel_slider/carousel_slider.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePage();
}

class _HomePage extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: SearchBarCustom(),
        centerTitle: true,
        backgroundColor: AppColors.primary,
      ),
      /* body: Column(
        children: [
          const SizedBox(height: 6),
          CarouselSlider(
            options: CarouselOptions(
              height: 200.0, 
              viewportFraction: 0.90,
              autoPlay: true),
            items:
                [
                  'assets/course-flutter.png',
                  'assets/course-flutter.png',
                  'assets/course-flutter.png',
                  'assets/course-flutter.png',
                  'assets/course-flutter.png',
                ].map((path) {
                  return Builder(
                    builder: (BuildContext context) {
                      return Container(
                        width: MediaQuery.of(context).size.width,
                        margin: EdgeInsets.symmetric(horizontal: 5.0),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(20),
                          child: Image.asset(path, fit: BoxFit.cover),
                        ),
                      );
                    },
                  );
                }).toList(),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(2),
              child: GridView.count(
                crossAxisCount: 2,
                childAspectRatio: 0.75,
                children: [
                  CardCourse(
                    title: 'Curso de C++',
                    typeCourse: 'Assincrono',
                    startDate: DateTime(2025, 5, 10),
                    endDate: DateTime(2025, 6, 15),
                    currentMembers: 12,
                    maxMembers: 80,
                  ),
                  CardCourse(
                    title: 'Curso de C++',
                    typeCourse: 'Assincrono',
                    startDate: DateTime(2025, 5, 10),
                    endDate: DateTime(2025, 6, 15),
                    currentMembers: 12,
                    maxMembers: 80,
                  ),
                ],
              ),
            ),
          ),
        ],
      ), */

      body: SingleChildScrollView(
        child: Column(
          children: [
            const SizedBox(height: 6),
            CarouselSlider(
              options: CarouselOptions(
                height: 200.0,
                viewportFraction: 0.90,
                autoPlay: true,
              ),
              items: [
                'assets/course-flutter.png',
                'assets/course-flutter.png',
                'assets/course-flutter.png',
                'assets/course-flutter.png',
                'assets/course-flutter.png',
              ].map((path) {
                return Builder(
                  builder: (BuildContext context) {
                    return Container(
                      width: MediaQuery.of(context).size.width,
                      margin: EdgeInsets.symmetric(horizontal: 5.0),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(20),
                        child: Image.asset(path, fit: BoxFit.cover),
                      ),
                    );
                  },
                );
              }).toList(),
            ),
            Padding(
              padding: const EdgeInsets.all(8),
              child: GridView.count(
                crossAxisCount: 2,
                childAspectRatio: 0.75,
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                children: [
                  CardCourse(
                    title: 'Curso de C++',
                    typeCourse: 'Assincrono',
                    startDate: DateTime(2025, 5, 10),
                    endDate: DateTime(2025, 6, 15),
                    currentMembers: 12,
                    maxMembers: 80,
                  ),
                  CardCourse(
                    title: 'Curso de C++',
                    typeCourse: 'Assincrono',
                    startDate: DateTime(2025, 5, 10),
                    endDate: DateTime(2025, 6, 15),
                    currentMembers: 12,
                    maxMembers: 80,
                  ),
                  CardCourse(
                    title: 'Curso de C++',
                    typeCourse: 'Assincrono',
                    startDate: DateTime(2025, 5, 10),
                    endDate: DateTime(2025, 6, 15),
                    currentMembers: 12,
                    maxMembers: 80,
                  ),
                  CardCourse(
                    title: 'Curso de C++',
                    typeCourse: 'Assincrono',
                    startDate: DateTime(2025, 5, 10),
                    endDate: DateTime(2025, 6, 15),
                    currentMembers: 12,
                    maxMembers: 80,
                  ),
                  CardCourse(
                    title: 'Curso de C++',
                    typeCourse: 'Assincrono',
                    startDate: DateTime(2025, 5, 10),
                    endDate: DateTime(2025, 6, 15),
                    currentMembers: 12,
                    maxMembers: 80,
                  ),
                  CardCourse(
                    title: 'Curso de C++',
                    typeCourse: 'Assincrono',
                    startDate: DateTime(2025, 5, 10),
                    endDate: DateTime(2025, 6, 15),
                    currentMembers: 12,
                    maxMembers: 80,
                  ),
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
