// ignore_for_file: unnecessary_brace_in_string_interps, avoid_print
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/ui/core/shared/navigationbar_component.dart';
import 'package:mobile/ui/core/themes/colors.dart';
import 'package:mobile/ui/forum/widget/elements/card_comments_forum.dart';
import 'package:mobile/ui/forum/widget/elements/comment_box.dart';
class ForumPage extends StatelessWidget {
  const ForumPage({super.key, required this.forumName});

  final String personName = 'John Doe';
  final String forumName;
  final int forumLike = 100;
  final int forumComments = 50;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScope.of(context).unfocus();
      },
      child: Scaffold(
        appBar: AppBar(
          leading: IconButton(
            icon: const Icon(Icons.arrow_back, color: Colors.white),
            onPressed: () => context.pop(),
          ),
          backgroundColor: AppColors.primary,
          title: Text(forumName, style: TextStyle(color: Colors.white)),
          centerTitle: true,
          actions: [
            IconButton(
              icon: const Icon(
                Icons.add_box_outlined,
                color: Colors.white,
                size: 30,
              ),
              onPressed: () {
                print('Add new post to $forumName');
              },
            ),
          ],
        ),
        body: Scaffold(
          body: SingleChildScrollView(
            child: GestureDetector(
              child: Padding(
                padding: EdgeInsets.all(20),
                child: Column(children: <Widget>[
                    Post(forumName: personName, forumComments: forumComments, forumLike: forumLike, description: 'Como a inteligência artificial pode ser utilizada para melhorar a segurança cibernética em dispositivos do dia a dia, como smartphones e smartwatches?'),
                    SizedBox(height: 20),
                    Post(forumName: 'Guilherme Silva', forumComments: 30, forumLike: 10, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
                    SizedBox(height: 20),
                    Post(forumName: 'Guilherme Silva', forumComments: 30, forumLike: 10, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
                  ],
                ),
              ),
            ),
          ),
        ),
        bottomNavigationBar: Footer(),
      ),
    );
  }
}
