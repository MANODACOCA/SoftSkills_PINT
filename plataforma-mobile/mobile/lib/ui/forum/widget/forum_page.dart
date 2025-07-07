// ignore_for_file: unnecessary_brace_in_string_interps, avoid_print, prefer_typing_uninitialized_variables, unused_field
import 'dart:io';
import 'package:file_picker/file_picker.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/API/forum_api.dart';

import 'package:mobile/ui/forum/widget/elements/card_comments_forum.dart';
import '../../../API/utilizadores_api.dart';
import '../../core/shared/export.dart';

// ignore: must_be_immutable
class ForumPage extends StatefulWidget {
  const ForumPage({super.key, required this.forumID, required this.name});

  final String name;
  final String forumID;

  @override
  State<ForumPage> createState() => _ForumPageState();
}

class _ForumPageState extends State<ForumPage> {
  List<File> files = [];
  Color paint = Colors.white;
  bool addPost = false;
  bool isLoading = true;

  final TextEditingController textControllerPost = TextEditingController();
  final TextEditingController textControllerTitlePost = TextEditingController();
  final TextEditingController fileController = TextEditingController();

  late var forumInfo;
  late List users = [];
  late var forumPost;
  late String forumID = widget.forumID;

  Future<void> carregarDados() async {
    try {
      forumInfo = await ForumAPI.getConteudosPartilhado(widget.forumID);
      forumPost = await ForumAPI.getPostForum(widget.forumID);
      users = [];
      if (forumPost != null && forumPost['posts'] != null) {
        for (var post in forumPost['posts']) {
          final userId = post['id_utilizador_utilizador']['id_utilizador'];
          var userData = await UtilizadoresApi().getUtilizador(userId);
          users.add(userData);
        }
      }
      setState(() {
        isLoading = false;
      });
    } catch (e) {
      print('Erro ao carregar dados: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    carregarDados();
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => context.pop(),
        ),
        backgroundColor: AppColors.primary,
        title: Text(widget.name, style: TextStyle(color: Colors.white)),
        centerTitle: true,
        actions: [
          IconButton(
            icon: Icon(Icons.add_box_outlined, color: paint, size: 30),
            onPressed: () {
              setState(() {
                addPost = !addPost;
                paint = addPost ? AppColors.secondary : Colors.white;
              });
            },
          ),
        ],
      ),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : Column(
              children: [
                // O conteúdo rolável fica dentro do Expanded
                Expanded(
                  child: SingleChildScrollView(
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
                                    color: AppColors.primary,
                                    width: 2,
                                  ),
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                child: buildAddPostForm(),
                              ),
                            SizedBox(height: 20),
                            if (forumPost != null && forumPost['posts'] != null)
                              ...List.generate(forumPost['posts'].length, (
                                index,
                              ) {
                                final post = forumPost['posts'][index];
                                final user = post['id_utilizador_utilizador'];
                                return Padding(
                                  padding: const EdgeInsets.only(bottom: 16.0),
                                  child: Post(
                                    forumName:
                                        user['nome_utilizador'] ??
                                        'Desconhecido',
                                    forumComments:
                                        post['contador_comentarios'] ?? 0,
                                    forumLike: post['contador_likes_post'] ?? 0,
                                    description: post['texto_post'] ?? '',
                                    photo:
                                        (user['img_perfil'] != null &&
                                                user['img_perfil']
                                                    .toString()
                                                    .isNotEmpty)
                                            ? 'https://softskills-api.onrender.com/${user['img_perfil']}'
                                            : 'https://ui-avatars.com/api/?name=${Uri.encodeComponent(user['nome_utilizador'])}&background=random&bold=true',
                                    selectComment: false,
                                  ),
                                );
                              }),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
      bottomNavigationBar: Footer(),
    );
  }

  Widget buildAddPostForm() {
    return Column(
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
          mainAxisAlignment:
              MainAxisAlignment.spaceBetween,
          children: [
            TextButton.icon(
              icon: Icon(
                Icons.attach_file_sharp,
                color: AppColors.primary,
              ),
              label: Text(
                "Anexar Arquivo",
                style: TextStyle(
                  color: AppColors.primary,
                ),
              ),
              onPressed: () {
                pickFile();
              },
            ),
            ElevatedButton.icon(
              icon: Icon(
                Icons.send,
                color: Colors.white,
              ),
              label: Text(
                "Publicar",
                style: TextStyle(
                  color: Colors.white,
                ),
              ),
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
              ),
              onPressed: () {
                final title =
                    textControllerTitlePost.text;
                final description =
                    textControllerPost.text;

                if (title.isNotEmpty &&
                    description.isNotEmpty) {
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
    );
  }

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
}
