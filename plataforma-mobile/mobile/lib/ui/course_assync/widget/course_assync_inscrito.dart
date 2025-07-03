import 'package:go_router/go_router.dart';
import 'package:mobile/API/cursos_api.dart';
import 'package:mobile/ui/core/shared/app_bar_arrow.dart';
import 'package:mobile/ui/core/shared/guide_arrow_courses.dart';
import '../../core/shared/export.dart';
import '../../core/shared/navigationbar_component.dart';


class AssincronoInscrito extends StatefulWidget {
  const AssincronoInscrito({super.key , required this.idCurso});

  final int idCurso;

  @override
  State<AssincronoInscrito> createState() => _AssincronoInscritoState();
}

class _AssincronoInscritoState extends State<AssincronoInscrito> {
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
    double screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      appBar: AppBarArrow(onBack: () => context.pop(),title: 'Curso'),
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
                        borderRadius: BorderRadius.circular(20),
                        child: Image.network(
                          curso['imagem'],
                          height: 135,
                          width: double.infinity,
                          fit: BoxFit.cover,
                          errorBuilder: (context, error, stackTrace) {
                            final fallbackImg = 'https://ui-avatars.com/api/?name=${Uri.encodeComponent(curso['nome_curso'])}&background=random&bold=true';
                            return Image.network(
                              fallbackImg,
                              height: 135,
                              width: double.infinity,
                              fit: BoxFit.cover,
                            );
                          },
                        )
                      ),
                    ),
                    SizedBox(height: 5,),
                    Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        "${curso['nome_curso']}",
                        style: TextStyle(fontSize: 23, fontWeight: FontWeight.bold),
                        textAlign: TextAlign.start,
                      ),
                    ),
                    TabbarCourses(curso: curso),
                  ],
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.all(10),
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  fixedSize: Size(screenWidth - 10, 46),
                ),
                onPressed: () {}, 
                child: Text('Inscrito', style: TextStyle(color: Colors.white),)
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
