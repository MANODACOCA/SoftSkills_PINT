// ignore_for_file: avoid_print

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/ui/core/shared/navigationbar_component.dart';
import 'package:mobile/ui/core/themes/colors.dart';
import 'package:mobile/ui/forum/widget/elements/card_comments_forum.dart';

class CommentPage extends StatefulWidget {
  const CommentPage({
    super.key,
    required this.postName,
    required this.description,
    required this.likes,
    required this.comments,
    required this.photo,
  });

  final String postName;
  final String description;
  final int likes;
  final int comments;
  final String photo;

  @override
  _CommentPageState createState() => _CommentPageState();
}

class _CommentPageState extends State<CommentPage> {
  Color cor = Colors.white;
  bool addcomment = false;
  TextEditingController commentController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            context.pop();
          },
        ),
        backgroundColor: AppColors.primary,
        centerTitle: true,
        title: Text('Comments', style: TextStyle(color: Colors.white)),
        actions: [
          IconButton(
            icon: Icon(Icons.add_box_outlined, color: cor, size: 30),
            onPressed: () {
              setState(() {
                addcomment = !addcomment;
                if (addcomment) {
                  cor = AppColors.secondary;
                } else {
                  cor = Colors.white;
                }
              });
            },
          ),
        ],
      ),
      body: Container(
        padding: EdgeInsets.only(left: 16.0, right: 16.0, top: 16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Post(
              forumName: widget.postName,
              forumComments: widget.comments,
              forumLike: widget.likes,
              description: widget.description,
              photo: widget.photo,
              selectComment: true,
            ),
            if (addcomment)
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 8.0),
                child: TextField(
                  controller: commentController,
                  decoration: InputDecoration(
                    prefixIcon: IconButton(
                      icon: Icon(Icons.attach_file_outlined, color: AppColors.secondary),
                      onPressed: () {
                        // Handle attach file action
                      },
                    ),
                    hintText: 'Adicionar comentário...',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    suffixIcon: IconButton(
                      icon: Icon(Icons.send, color: AppColors.secondary),
                      onPressed: () {
                        setState(() {
                          addcomment = false;
                          cor = Colors.white;
                        });
                        print('Comment writed ${commentController.text}');
                      },
                    ),
                  ),
                ),
              ),
            Divider(
              color: Colors.grey,
              thickness: 1,
              indent: 10,
              endIndent: 10,
            ),
            Expanded(
              child: ListView.builder(
                itemCount: 10, // Replace with actual number of comments
                itemBuilder: (context, index) {
                  return ListTile(
                    leading: CircleAvatar(
                      backgroundImage: AssetImage(
                        widget.photo,
                      ), // Placeholder for user avatar
                    ),
                    title: Text('User ${index + 1}'),
                    subtitle: Text('This is a comment text.'),
                    trailing: IconButton(
                      icon: Icon(Icons.thumb_up_alt_outlined),
                      onPressed: () {
                        // Handle like action
                      },
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
