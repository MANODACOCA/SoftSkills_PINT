import 'package:mobile/API/cursos_api.dart';
import 'package:mobile/ui/core/shared/cursos/card_cursos/course_page_scroll.dart';
import 'package:mobile/ui/core/shared/dropdown_filter_cursos.dart';
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

  String _tipologia = "todos";
  List<int> _idTopico = [];
  String _search = "";

  Future<void> fetchCursos ({ String? tipologia, String? search, List<int>? idTopico}) async {
    _tipologia = tipologia ?? _tipologia;
    _idTopico = idTopico ?? _idTopico;
    _search = search ?? _search;

    try{
      final response = await _api.listCursoDisponiveisInsc(tipo: _tipologia, search: _search, idTopico: _idTopico);
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
        title: SearchBarCustom(
          hintText: 'Pesquisar cursos',
          onFilterTap: () {
            DropdownFilter.show(context, ({
              String? tipologia,
              String? categoria,
              String? area,
              String? topico,
            }) {
              fetchCursos(
                tipologia: tipologia ?? "todos",
                idTopico: topico != null ? [int.parse(topico)] : [],
              );
            });
          },
          onSearchChanged: (value) {
            fetchCursos(search: value);
          },
        ),
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
