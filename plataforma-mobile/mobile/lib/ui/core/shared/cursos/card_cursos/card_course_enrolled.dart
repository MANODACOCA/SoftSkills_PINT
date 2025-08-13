import 'package:go_router/go_router.dart';
import 'package:mobile/utils/uteis.dart';
import 'package:mobile/utils/verifica_internet.dart';

import '../../export.dart';

class CardCourseEnrolled extends StatelessWidget {
  const CardCourseEnrolled({super.key, required this.curso});

  final Map<String, dynamic> curso;

  @override
  Widget build(BuildContext context) {
    final dataInicio = DateTime.parse(curso['id_curso_curso']?['data_inicio_curso']);
    final dataFim = DateTime.parse(curso['id_curso_curso']?['data_fim_curso']);
    print(dataFim);
    final dataForm = formatDateRange(dataInicio, dataFim);

    return GestureDetector(
      onTap: () {
          context.push('/cursos-inscritos', extra: curso['id_curso']);
       },
      child: Card(
        elevation: 2,
        shadowColor: Colors.black,
        color: AppColors.background,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        child: Row(
          children: [
            ClipRRect(
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(12),
                bottomLeft: Radius.circular(12),
              ),
              child: FutureBuilder<bool>(
                future: temInternet(),
                builder: (context, snapshot) {
                  final online = snapshot.data ?? true;
                  final nome = curso['id_curso_curso']?['nome_curso'];
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
                      curso['id_curso_curso']?['imagem'],
                      width: 100,
                      height: 155,
                      fit: BoxFit.cover,
                      errorBuilder: (context, error, stackTrace) {
                        return Image.network(
                          imageUrl,
                          width: 100,
                          height: 155,
                          fit: BoxFit.cover,
                        );
                      },
                    );
                  } else {
                    return Image.asset(
                      'assets/course.png',
                      width: 100,
                      height: 155,
                      fit: BoxFit.cover,
                    );
                  }
                },
              ),
            ),
             Expanded(
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      curso['id_curso_curso']?['nome_curso'] ?? '',
                      style: AppTextStyles.title,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    SizedBox(height: 8),
                    Text(dataForm),
                    SizedBox(height: 8),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: AppColors.primary,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            curso['id_curso_curso']?['sincrono'] != null ? 'Síncrono' : 'Assíncrono',
                            style: TextStyle(color: Colors.white),
                          ),
                        ),
                        Text(tempoParaFimCurso(dataFim),
                          style: TextStyle(color: tempoParaFimCurso(dataFim) == 'Em curso...' ? Colors.green : Colors.red[400])),
                      ],
                    ),
                  ],
                ),
              )
             ),
          ],
        ),
      ),
    );
  }
}
