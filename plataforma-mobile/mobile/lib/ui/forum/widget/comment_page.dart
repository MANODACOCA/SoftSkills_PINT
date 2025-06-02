import 'package:flutter/material.dart';
import 'package:mobile/ui/forum/widget/elements/card_comments_forum.dart';

class CommentPage extends StatelessWidget {
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
  final int likes; // Example value, replace with database value
  final int comments; // Example value, replace with database value
  final String photo; // Example value, replace with database value

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Comments')),
      body: Container(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Post(
              forumName: postName,
              forumComments: comments,
              forumLike: likes,
              description: description,
              photo: photo,
            ),
            Text(
              'Comments on $postName',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
          ],
        ),
      ),
    );
  }
}
