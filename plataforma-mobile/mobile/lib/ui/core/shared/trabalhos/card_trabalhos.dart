/* import 'package:mobile/API/cursos_api.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:provider/provider.dart'; */
import 'package:mobile/utils/uteis.dart';

import '../export.dart';
import 'package:go_router/go_router.dart';

class CardTrabalhos extends StatefulWidget {
  const CardTrabalhos({super.key, required this.trabalho});

  final Map<String, dynamic> trabalho;

  @override
  State<CardTrabalhos> createState() => _CardTrabalhosState();
}

class _CardTrabalhosState extends State<CardTrabalhos> {

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () async {
        context.push('/inserir-trabalho', extra: widget.trabalho);
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
                              widget.trabalho['nome_tr'],
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
                              child: Text(dataHoraFormat(widget.trabalho['data_entrega_tr']), style: const TextStyle(color: Colors.white)),
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
