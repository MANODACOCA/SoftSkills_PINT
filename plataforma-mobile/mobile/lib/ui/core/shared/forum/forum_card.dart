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
        leading:CircleAvatar(
          radius: 25,
          backgroundColor: Colors.grey[300],
          backgroundImage: imageUrl.isNotEmpty ? NetworkImage(imageUrl) : null,
          onBackgroundImageError: (_, __) {}, // evita crash se a imagem falhar
          child: imageUrl.isEmpty
            ? Text(
                title.isNotEmpty
                    ? title
                        .trim()
                        .split(' ')
                        .map((e) => e[0])
                        .take(2)
                        .join()
                        .toUpperCase()
                    : '',
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.black,
                ),
              )
            : null,
        ),
        contentPadding: EdgeInsets.all(10),
        title: Text(title, overflow: TextOverflow.ellipsis,),
        subtitle: Text(description, maxLines: 2, overflow: TextOverflow.ellipsis,),
      ),
    );
  }
}
