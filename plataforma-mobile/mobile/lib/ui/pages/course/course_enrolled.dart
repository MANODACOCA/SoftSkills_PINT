import 'package:mobile/API/cursos_api.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:mobile/ui/core/shared/base_comp/app_bar_arrow.dart';
import 'package:mobile/ui/core/shared/cursos/card_cursos/course_enrolled_scroll.dart';
import 'package:provider/provider.dart';
import '../../core/shared/export.dart';
import 'package:go_router/go_router.dart';

class CourseEnrolled extends StatefulWidget {
  const CourseEnrolled({super.key});

  @override
  State<CourseEnrolled> createState() => _CourseEnrolledState();
}

class _CourseEnrolledState extends State<CourseEnrolled> {
  List<Map<String, dynamic>> cursos = [];
  final CursosApi _api = CursosApi();
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final userId = Provider.of<AuthProvider>(context, listen: false).user?.id;
      if (userId != null) {
        print('ID do utilizador: $userId');
        fetchCursosInscritos(int.parse(userId));
      }
    });
  }

  Future<void> fetchCursosInscritos (int userId) async {
    try{
      final response = await _api.listCursosInscritos(userId);
      setState(() {
        cursos = response;
        _loading = false;
      });
    } catch(e) {
      print('Erro ao buscar os cursos: , $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBarArrow(
        onBack: () => context.pop(),
        title: 'Cursos Inscritos'
      ),
      body: _loading 
      ? Center(child: CircularProgressIndicator(),) 
      : SingleChildScrollView(
        child: (cursos.isEmpty) 
          ? Container(
            padding: EdgeInsets.all(12),
            width: double.infinity,
            child: Card(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Text(
                  'Ainda não se encontra inscrito em nenhum curso...',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.grey),
                ),
              ),
            ),
          )
          : Column(
          children: [
            CourseEnrolledScroll(cursos: cursos)
          ],
        ),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
