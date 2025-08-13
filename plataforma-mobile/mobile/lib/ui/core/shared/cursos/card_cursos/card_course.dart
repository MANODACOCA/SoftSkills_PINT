import 'package:go_router/go_router.dart';
import 'package:mobile/API/inscricao_api.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:mobile/utils/verifica_internet.dart';
import 'package:provider/provider.dart';
import '../../../../../utils/uteis.dart';
import '../../export.dart';
import 'package:http/http.dart' as http;

class CardCourse extends StatefulWidget {
  const CardCourse({
    super.key,
    required this.title,
    required this.typeCourse,
    required this.startDate,
    required this.endDate,
    required this.currentMembers,
    required this.maxMembers,
    required this.img,
    required this.id,
  });

  final String title;
  final String typeCourse;
  final DateTime startDate;
  final DateTime endDate;
  final int currentMembers;
  final int maxMembers;
  final String img;
  final int id;

  @override
  State<CardCourse> createState() => _CardCourseState();
}

class _CardCourseState extends State<CardCourse> {
  final InscricaoApi _api = InscricaoApi();
  bool inscrito = false;
  int ? idUser;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final userId = Provider.of<AuthProvider>(context, listen: false).user?.id;
      if (userId != null) {
        print('ID do utilizador: $userId');
        setState(() {
          idUser = int.parse(userId);
        });
      }
    });
  }

  Future<bool> verificaInscrito (int userId, int cursoId) async {
    try {
      await _api.getInscricao(userId, cursoId);
      setState(() {
        inscrito = true;
      });
      print('$inscrito');
      return true;
    } catch (e) {
      if(e is http.Response && e.statusCode == 404) {
        setState(() {
          inscrito = false;
        });
        print('$inscrito');
        return false;
      }
      print('Erro ao verificar inscrição: $e');
      return false;
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () async {
          final estaInscrito =  await verificaInscrito( idUser!, widget.id);
          if(!context.mounted) return;
          if(estaInscrito){
            context.go('/cursos-inscritos', extra: widget.id);            
          } else {
            context.go('/inscrever', extra: widget.id);
          }
      },
      child: Card(
        elevation: 2,
        shadowColor: Colors.black,
        color: AppColors.background,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(12),
                topRight: Radius.circular(12),
              ),
              child: FutureBuilder<bool>(
                future: temInternet(),
                builder: (context, snapshot) {
                  final online = snapshot.data ?? true;
                  final nome = widget.title;
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
                      widget.img,
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
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [               
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.primary,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          widget.typeCourse,
                          style: const TextStyle(color: Colors.white),
                        ),
                      ),
                      if(widget.typeCourse == 'Síncrono') ...[
                        Row(
                          children: [
                            Text(
                              '${widget.currentMembers}/${widget.maxMembers}',
                              style: AppTextStyles.body,
                            ),
                            const Icon(Ionicons.people, size: 20),
                            const SizedBox(width: 2),
                          ],
                        ),  
                      ],
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    widget.title,
                    style: AppTextStyles.title,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 6),
                  Padding(
                    padding: const EdgeInsets.only(bottom:5.0),
                    child:Text(
                      formatDateRange(widget.startDate, widget.endDate),
                      overflow: TextOverflow.ellipsis,
                      style: AppTextStyles.body.copyWith(color: Colors.grey[600]),
                    ),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
