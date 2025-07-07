import 'package:mobile/API/cursos_api.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:mobile/ui/core/shared/base_comp/app_bar_arrow.dart';
import 'package:mobile/ui/core/shared/cursos/card_cursos/course_ended_scroll.dart';
import 'package:provider/provider.dart';
import '../core/shared/export.dart';
import 'package:go_router/go_router.dart';

class CoursesCompleted extends StatefulWidget {
  const CoursesCompleted({super.key});

  @override
  State<CoursesCompleted> createState() => _CoursesCompletedState();
}

class _CoursesCompletedState extends State<CoursesCompleted> {
  List<Map<String, dynamic>> cursos = [];
  final CursosApi _api = CursosApi();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final userId = Provider.of<AuthProvider>(context, listen: false).user?.id;
      if (userId != null) {
        print('ID do utilizador: $userId');
        fetchCursosCompleted(int.parse(userId));
      }
    });
  }

  Future<void> fetchCursosCompleted (int userId) async {
    try{
      final response = await _api.listCursoscompleted(userId);
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
      appBar: AppBarArrow(
        onBack: () => context.pop(),
        title: 'Cursos Completed'
      ),
      body: SingleChildScrollView(
        child: (cursos.isEmpty) 
          ? Padding(padding: EdgeInsets.only(top: 40), 
            child: Center(child: CircularProgressIndicator()),) 
          : Column(
          children: [
            CourseEndedScroll(cursos: cursos),
          ],
        ),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
