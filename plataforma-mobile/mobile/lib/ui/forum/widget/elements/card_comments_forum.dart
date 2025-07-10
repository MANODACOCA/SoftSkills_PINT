// ignore_for_file: avoid_print, unnecessary_string_interpolations, unnecessary_null_comparison, curly_braces_in_flow_control_structures, prefer_typing_uninitialized_variables, use_build_context_synchronously
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:like_button/like_button.dart';
import 'package:mobile/API/forum_api.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:mobile/ui/core/shared/export.dart';
import 'package:provider/provider.dart';
import '../../../../API/utilizadores_api.dart';

// ignore: must_be_immutable

class Post extends StatefulWidget {
  const Post({
    super.key,
    required this.postID,
    required this.forumName,
    required this.forumComments,
    required this.forumLike,
    required this.description,
    required this.photo,
    required this.datePost,
    required this.selectComment,
    this.onDelete,
  });

  final void Function(String postId)? onDelete;
  final String postID;
  final String forumName;
  final int forumComments;
  final int forumLike;
  final String datePost;
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
  bool _expanded = false;
  String? userId;
  late int userIdINT;
  late Future<Map<String, dynamic>> user;
  late String? nameUser;

  @override
  void initState() {
    super.initState();
    likes = widget.forumLike;
    userId = Provider.of<AuthProvider>(context, listen: false).user?.id;
    userIdINT = int.parse(userId!);
    user = UtilizadoresApi().getUtilizador(userIdINT);
  }

  @override
  void dispose() {
    _copiar.dispose();
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
            child: FutureBuilder<Map<String, dynamic>>(
              future: user,
              builder: (context, snapshot) {
                return ListTile(
                  leading: CircleAvatar(
                    backgroundImage: NetworkImage(widget.photo),
                    radius: 30,
                  ),
                  title: Text(
                    widget.forumName,
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  subtitle: Text(
                    widget.datePost,
                    style: TextStyle(fontSize: 16, color: Colors.grey),
                  ),
                  trailing: Transform.translate(
                    offset: Offset(-16, 0),
                    child: PopupMenuButton<String>(
                      offset: Offset(-20, 0.5),
                      position: PopupMenuPosition.under,
                      icon: Icon(Icons.more_vert, color: Colors.grey),
                      onSelected: (value) {
                        if (value == 'copiar') {
                          _copiar.text = widget.description;
                          Clipboard.setData(ClipboardData(text: _copiar.text));
                        } else if (value == 'denunciar') {
                          denunciar();
                        } else if (value == 'eliminar') {
                          Future.delayed(Duration.zero, () async {
                            final confirm = await showDialog<bool>(
                              context: context,
                              builder: (context) => AlertDialog(
                                title: Text('Confirmar eliminação'),
                                content: Text('Tens a certeza que queres eliminar este post?'),
                                actions: [
                                  TextButton(
                                    onPressed: () => Navigator.of(context).pop(false),
                                    child: Text('Cancelar'),
                                  ),
                                  TextButton(
                                    onPressed: () => Navigator.of(context).pop(true),
                                    child: Text('Eliminar', style: TextStyle(color: Colors.red)),
                                  ),
                                ],
                              ),
                            );
                            if (confirm == true) {
                              await ForumAPI.deletePost(widget.postID);
                              if (widget.onDelete != null) {
                                widget.onDelete!(widget.postID);
                              }
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text('Post eliminado com sucesso!'),
                                ),
                              );
                            }
                          });
                        }
                      },
                      itemBuilder: (BuildContext context) {
                        List<PopupMenuEntry<String>> items = [
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
                        ];
                        if (snapshot.connectionState == ConnectionState.done &&
                            snapshot.hasData &&
                            widget.forumName == snapshot.data!['nome_utilizador']) {
                          items.add(
                            PopupMenuItem(
                              value: 'eliminar',
                              child: Row(
                                children: [
                                  Icon(Icons.delete, color: Colors.red),
                                  SizedBox(width: 8),
                                  Text(
                                    'Eliminar',
                                    style: TextStyle(color: Colors.red),
                                  ),
                                ],
                              ),
                            ),
                          );
                        }
                        return items;
                      },
                    ),
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 30),
            child: LayoutBuilder(
              builder: (context, constraints) {
                final span = TextSpan(
                  text: widget.description,
                  style: TextStyle(fontSize: 13, color: Colors.grey[700]),
                );
                final tp = TextPainter(
                  text: span,
                  maxLines: 2,
                  textDirection: TextDirection.ltr,
                )..layout(maxWidth: constraints.maxWidth);

                final exceedsMaxLines = tp.didExceedMaxLines;

                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    AnimatedSize(
                      duration: Duration(milliseconds: 200),
                      child: Text(
                        widget.description,
                        maxLines: _expanded ? null : 2,
                        overflow: _expanded ? TextOverflow.visible : TextOverflow.ellipsis,
                        style: TextStyle(fontSize: 13, color: Colors.grey[700]),
                      ),
                    ),
                    if (exceedsMaxLines)
                      GestureDetector(
                        onTap: () {
                          setState(() {
                            _expanded = !_expanded;
                          });
                        },
                        child: Text(
                          _expanded ? 'Ver menos' : 'Ver mais',
                          style: TextStyle(
                            color: AppColors.primary,
                            fontWeight: FontWeight.bold,
                            fontSize: 13,
                          ),
                        ),
                      ),
                  ],
                );
              },
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
                        color: widget.selectComment ? AppColors.secondary : Colors.grey,
                      ),
                      onPressed: () async {
                        context.push(
                          '/commentPage',
                          extra: {
                            'postId': widget.postID,
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

  verSeNULL() {
    if (widget.postID == null)
      print('postID é null');
    else
      print(widget.postID);
    if (widget.forumName == null)
      print('forumName é null');
    else
      print(widget.forumName);
    if (widget.description == null)
      print('description é null');
    else
      print(widget.description);
    if (likes == null)
      print('likes é null');
    else
      print('likes: $likes');
    if (widget.forumComments == null)
      print('forumComments é null');
    else
      print('forumComments: ${widget.forumComments}');
    if (widget.photo == null)
      print('photo é null');
    else
      print('photo: ${widget.photo}');
  }
}