import 'package:url_launcher/url_launcher.dart';

import '../export.dart';

class CardConteudo extends StatefulWidget {
  const CardConteudo({super.key, required this.conteudos});

  final Map<String, dynamic> conteudos;

  @override
  State<CardConteudo> createState() => _CardConteudoState();
}

class _CardConteudoState extends State<CardConteudo> {

  Widget _getIconsFormato(String formato) {

    IconData icon;
    Color color;

    switch (formato.toLowerCase()) {
      case 'documento pdf':
        icon = Ionicons.document_text_outline;
        color = Colors.red;
        break;
      case 'powerpoint':
        icon = Ionicons.tv_outline;
        color = Colors.orange;
        break;
      case 'word':
        icon = Ionicons.document_text_outline;
        color = Colors.blue;
        break;
      case 'excel':
        icon = Ionicons.grid_outline;
        color = Colors.green;
        break;
      case 'texto':
        icon = Ionicons.document_text_outline;
        color = Colors.grey;
        break;
      case 'imagem':
        icon = Ionicons.image_outline;
        color = Colors.purple;
        break;
      case 'link externo':
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
        _abrirLink(widget.conteudos['conteudo']);
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
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(12),
                topRight: Radius.circular(12),
              ),
            ),
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
                          _getIconsFormato(widget.conteudos['id_formato_tipo_formato']?['formato']),
                          SizedBox(width: 20,),
                          SizedBox(
                            width: widthScreen - 110,
                            child: Text(
                              widget.conteudos['nome_conteudo'],
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
