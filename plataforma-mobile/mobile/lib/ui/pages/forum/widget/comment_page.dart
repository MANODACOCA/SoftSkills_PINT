// ignore_for_file: avoid_print, use_build_context_synchronously

import 'dart:io';
import 'package:go_router/go_router.dart';
import 'package:mobile/API/comments_forum_api.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:mobile/ui/core/shared/forum/card_post.dart';
import 'package:file_picker/file_picker.dart';
import 'package:mobile/ui/core/shared/forum/card_comentario.dart';
import 'package:provider/provider.dart';
import '../../../core/shared/export.dart';

class CommentPage extends StatefulWidget {
  const CommentPage({
    super.key,
    required this.post,
  });

  final Map<String, dynamic> post;

  @override
  State<CommentPage> createState() => _CommentPageState();
}

class _CommentPageState extends State<CommentPage> {
  List<File> files = [];
  Color cor = Colors.white;
  bool addcomment = false;
  bool isLoading = true;
  TextEditingController commentController = TextEditingController();
  TextEditingController fileController = TextEditingController();
  late Future<List<dynamic>> comentarios;
  late String idUser;

  Future<void> pickFile() async {
    try {
      FilePickerResult? result = await FilePicker.platform.pickFiles(
        allowMultiple: true,
        type: FileType.any,
      );

      if (result != null && result.paths.isNotEmpty) {
        setState(() {
          files = result.paths
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

  Widget buildAttachmentChips() {
    return Wrap(
      spacing: 8.0,
      runSpacing: 4.0,
      children: files.map((file) {
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

  Future<void> carregarTudo() async {
    try {
      final comentariosCarregados = await ComentarioAPI.getComentariosByPost(widget.post['id_post']);
      if (!mounted) return;
      idUser = Provider.of<AuthProvider>(context, listen: false).user?.id ?? '';

      setState(() {
        comentarios = Future.value(comentariosCarregados);
        isLoading = false;
      });
    } catch (e) {
      print('Erro ao carregar comentários: $e');
      setState(() {
        comentarios = Future.value([]);
        isLoading = false;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    carregarTudo();
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
                cor = addcomment ? AppColors.secondary : Colors.white;
              });
            },
          ),
        ],
      ),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : Padding(
              padding: EdgeInsets.only(left: 16.0, right: 16.0, top: 16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  CardPost(
                    post: widget.post,
                    onDelete: (postId) {
                      setState(() {
                        // Se quiseres remover o post da UI, podes fazê-lo aqui
                      });
                    },
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
                                onPressed: pickFile,
                              ),
                              hintText: 'Adicionar comentário...',
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(20),
                              ),
                              suffixIcon: IconButton(
                                icon: Icon(
                                  Icons.send,
                                  color: AppColors.secondary,
                                ),
                                onPressed: () async {
                                  final textoComentario =
                                      commentController.text.trim();

                                  if (textoComentario.isNotEmpty) {
                                    try {
                                      final formData = {
                                        "id_utilizador": idUser,
                                        "id_post": widget.post['id_post'],
                                        "id_formato": 1,
                                        "texto_comentario": textoComentario,
                                      };

                                      await ComentarioAPI.createComentario(
                                        formData,
                                      );

                                      setState(() {
                                        commentController.clear();
                                        addcomment = false;
                                        cor = Colors.white;
                                        isLoading = true;
                                      });

                                      await carregarTudo(); // Atualiza os comentários
                                    } catch (e) {
                                      print('Erro ao criar comentário: $e');
                                    }
                                  }
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
                  Expanded(
                    child: FutureBuilder<List<dynamic>>(
                      future: comentarios,
                      builder: (context, snapshot) {
                        if (snapshot.connectionState == ConnectionState.waiting) {
                          return Center(child: CircularProgressIndicator());
                        }
                        if (!snapshot.hasData || snapshot.data!.isEmpty) {
                          return Center(child: Text('Sem comentários.'));
                        }
                        final comentariosList = snapshot.data!;
                        return ListView.builder(
                          itemCount: comentariosList.length,
                          itemBuilder: (context, index) {
                            final comentario = comentariosList[index];
                            final user = comentario['id_utilizador_utilizador'];
                            final imgPerfil = user['img_perfil'];

                            return ListTile(
                              contentPadding: EdgeInsets.symmetric(vertical: 8.0),
                              title: CommentBox(
                                id: comentario['id_comentario'],
                                avatarUrl: imgPerfil != null && imgPerfil.isNotEmpty
                                    ? imgPerfil
                                    : 'https://ui-avatars.com/api/?name=${Uri.encodeComponent(user['nome_utilizador'] ?? '')}&background=random&bold=true',
                                nome: user['nome_utilizador'] ?? 'Utilizador',
                                email: user['email'] ?? '',
                                tempo: comentario['data_comentario'] ?? '',
                                likes: comentario['num_gostos'] ?? 0,
                                description: comentario['texto_comentario'] ?? '',
                                onDelete: (id) async {
                                  setState(() => isLoading = true);
                                  await carregarTudo();
                                },
                              ),
                            );
                          },
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
