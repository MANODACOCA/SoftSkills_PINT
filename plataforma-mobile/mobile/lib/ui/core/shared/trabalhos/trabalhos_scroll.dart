import 'package:mobile/ui/core/shared/trabalhos/card_trabalhos.dart';
import '../export.dart';

class TrabalhosScroll extends StatefulWidget {
  const TrabalhosScroll({super.key, required this.trabalhos});

  final List<Map<String, dynamic>> trabalhos;

  @override
  State<TrabalhosScroll> createState() => _TrabalhosScrollState();
}

class _TrabalhosScrollState extends State<TrabalhosScroll> {
  final ScrollController _scrollController = ScrollController();

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        SizedBox(
        height: 280,
          child: ListView.builder(
            controller: _scrollController,
            scrollDirection: Axis.vertical,
            shrinkWrap: true,
            itemCount: widget.trabalhos.length,
            itemBuilder: (context, index) {
              final trabalho = widget.trabalhos[index];
              return Container(
                width: 200,
                margin: EdgeInsets.symmetric(horizontal: 5),
                child: CardTrabalhos(trabalho: trabalho,)
              );
            },
          ),
        )
      ]
    );
  }
}

  