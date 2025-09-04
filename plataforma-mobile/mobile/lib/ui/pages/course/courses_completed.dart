import 'package:mobile/API/cursos_api.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:mobile/ui/core/shared/base_comp/app_bar_arrow.dart';
import 'package:mobile/ui/core/shared/cursos/card_cursos/course_ended_scroll.dart';
import 'package:provider/provider.dart';
import '../../core/shared/export.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../../API/certificado_api.dart';

class CoursesCompleted extends StatefulWidget {
  const CoursesCompleted({super.key});

  @override
  State<CoursesCompleted> createState() => _CoursesCompletedState();
}

class _CoursesCompletedState extends State<CoursesCompleted> {
  List<Map<String, dynamic>> cursos = [];
  final CursosApi _api = CursosApi();
  int? formandoId;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final userId = Provider.of<AuthProvider>(context, listen: false).user?.id;
      if (userId != null) {
        formandoId = int.tryParse(userId);
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

  Future<void> _abrirNoNavegador(BuildContext context, int cursoId, formandoId) async {
    final uri = CertificadoApi().buildUri(cursoId, formandoId);

    final ok = await launchUrl(
      uri,
      mode: LaunchMode.externalApplication, 
    );

    if (!ok && context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Não foi possível abrir o certificado')),
      );
    }
  }

  void rota(int cursoId) {
    final formando = formandoId;
    if (formando == null) return;
     _abrirNoNavegador(context, cursoId, formando);
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBarArrow(
        onBack: () => context.pop(),
        title: 'Cursos terminados'
      ),
      body: SingleChildScrollView(
        child: (cursos.isEmpty) 
          ? Container(
            padding: EdgeInsets.all(12),
            width: double.infinity,
            child: Card(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Text(
                  'Ainda não concluiu nenhum curso...',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.grey),
                ),
              ),
            ),
          )
          : Column(
          children: [
            CourseEndedScroll(cursos: cursos, onTap: rota,),
          ],
        ),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
