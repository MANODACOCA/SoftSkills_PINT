/* import 'package:mobile/API/cursos_api.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:provider/provider.dart'; */
import 'export.dart';

class CardAula extends StatefulWidget {
  const CardAula({super.key, required this.aulas});

  final Map<String, dynamic> aulas;

  @override
  State<CardAula> createState() => _CardAulaState();
}

class _CardAulaState extends State<CardAula> {
  //final CursosApi _api = CursosApi();
  //bool inscrito = false;

  /* @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final userId = Provider.of<AuthProvider>(context, listen: false).user?.id;
      if (userId != null) {
        print('ID do utilizador: $userId');
      }
    });
  } */

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () { },
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
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            widget.aulas['title'],
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
                              'Duração: ${widget.aulas['duracao']?['horas'].toString().padLeft(2, '0')}h ${widget.aulas['duracao']?['minutes'].toString().padLeft(2, '0')}min',
                              style: const TextStyle(color: Colors.white),
                            ),
                          ),    
                        ],
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
