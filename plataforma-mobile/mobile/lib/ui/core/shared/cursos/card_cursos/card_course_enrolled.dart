import 'package:go_router/go_router.dart';

import '../../export.dart';

class CardCourseEnrolled extends StatelessWidget {
  const CardCourseEnrolled({super.key, required this.curso});

  final Map<String, dynamic> curso;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () { 
        if (curso['id_curso_curso']?['sincrono'] == null){
          context.push('/cursos-inscritos-assincrono', extra: curso['id_curso']);
        } else {
          context.push('/cursos-inscritos-sincrono', extra: curso['id_curso']);
        }
       },
      child: Card(
        elevation: 4,
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
              child: Image.network(
                curso['id_curso_curso']?['imagem'],
                width: 100,
                height: 130,
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) {
                  final fallbackImg = 'https://ui-avatars.com/api/?name=${Uri.encodeComponent(curso['id_curso_curso']?['nome_curso'])}&background=random&bold=true';
                  return Image.network(
                    width: 100,
                    height: 130,
                    fallbackImg,
                    fit: BoxFit.cover,
                  );
                },
              )
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
