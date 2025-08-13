import 'package:go_router/go_router.dart';
import 'package:mobile/API/cursos_api.dart';
import 'package:mobile/ui/core/shared/base_comp/app_bar_arrow.dart';
import 'package:mobile/ui/core/shared/cursos/cursos_comp/tabbar_cursos_inscrito.dart';
import 'package:mobile/utils/verifica_internet.dart';
import '../../core/shared/export.dart';


class CourseInscrito extends StatefulWidget {
  const CourseInscrito({super.key , required this.idCurso});

  final int idCurso;

  @override
  State<CourseInscrito> createState() => _CourseInscritoState();
}

class _CourseInscritoState extends State<CourseInscrito> {
  Map<String, dynamic> curso = {};
  final CursosApi _api = CursosApi();

  @override
  void initState() {
    super.initState();
    fetchCursos(widget.idCurso);
  }

  Future<void> fetchCursos (int idCurso) async {
    try{
      final esteCurso = await _api.getCurso(idCurso);
      setState(() {
        curso = esteCurso;
      });
    } catch(e) {
      print('Erro ao buscar o curso: , $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    //double screenWidth = MediaQuery.of(context).size.width;
    return AppScaffold(
      appBar: AppBarArrow(onBack: () => context.go('/cursos'),title: 'Curso'),
      body: Center(
        child: curso.isEmpty 
          ? Padding(padding: EdgeInsets.all(4), child: Center(child: CircularProgressIndicator()),) 
          : Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                padding: EdgeInsets.all(10),
                child: Column(
                  children: [
                    SizedBox(
                      width: MediaQuery.of(context).size.width,
                      height: 200,
                      child: ClipRRect(
                        borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(12),
                          topRight: Radius.circular(12),
                        ),
                        child: FutureBuilder<bool>(
                          future: temInternet(),
                          builder: (context, snapshot) {
                            final online = snapshot.data ?? true;
                            final nome = curso['nome_curso'];
                            final imageUrl = Uri.https(
                              'ui-avatars.com',
                              '/api/',
                              {
                                'name': nome,
                                'background': 'random',
                                'bold': 'true',
                              },
                            ).toString();
                            if (online) {
                              return Image.network(
                                curso['imagem'],
                                width: double.infinity,
                                height: 135,
                                fit: BoxFit.cover,
                                errorBuilder: (context, error, stackTrace) {
                                  return Image.network(
                                    imageUrl,
                                    width: double.infinity,
                                    height: 135,
                                    fit: BoxFit.cover,
                                  );
                                },
                              );
                            } else {
                              return Image.asset(
                                'assets/course-horizontal.png',
                                width: double.infinity,
                                height: 135,
                                fit: BoxFit.cover,
                              );
                            }
                          },
                        ),
                      ),
                    ),
                    SizedBox(height: 5,),
                    Align(
                      alignment: Alignment.centerLeft,
                      child: Container(
                        height: 70,
                        alignment: Alignment.centerLeft,
                        child: Text(
                          "${curso['nome_curso']}",
                          style: TextStyle(fontSize: 23, fontWeight: FontWeight.bold),
                          textAlign: TextAlign.start,
                        ),  
                      ),
                      
                    ),
                    TabbarCoursesInscrito(curso: curso),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
