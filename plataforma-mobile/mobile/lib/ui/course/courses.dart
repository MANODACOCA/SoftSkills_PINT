import 'package:mobile/API/cursos_api.dart';
import 'package:mobile/ui/core/shared/course_page_scroll.dart';
import '../core/shared/navigationbar_component.dart';
import '../core/shared/search_bar.dart';
import '../core/shared/export.dart';

class Courses extends StatefulWidget {
  const Courses({super.key, required this.idUser});

  final String idUser;

  @override
  State<Courses> createState() => _Courses();
}

class _Courses extends State<Courses> {
  List<Map<String, dynamic>> cursos = [];
  final CursosApi _api = CursosApi();

  @override
  void initState() {
    super.initState();
    fetchCursos();
  }

  Future<void> fetchCursos () async {
    try{
      final response = await _api.listCursos();
      setState(() {
        cursos = response;
      });
    } catch(e) {
      print('Erro ao buscar os cursos: , $e');
    }
  }

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
            CourseScroll(cursos: cursos),
          ],
        ),
      ),
      bottomNavigationBar: Footer(idUser: widget.idUser),
    );
  }
}
