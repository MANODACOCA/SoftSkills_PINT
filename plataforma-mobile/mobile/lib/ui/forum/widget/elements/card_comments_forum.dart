// ignore_for_file: avoid_print
import 'comment_box.dart';
import 'package:like_button/like_button.dart';
import 'package:mobile/ui/core/shared/export.dart';

// ignore: must_be_immutable
class Post extends StatelessWidget {
  Post({
    super.key,
    required this.forumName,
    required this.forumComments,
    required this.forumLike,
    required this.description,
  });

  final String forumName;
  final int forumComments;
  final int forumLike;
  final String description;

  late int likes = forumLike;

  void initState() {
    likes = forumLike;
  }

  void dispose() {
    //Guardar na database o novo valor de likes
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(
          color: const Color.fromARGB(255, 216, 216, 216),
          width: 1,
        ),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        children: <Widget>[
          SizedBox(height: 10),
          SizedBox(
            child: ListTile(
              leading: CircleAvatar(
                backgroundImage: AssetImage('assets/forum_icon.png'),
                radius: 30,
              ),
              title: Text(
                forumName,
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              subtitle: Text(
                // ignore: unnecessary_string_interpolations
                '${DateTime.now().toLocal().toString().substring(0, 10)}',
                style: TextStyle(fontSize: 16, color: Colors.grey[600]),
              ),
            ),
          ),
          SizedBox(height: 5),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 30),
            child: Text(
              description,
              style: TextStyle(fontSize: 16, color: Colors.grey[700]),
            ),
          ),
          SizedBox(height: 10),
          SizedBox(
            child: Row(
              children: [
                SizedBox(width: 20),
                LikeButton(
                  size: 30,
                  likeCount: likes,
                  likeBuilder: (isLiked) {
                    return Icon(
                      Icons.thumb_up,
                      color: isLiked ? AppColors.primary : Colors.grey,
                    );
                  },
                  onTap: (isLiked) async {
                    if (isLiked) {
                      likes++;
                    } else {
                      likes--;
                    }
                    return !isLiked;
                  },
                ),
                SizedBox(width: 10),
                Column(
                  children: [
                    IconButton(
                      icon: Icon(Icons.comment, color: Colors.grey),
                      onPressed: () {
                        //Aqui você pode implementar a lógica para abrir o campo de comentários
                      },
                    ),
                    SizedBox(height: 5),
                  ],
                ),
                Text(
                  '$forumComments',
                  style: TextStyle(color: Colors.grey, fontSize: 16),
                ),
                SizedBox(width: 20),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
