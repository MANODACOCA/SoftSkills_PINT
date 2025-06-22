// ignore_for_file: avoid_print
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
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
    required this.photo,
    required this.selectComment,
  });

  final String forumName;
  final int forumComments;
  final int forumLike;
  final String description;
  final String photo;
  final bool selectComment;
  final TextEditingController _copiar = TextEditingController();
  final TextEditingController _denunciar = TextEditingController();

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
      width: double.infinity,
      decoration: BoxDecoration(
        border: Border.all(
          color: const Color.fromARGB(255, 216, 216, 216),
          width: 1,
        ),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        children: <Widget>[
          SizedBox(height: 5),
          SizedBox(
            child: ListTile(
              leading: CircleAvatar(
                backgroundImage: AssetImage(photo),
                radius: 30,
              ),
              title: Text(
                forumName,
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              subtitle: Text(
                // ignore: unnecessary_string_interpolations
                '${DateTime.now().toLocal().toString().substring(0, 10)}', //Change to database date
                style: TextStyle(fontSize: 16, color: Colors.grey),
              ),
              trailing: Transform.translate(
                offset: Offset(-16, 0), // Ajusta horizontalmente
                child: PopupMenuButton<String>(
                  offset: Offset(-20, 0.5), // Ajusta verticalmente
                  position: PopupMenuPosition.under,
                  icon: Icon(Icons.more_vert, color: Colors.grey),
                  onSelected: (value) {
                    if (value == 'copiar') {
                      _copiar.text = description;
                      Clipboard.setData(ClipboardData(text: _copiar.text));
                    } else if (value == 'denunciar') {}
                  },
                  itemBuilder:
                      (BuildContext context) => [
                        PopupMenuItem(
                          value: 'copiar',
                          child: Row(
                            children: [
                              Icon(Icons.copy, color: Colors.grey),
                              SizedBox(width: 8),
                              Text('Copy'),
                            ],
                          ),
                        ),
                        PopupMenuItem(
                          value: 'denunciar',
                          child: Row(
                            children: [
                              Icon(Icons.flag, color: Colors.grey),
                              SizedBox(width: 8),
                              Text('Report'),
                            ],
                          ),
                        ),
                      ],
                ),
              ),
            ),
          ),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 30),
            child: Text(
              description,
              style: TextStyle(fontSize: 16, color: Colors.grey[700]),
            ),
          ),
          SizedBox(
            child: Row(
              children: [
                SizedBox(width: 15),
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
                SizedBox(width: 5),
                Column(
                  children: [
                    IconButton(
                      isSelected: selectComment,
                      icon: Icon(
                        Icons.comment,
                        color:
                            selectComment ? AppColors.secondary : Colors.grey,
                      ),
                      onPressed: () {
                        context.push(
                          '/commentPage',
                          extra: {
                            'postName': forumName,
                            'description': description,
                            'likes': likes,
                            'comments': forumComments,
                            'photo': photo,
                          },
                        );
                      },
                    ),
                    SizedBox(height: 5),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
