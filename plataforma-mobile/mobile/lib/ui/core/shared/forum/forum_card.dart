import 'package:mobile/ui/core/shared/base_comp/text_expand.dart';
import '../../../core/shared/export.dart';

class CardForum extends StatelessWidget {
  final String title;
  final String description;
  final String imageUrl;

  const CardForum({
    super.key,
    required this.title,
    required this.description,
    required this.imageUrl,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: Image.network(
          imageUrl,
          width: 50,
          height: 50,
          fit: BoxFit.cover,
          loadingBuilder: (context, child, loadingProgress) {
            if (loadingProgress == null) return child;
            return CircleAvatar(
              backgroundColor: Colors.grey[300],
              child: Text(
                title.isNotEmpty
                    ? title
                        .trim()
                        .split(' ')
                        .map((e) => e[0])
                        .take(2)
                        .join()
                        .toUpperCase()
                    : '',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.black,
                ),
              ),
            );
          },
          errorBuilder:
              (context, error, stackTrace) => CircleAvatar(
                backgroundColor: Colors.grey[300],
                child: Text(
                  title.isNotEmpty
                      ? title
                          .trim()
                          .split(' ')
                          .map((e) => e[0])
                          .take(2)
                          .join()
                          .toUpperCase()
                      : '',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
              ),
        ),
        contentPadding: EdgeInsets.all(10),
        title: Text(title, overflow: TextOverflow.ellipsis,),
        subtitle:TextExpand(text: description, maxLines: 2,),
      ),
    );
  }
}
