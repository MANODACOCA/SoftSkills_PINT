// ignore_for_file: unnecessary_brace_in_string_interps, avoid_print
import 'dart:io';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/API/forum.dart';
import 'package:mobile/ui/core/shared/base_comp/navigationbar_component.dart';
import 'package:mobile/ui/core/themes/colors.dart';
import 'package:mobile/ui/forum/widget/elements/card_comments_forum.dart';

// ignore: must_be_immutable
class ForumPage extends StatefulWidget {
  const ForumPage({super.key, required this.forumID});

  final String forumID;

  @override
  State<ForumPage> createState() => _ForumPageState();
}

class _ForumPageState extends State<ForumPage> {
  List<File> files = [];
  final String personName = 'John Doe'; //Preciso Trocar
  final int forumLike = 100; //Preciso Trocar
  final int forumComments = 50; //Preciso Trocar
  Color paint = Colors.white;
  bool addPost = false;
  final TextEditingController textControllerPost = TextEditingController();
  final TextEditingController textControllerTitlePost = TextEditingController();
  final TextEditingController fileController = TextEditingController();
  late String forumName;

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

  Future<void> atribuicaoDeInfo() async {
    try{
      final result = await ForumAPI.getConteudosPartilhado(widget.forumID);
      setState((){
        forumName = result['nome_topico'];
      });
    }catch(e){
      print('Erro ao buscar informações do fórum! $e');
    }
  }

  @override
  initState(){
    super.initState();
    atribuicaoDeInfo();
  }

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
          title: Text(
            widget.forumID.toString(),
            style: TextStyle(color: Colors.white),
          ),
          centerTitle: true,
          actions: [
            IconButton(
              icon: Icon(Icons.add_box_outlined, color: paint, size: 30),
              onPressed: () {
                print('Add new post to ${forumName}');
                setState(() {
                  addPost = !addPost;
                  if (addPost) {
                    paint = AppColors.secondary;
                  } else {
                    paint = Colors.white;
                  }
                });
              },
            ),
          ],
        ),
        body: Scaffold(
          body: SingleChildScrollView(
            //Post(forumName: personName, forumComments: forumComments, forumLike: forumLike, description: 'Como a inteligência artificial pode ser utilizada para melhorar a segurança cibernética em dispositivos do dia a dia, como smartphones e smartwatches?'),
            child: GestureDetector(
              child: Padding(
                padding: EdgeInsets.all(20),
                child: Column(
                  children: <Widget>[
                    if (addPost)
                      Container(
                        padding: EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          border: Border.all(
                            color: Colors.grey.shade300,
                            width: 1.5,
                          ),
                          borderRadius: BorderRadius.circular(12),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.grey,
                              blurRadius: 6,
                              offset: Offset(0, 3),
                            ),
                          ],
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Text(
                              'Adicionar novo post',
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Colors.black87,
                              ),
                            ),
                            SizedBox(height: 12),
                            TextField(
                              controller: textControllerTitlePost,
                              decoration: InputDecoration(
                                border: OutlineInputBorder(),
                                labelText: 'Título do Post',
                              ),
                            ),
                            SizedBox(height: 12),
                            TextField(
                              maxLines: 5,
                              controller: textControllerPost,
                              decoration: InputDecoration(
                                border: OutlineInputBorder(),
                                labelText: 'Descrição do Post',
                              ),
                            ),
                            SizedBox(height: 12),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                TextButton.icon(
                                  icon: Icon(
                                    Icons.attach_file_sharp,
                                    color: AppColors.primary,
                                  ),
                                  label: Text(
                                    "Anexar Arquivo",
                                    style: TextStyle(color: AppColors.primary),
                                  ),
                                  onPressed: () {
                                    pickFile();
                                  },
                                ),
                                ElevatedButton.icon(
                                  icon: Icon(Icons.send, color: Colors.white),
                                  label: Text(
                                    "Publicar",
                                    style: TextStyle(color: Colors.white),
                                  ),
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: AppColors.primary,
                                  ),
                                  onPressed: () {
                                    final title = textControllerTitlePost.text;
                                    final description = textControllerPost.text;

                                    if (title.isNotEmpty &&
                                        description.isNotEmpty) {
                                      print("Título: $title");
                                      print("Descrição: $description");

                                      setState(() {
                                        textControllerTitlePost.clear();
                                        textControllerPost.clear();
                                        addPost = false;
                                      });
                                    }
                                  },
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),

                    SizedBox(height: 20),
                    Post(
                      forumName: personName,
                      forumComments: forumComments,
                      forumLike: forumLike,
                      description:
                          'Como a inteligência artificial pode ser utilizada para melhorar a segurança cibernética em dispositivos do dia a dia, como smartphones e smartwatches?',
                      photo: 'assets/facebook.png',
                      selectComment: false,
                    ),
                    SizedBox(height: 20),
                    Post(
                      forumName: 'Guilherme Silva',
                      forumComments: 30,
                      forumLike: 10,
                      description:
                          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                      photo: 'assets/facebook.png',
                      selectComment: false,
                    ),
                    SizedBox(height: 20),
                    Post(
                      forumName: 'Guilherme Silva',
                      forumComments: 30,
                      forumLike: 10,
                      description:
                          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                      photo: 'assets/facebook.png',
                      selectComment: false,
                    ),
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
