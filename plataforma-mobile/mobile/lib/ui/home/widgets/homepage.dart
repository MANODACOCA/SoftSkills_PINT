import '../../core/shared/navigationbar_component.dart';
import '../../core/shared/card_course.dart';
import '../../core/shared/search_bar.dart';
import '../../core/shared/export.dart';

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
      body: Padding(
        padding: const EdgeInsets.all(2),
        child: GridView.count(
          crossAxisCount: 2,
          childAspectRatio: 0.75,
          children: [
            CardCourse(title: 'ola', typeCourse: 'assincrono'),
            /* CardCourse(),
            CardCourse(),
            CardCourse(),
            CardCourse(),
            CardCourse(),
            CardCourse(),
            CardCourse(), */
          ],
        ),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
