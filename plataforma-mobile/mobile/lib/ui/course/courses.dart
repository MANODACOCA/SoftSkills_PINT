import 'package:mobile/API/cursos_api.dart';
import 'package:mobile/ui/core/shared/cursos/card_cursos/course_page_scroll.dart';
import '../core/shared/export.dart';
import 'package:go_router/go_router.dart';


class Courses extends StatefulWidget {
  const Courses({super.key});

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
      final response = await _api.listCursoDisponiveisInsc();
      setState(() {
        cursos = response;
      });
    } catch(e) {
      print('Erro ao buscar os cursos: , $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBar(
        title: SearchBarCustom(),
        centerTitle: true,
        backgroundColor: AppColors.primary,
      ),
      body: Column(
        children: [
          GestureDetector(
            onTap: () => context.push('/list-cursos-inscrito'),
            child: Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Icon(Icons.school),
                        SizedBox(width: 10),
                        Text('Cursos Inscritos'),
                      ],
                    ),
                    Icon(Icons.chevron_right_rounded),
                  ],
                ),
              ),
            ),
          ),
          Expanded(
            child: SingleChildScrollView(
              child: (cursos.isEmpty) 
                ? Padding(padding: EdgeInsets.only(top: 40), child: Center(child: CircularProgressIndicator()),) 
                : Column(
                children: [
                  CourseScroll(cursos: cursos),
                ],
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
