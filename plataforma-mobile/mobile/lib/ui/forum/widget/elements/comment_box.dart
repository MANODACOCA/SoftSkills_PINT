import 'package:flutter/material.dart';

class CommentBox extends StatelessWidget {
  const CommentBox({
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

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScope.of(context).unfocus();
      },
      child: Container(
        decoration: BoxDecoration(
          border: Border.all(
            color: const Color.fromARGB(255, 216, 216, 216),
            width: 1,
          ),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Column(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(10),
              child: Card(
                child: ListView(
                  children: <Widget>[
                    TextField(
                      decoration: InputDecoration(
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                        hintText: 'Resposta...',
                        fillColor: Colors.white,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
