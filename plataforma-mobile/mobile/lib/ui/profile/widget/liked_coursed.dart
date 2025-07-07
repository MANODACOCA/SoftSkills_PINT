import 'package:go_router/go_router.dart';
//import '../../core/shared/navigationbar_component.dart';
import '../../core/shared/export.dart';

class LikedCourses extends StatefulWidget {
  const LikedCourses({super.key});

  @override
  State<LikedCourses> createState() => _LikedCoursesState();
}

class _LikedCoursesState extends State<LikedCourses> {
  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          color: Colors.white,
          onPressed: () async {
            context.pop();
          },
        ),
        title: Text("Cursos Favoritos", style: TextStyle(color: Colors.white)),
        centerTitle: true,
        backgroundColor: AppColors.primary,
      ),
      body: Column(
        children: [
          Expanded(
            child: Padding(
              padding: EdgeInsets.all(20),
              child: Column(children: [Text('Lista de cursos favoritos')]),
            ),
          ),
        ],
      ),
      bottomNavigationBar: Footer(),
    );
  }
}