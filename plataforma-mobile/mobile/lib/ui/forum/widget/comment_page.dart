import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/ui/core/shared/navigationbar_component.dart';
import 'package:mobile/ui/core/themes/colors.dart';
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
  final int likes;
  final int comments;
  final String photo;

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
      ),
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
              selectComment: true,
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
                        photo,
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
