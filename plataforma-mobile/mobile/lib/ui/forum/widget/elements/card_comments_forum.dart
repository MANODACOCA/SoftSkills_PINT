// ignore_for_file: avoid_print
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:like_button/like_button.dart';
import 'package:mobile/ui/core/shared/export.dart';

// ignore: must_be_immutable
class Post extends StatefulWidget {
  const Post({
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

  @override
  State<Post> createState() => _PostState();
}

class _PostState extends State<Post> {
  late int likes;
  final TextEditingController _copiar = TextEditingController();
  String _denunciar = '';

  @override
  void initState() {
    super.initState();
    likes = widget.forumLike;
  }

  @override
  void dispose() {
    _copiar.dispose();
    //Guardar na database o novo valor de likes
    super.dispose();
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
                backgroundImage: NetworkImage(widget.photo),
                radius: 30,
              ),
              title: Text(
                widget.forumName,
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
                      _copiar.text = widget.description;
                      Clipboard.setData(ClipboardData(text: _copiar.text));
                    } else if (value == 'denunciar') {
                      denunciar();
                    }
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
              widget.description,
              style: TextStyle(fontSize: 13, color: Colors.grey[700]),
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
                    setState(() {
                      if (isLiked) {
                        likes--;
                      } else {
                        likes++;
                      }
                    });
                    return !isLiked;
                  },
                ),
                SizedBox(width: 5),
                Column(
                  children: [
                    IconButton(
                      isSelected: widget.selectComment,
                      icon: Icon(
                        Icons.comment,
                        color:
                            widget.selectComment
                                ? AppColors.secondary
                                : Colors.grey,
                      ),
                      onPressed: () {
                        context.push(
                          '/commentPage',
                          extra: {
                            'postName': widget.forumName,
                            'description': widget.description,
                            'likes': likes,
                            'comments': widget.forumComments,
                            'photo': widget.photo,
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

  void denunciar() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          content: Container(
            width: double.infinity,
            height: 250,
            decoration: BoxDecoration(borderRadius: BorderRadius.circular(20)),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Text(
                  'Denunciar Por que motivo?',
                  style: TextStyle(fontSize: 16, color: Colors.grey[700]),
                ),
                SizedBox(height: 5),
                Row(
                  children: <Widget>[
                    TextButton(
                      child: Text(
                        'Conteúdo Inapropriado',
                        style: TextStyle(fontSize: 13),
                      ),
                      onPressed: () {
                        _denunciar = 'Conteúdo Inapropriado';
                        print('Denunciar: $_denunciar');
                      },
                    ),
                  ],
                ),
                Row(
                  children: <Widget>[
                    TextButton(
                      child: Text('Spam', style: TextStyle(fontSize: 13)),
                      onPressed: () {
                        _denunciar = 'Spam';
                        print('Denunciar: $_denunciar');
                      },
                    ),
                  ],
                ),
                Row(
                  children: <Widget>[
                    TextButton(
                      child: Text(
                        'Informação Falsa',
                        style: TextStyle(fontSize: 13),
                      ),
                      onPressed: () {
                        _denunciar = 'Informação Falsa';
                        print('Denunciar: $_denunciar');
                      },
                    ),
                  ],
                ),
                SizedBox(height: 5),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                  ),
                  onPressed: () {
                    print('Denunciar: $_denunciar');
                    // Envia para a base de dados uma denúncia com o motivo selecionado
                  },
                  child: Text(
                    'Denunciar',
                    style: TextStyle(fontSize: 13, color: Colors.white),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
