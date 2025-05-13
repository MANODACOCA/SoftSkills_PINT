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
                      margin: const EdgeInsets.symmetric(horizontal: 5.0),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(20),
                        child: Image.asset(path, fit: BoxFit.cover),
                      ),
                    );
                  },
                );
              }).toList(),
            ),
            const SizedBox(height: 10),
            Padding(
              padding: const EdgeInsets.all(8),
              child: GridView.builder(
                itemCount: 6,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(), 
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 10,
                  mainAxisSpacing: 10,
                  mainAxisExtent: 280,
                ),
                itemBuilder: (context, index) {
                  return CardCourse(
                    title: 'Curso de C++',
                    typeCourse: 'Assincrono',
                    startDate: DateTime(2025, 5, 10),
                    endDate: DateTime(2025, 6, 15),
                    currentMembers: 12,
                    maxMembers: 80,
                  );
                },
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
