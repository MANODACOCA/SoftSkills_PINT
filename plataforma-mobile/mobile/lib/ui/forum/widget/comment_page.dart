// ignore_for_file: avoid_print
import 'dart:io';
import '../../../API/comments_forum.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/ui/forum/widget/elements/card_comments_forum.dart';
import 'package:file_picker/file_picker.dart';
import '../../core/shared/export.dart';

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
  // ignore: library_private_types_in_public_api
  _CommentPageState createState() => _CommentPageState();
}

class _CommentPageState extends State<CommentPage> {
  Future<void> pickFile() async {
    try {
      FilePickerResult? result = await FilePicker.platform.pickFiles(
        allowMultiple: true,
        type: FileType.any,
      );

      if (result != null && result.paths.isNotEmpty) {
        setState(() {
          files =
              result.paths
                  .where((path) => path != null)
                  .map((path) => File(path!))
                  .toList();

          // Update TextField to show selected files
          String fileNames = files
              .map((file) => '[${file.path.split('\\').last}]')
              .join(' ');
          fileController.text += ' $fileNames';
        });
        print('Files selected: ${files.length}');
      }
    } catch (e) {
      print('Error picking files: $e');
    }
  }

  Widget buildAttachmentChips() {
    return Wrap(
      spacing: 8.0,
      runSpacing: 4.0,
      children:
          files.map((file) {
            return Chip(
              backgroundColor: Colors.grey[200],
              label: Text(
                file.path.split('/').last,
                style: TextStyle(fontSize: 12),
              ),
              deleteIcon: Icon(Icons.close, size: 16),
              onDeleted: () {
                setState(() {
                  files.remove(file);
                });
              },
            );
          }).toList(),
    );
  }

  List<File> files = [];
  Color cor = Colors.white;
  bool addcomment = false;
  TextEditingController commentController = TextEditingController();
  TextEditingController fileController = TextEditingController();

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
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
      body: SingleChildScrollView(
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
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    TextField(
                      controller: commentController,
                      decoration: InputDecoration(
                        prefixIcon: IconButton(
                          icon: Icon(
                            Icons.attach_file_outlined,
                            color: AppColors.secondary,
                          ),
                          onPressed: () async {
                            await pickFile();
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
                              //Send all info to database
                            });
                            print('Comment writed ${commentController.text}');
                          },
                        ),
                      ),
                    ),
                    if (files.isNotEmpty) buildAttachmentChips(),
                  ],
                ),
              ),
            Divider(
              color: Colors.grey,
              thickness: 1,
              indent: 10,
              endIndent: 10,
            ),
            SizedBox(
              height: 300,
              child: ListView.builder(
                itemCount: 10, // Replace with actual number of comments
                itemBuilder: (context, index) {
                  return ListTile(
                    leading: CircleAvatar(
                      backgroundImage: NetworkImage(
                        widget.photo,
                      ),
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
