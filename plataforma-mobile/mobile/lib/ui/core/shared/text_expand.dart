import 'export.dart';

class TextExpand extends StatefulWidget {
  const TextExpand({super.key, required this.text, this.maxLines = 3});

  final String text;
  final int maxLines;

  @override
  State<TextExpand> createState() => _TextExpandState();
}

class _TextExpandState extends State<TextExpand> {
  bool expandido = false;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
      final span = TextSpan(
        text: widget.text,
        style: DefaultTextStyle.of(context).style,
      );

      final tp = TextPainter(
        text: span,
        maxLines: widget.maxLines,
        textDirection: TextDirection.ltr,
      );

      tp.layout(maxWidth: constraints.maxWidth);

      final precisaExpandir = tp.didExceedMaxLines;

        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              widget.text,
              maxLines: expandido ? null : widget.maxLines,
              overflow: expandido ? TextOverflow.visible : TextOverflow.ellipsis,
              textAlign: TextAlign.justify,
            ),
            SizedBox(height: 4),
            if(precisaExpandir)
            GestureDetector(
              onTap: () {
                setState(() {
                  expandido = !expandido;
                });
              },
              child: Text(
                expandido ? 'Ver menos...' : 'Ver mais...',
                style: TextStyle(color: Colors.blue, fontWeight: FontWeight.bold),
              ),
            ),
          ],
        );
      },
    );
  }
}