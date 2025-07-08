import 'package:mobile/ui/core/shared/material_apoio/card_material.dart';
import '../export.dart';

class MaterialScroll extends StatefulWidget {
  const MaterialScroll({super.key, required this.material});

  final List<Map<String,dynamic>> material;

  @override
  State<MaterialScroll> createState() => _MaterialScrollState();
}

class _MaterialScrollState extends State<MaterialScroll> {
  final ScrollController _scrollController = ScrollController();

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (widget.material.isEmpty) {
      return Container(
        padding: EdgeInsets.all(12),
        width: double.infinity,
        child: Card(
          child: Padding(
            padding: EdgeInsets.all(16),
            child: Text(
              'Este curso ainda não tem nenhum material de apoio...',
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
            itemCount: widget.material.length,
            itemBuilder: (context, index) {
              final materiais = widget.material[index];
              return Container(
                width: 200,
                margin: EdgeInsets.symmetric(horizontal: 5),
                child: CardMaterial(materiais: materiais,)
              );
            },
          );
  }
}

  