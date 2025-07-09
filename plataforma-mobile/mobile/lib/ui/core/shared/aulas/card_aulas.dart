/* import 'package:mobile/API/cursos_api.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:provider/provider.dart'; */
import '../export.dart';
import 'package:go_router/go_router.dart';

class CardAula extends StatefulWidget {
  const CardAula({super.key, required this.aulas, required this.sincrono});

  final Map<String, dynamic> aulas;
  final bool sincrono;

  @override
  State<CardAula> createState() => _CardAulaState();
}

class _CardAulaState extends State<CardAula> {

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () async {
        if (widget.sincrono == false) {
          context.push('/aulas-async', extra: widget.aulas);
        } else {
          context.push('/aulas-sync', extra: widget.aulas);
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
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [               
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              widget.aulas['nome_aula'],
                              style: AppTextStyles.title,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ), 
                            SizedBox(height: 10),
                            Container(
                              padding: EdgeInsets.symmetric(horizontal: 10, vertical: 2),
                              decoration: BoxDecoration(
                                color: AppColors.primary,
                                borderRadius: BorderRadius.circular(15),
                              ),
                              child: Text(
                                '${(widget.aulas['tempo_duracao']?['hours'] ?? 0).toString().padLeft(2, '0')} : ${(widget.aulas['tempo_duracao']?['minutes'] ?? 0).toString().padLeft(2, '0')}',
                                style: const TextStyle(color: Colors.white),
                              ),
                            ),    
                          ],
                        ),
                        
                      ),
                      Icon(Icons.chevron_right_rounded),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
