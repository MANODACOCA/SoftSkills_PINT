import 'package:url_launcher/url_launcher.dart';
import '../export.dart';

class CardAcederAula extends StatefulWidget {
  const CardAcederAula({super.key, required this.aula});

  final Map<String, dynamic> aula;

  @override
  State<CardAcederAula> createState() => _CardAcederAulaState();
}

class _CardAcederAulaState extends State<CardAcederAula> {

  Future<void> _abrirLink(String? link) async {
    final cleanedLink = link?.toString().trim();
    if (cleanedLink == null || !cleanedLink.startsWith('http')) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('URL inválido')),
      );
      return;
    }

    final url = Uri.parse(cleanedLink);
    final launched = await launchUrl(url, mode: LaunchMode.inAppBrowserView);
    if (!launched && mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Não foi possível abrir o link')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () async {
        _abrirLink(widget.aula['caminho_url']);
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
                      Row(
                        children: [
                          Icon(Icons.videocam_outlined, color: Colors.blue,),
                          SizedBox(width: 20,),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Aceder à aula',
                                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ), 
                            ],
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
