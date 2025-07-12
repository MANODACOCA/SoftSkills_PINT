// ignore_for_file: avoid_print, use_build_context_synchronously

import 'package:go_router/go_router.dart';
import 'package:mobile/API/comments_forum_api.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:mobile/ui/core/shared/forum/card_post.dart';
import 'package:mobile/ui/core/shared/forum/card_comentario.dart';
import 'package:provider/provider.dart';
import '../../../core/shared/export.dart';

class CommentPage extends StatefulWidget {
  const CommentPage({super.key, required this.post});

  final Map<String, dynamic> post;

  @override
  State<CommentPage> createState() => _CommentPageState();
}

class _CommentPageState extends State<CommentPage> {
  Color cor = Colors.white;
  bool addcomment = false;
  bool isLoading = true;
  TextEditingController commentController = TextEditingController();

  List<Map<String,dynamic>> comentarios = [];
  final ComentarioAPI _api = ComentarioAPI();
  int? idUser;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final userId = Provider.of<AuthProvider>(context, listen: false).user?.id;
      if (userId != null) {
        print('ID do utilizador: $userId');
        setState(() {
          idUser = int.parse(userId);
        });
      }
    });
    fetchComentariosPost();
  }

  Future<void> fetchComentariosPost() async {
    try {
      final comentariosCarregados = await _api.getComentariosByPost(widget.post['id_post']);
      setState(() {
        comentarios = comentariosCarregados;
        isLoading = false;
      });
    } catch (e) {
      print('Erro ao carregar comentários: $e');
    }
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
        title: Text('Comentários', style: TextStyle(color: Colors.white)),
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
          : SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: CardPost(
                      post: widget.post,
                      onDelete: (postId) => setState(() {}),
                      currentPage: 'comentario',
                    ),
                  ),
                  if (addcomment) ...[
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16.0),
                      child: TextField(
                        controller: commentController,
                        decoration: InputDecoration(
                          hintText: 'Adicionar comentário...',
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                          suffixIcon: IconButton(
                            icon: Icon(Icons.send, color: AppColors.secondary),
                            onPressed: () async {
                              final textoComentario = commentController.text.trim();
                              if (textoComentario.isNotEmpty) {
                                final formData = {
                                  "id_utilizador": idUser,
                                  "id_post": widget.post['id_post'],
                                  "id_formato": 1,
                                  "texto_comentario": textoComentario,
                                };
                                await ComentarioAPI.createComentario(formData);
                                setState(() {
                                  commentController.clear();
                                  addcomment = false;
                                  cor = Colors.white;
                                  isLoading = true;
                                  widget.post['contador_comentarios'] = (widget.post['contador_comentarios'] ?? 0) + 1;
                                });
                                await fetchComentariosPost();
                              }
                            },
                          ),
                        ),
                      ),
                    ),
                  ],
                  Divider(color: Colors.grey, thickness: 1),
                  if (comentarios.isEmpty)
                    Center(child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Text('Sem comentários.'),
                    ))
                  else
                    ListView.builder(
                      shrinkWrap: true,
                      physics: NeverScrollableScrollPhysics(),
                      itemCount: comentarios.length,
                      itemBuilder: (context, index) {
                        final comentario = comentarios[index];
                        return ListTile(
                          contentPadding: EdgeInsets.symmetric(vertical: 8.0),
                          title: CommentBox(
                          comentario: comentario,
                          onDelete: (comentarioId) async {
                            await fetchComentariosPost();
                          },
                          onLike: (comentarioId) async {
                            await fetchComentariosPost();
                          },
                          ),
                        );
                      },
                    ),
                ],
              ),
            ),
          ),
      bottomNavigationBar: Footer(),
    );
  }
}
