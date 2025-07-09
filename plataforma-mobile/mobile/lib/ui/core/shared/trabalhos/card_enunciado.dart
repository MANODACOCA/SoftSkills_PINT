import 'package:url_launcher/url_launcher.dart';

import '../export.dart';

class CardEnunciado extends StatefulWidget {
  const CardEnunciado({super.key, required this.enunciado});

  final Map<String, dynamic> enunciado;

  @override
  State<CardEnunciado> createState() => _CardEnunciadoState();
}

class _CardEnunciadoState extends State<CardEnunciado> {

  Widget _getIconsFormato(int formato) {

    IconData icon;
    Color color;

    switch (formato) {
      case 1:
        icon = Ionicons.document_text_outline;
        color = Colors.red;
        break;
      case 2:
        icon = Ionicons.tv_outline;
        color = Colors.orange;
        break;
      case 3:
        icon = Ionicons.document_text_outline;
        color = Colors.blue;
        break;
      case 4:
        icon = Ionicons.grid_outline;
        color = Colors.green;
        break;
      case 5:
        icon = Ionicons.document_text_outline;
        color = Colors.grey;
        break;
      case 6:
        icon = Ionicons.image_outline;
        color = Colors.purple;
        break;
      case 7:
        icon = Ionicons.link_outline;
        color = Colors.indigo;
        break;
      default:
        icon = Ionicons.document_outline;
        color = Colors.grey;
    }
    return Icon(icon, color: color, size: 24,);
  }

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
    double widthScreen = MediaQuery.of(context).size.width;
    return GestureDetector(
      onTap: () async {
        _abrirLink(widget.enunciado['caminho_tr']);
      },
      child: Card(
        elevation: 2,
        shadowColor: Colors.black,
        color: AppColors.background,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 12, vertical: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [               
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          _getIconsFormato(widget.enunciado['id_formato_tr']),
                          SizedBox(width: 20,),
                          SizedBox(
                            width: widthScreen - 110,
                            child: Text(
                              widget.enunciado['nome_tr'],
                              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                        ],
                      ),
                      Icon(Icons.file_download_outlined),
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
