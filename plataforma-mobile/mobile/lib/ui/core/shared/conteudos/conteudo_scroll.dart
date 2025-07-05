import 'package:mobile/ui/core/shared/conteudos/card_conteudo.dart';
import '../export.dart';

class ConteudoScroll extends StatefulWidget {
  const ConteudoScroll({super.key, required this.conteudos});

  final List<dynamic> conteudos;

  @override
  State<ConteudoScroll> createState() => _ConteudoScrollState();
}

class _ConteudoScrollState extends State<ConteudoScroll> {
  final ScrollController _scrollController = ScrollController();

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (widget.conteudos.isEmpty) {
      return Container(
        padding: const EdgeInsets.all(12),
        width: double.infinity,
        child: Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Text(
              'Esta aula ainda não tem nenhum conteúdo...',
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.grey),
            ),
          ),
        ),
      );
    }
    return ListView.builder(
            controller: _scrollController,
            scrollDirection: Axis.vertical,
            shrinkWrap: true,
            itemCount: widget.conteudos.length,
            itemBuilder: (context, index) {
              final conteudo = widget.conteudos[index];
              return Container(
                width: 200,
                margin: EdgeInsets.symmetric(horizontal: 5),
                child: CardConteudo(conteudos: conteudo)
              );
            },
          );
  }
}

  