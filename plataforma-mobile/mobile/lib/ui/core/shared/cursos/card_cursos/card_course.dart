import 'package:go_router/go_router.dart';
import 'package:mobile/API/cursos_api.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:provider/provider.dart';
import '../../../../../utils/uteis.dart';
import '../../export.dart';

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
  final CursosApi _api = CursosApi();
  bool inscrito = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final userId = Provider.of<AuthProvider>(context, listen: false).user?.id;
      if (userId != null) {
        print('ID do utilizador: $userId');
        verificaInscrito(int.parse(userId), widget.id);
      }
    });
  }

  Future<void> verificaInscrito (int userId, int cursoId) async {
    try {
      final estaInscrito = await _api.verificarInscricao(userId, cursoId);
      setState(() {
        inscrito = estaInscrito;
      });
    } catch (e) {
      print('Erro ao verificar inscrição: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
          if(inscrito){
            if(widget.typeCourse == 'Assíncrono'){
              context.go('/cursos-inscritos-assincrono', extra: widget.id);
            } else if (widget.typeCourse == 'Síncrono') {
              context.go('/cursos-inscritos-sincrono', extra: widget.id);
            }
          } else {
            context.go('/inscrever', extra: widget.id);
          }
      },
      child: Card(
        elevation: 4,
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
              child: Image.network(
                widget.img,
                height: 135,
                width: double.infinity,
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) {
                  final fallbackImg = 'https://ui-avatars.com/api/?name=${Uri.encodeComponent(widget.title)}&background=random&bold=true';
                  return Image.network(
                    fallbackImg,
                    height: 135,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  );
                },
              )
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
