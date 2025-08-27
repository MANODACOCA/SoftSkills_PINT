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
        actions: [],
      ),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  CardPost(
                    post: widget.post,
                    onDelete: (postId) => setState(() {}),
                    currentPage: 'comentario',
                  ),
                  Divider(color: Colors.grey, thickness: 1),
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 10),
                    child: Container(
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(12),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.05),
                            blurRadius: 8,
                            offset: const Offset(0, 2),
                          ),
                        ],
                      ),
                      child: TextField(
                        controller: commentController,
                        decoration: InputDecoration(
                          hintText: 'Adicionar comentário...',
                          hintStyle: const TextStyle(
                            color: Color(0xFF757575),
                            fontSize: 14,
                          ),
                          filled: true,
                          fillColor: Colors.white,
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: const BorderSide(color: Color(0xFFE0E0E0)),
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: const BorderSide(color: Color(0xFFE0E0E0)),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: const BorderSide(color: Color(0xFF1976D2), width: 2),
                          ),
                          suffixIcon: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              IconButton(
                                icon: Icon(
                                  Icons.attach_file,
                                  color: AppColors.secondary,
                                  size: 24,
                                ),
                                onPressed: () async {
                                  print('Ícone de anexo clicado');
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    const SnackBar(
                                      content: Text('Funcionalidade de anexo em desenvolvimento'),
                                    ),
                                  );
                                },
                              ),
                              IconButton(
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
                                      cor = Colors.white;
                                      isLoading = true;
                                      widget.post['contador_comentarios'] = (widget.post['contador_comentarios'] ?? 0) + 1;
                                    });
                                    await fetchComentariosPost();
                                  }
                                },
                              ),
                            ],
                          ) 
                        ),
                      ),
                    ),
                  ),
                  if (comentarios.isEmpty)
                    Center(child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Text('Sem comentários.'),
                    ))
                  else
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: 10),
                      child: ListView.builder(
                      shrinkWrap: true,
                      physics: NeverScrollableScrollPhysics(),
                      itemCount: comentarios.length,
                      itemBuilder: (context, index) {
                        final comentario = comentarios[index];
                        return ListTile(
                          contentPadding: EdgeInsets.symmetric(vertical: 2.0),
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
                    ),
                    
                ],
              ),
            ),
          ),
      bottomNavigationBar: Footer(),
    );
  }
}
