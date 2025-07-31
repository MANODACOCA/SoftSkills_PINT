// ignore_for_file: unnecessary_string_interpolations, deprecated_member_use

import 'dart:io';

import 'package:dio/dio.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/API/forum_api.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:mobile/ui/core/shared/export.dart';
import 'package:mobile/ui/core/shared/forum/dropdown_report_delete.dart';
import 'package:mobile/ui/core/shared/popup_check_generico/custom_dialogs.dart';
import 'package:mobile/utils/uteis.dart';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as p;
import 'package:provider/provider.dart';
import 'package:open_file/open_file.dart';

class CardPost extends StatefulWidget {
  const CardPost({
    super.key,
    required this.post,
    this.onDelete,
    required this.currentPage,
  });

  final Map<String, dynamic> post;
  final void Function(String postId)? onDelete;
  final String currentPage;

  @override
  State<CardPost> createState() => _CardPostState();
}

class _CardPostState extends State<CardPost> {
  final ForumAPI _api = ForumAPI();
  List<Map<String, dynamic>> denuncias = [];
  int? idUser;
  bool isLiked = false;
  bool isLiking = false;
  late int countLikes = 0;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final userId = Provider.of<AuthProvider>(context, listen: false).user?.id;
      if (userId != null) {
        print('ID do utilizador: $userId');
        setState(() {
          idUser = int.parse(userId);
          countLikes = widget.post['contador_likes_post'] ?? 0;
        });
        carregarEstadoLikePost();
      }
    });
  }

  Future<void> carregarEstadoLikePost() async {
    final idPost = widget.post['id_post'].toString();
    try {
      final deuLikePost = await _api.jaDeuLike(idPost, idUser!);
      setState(() {
        isLiked = deuLikePost;
      });
    } catch (e) {
      print('Erro ao carregar estado do like do post: $e');
    }
  }

  Future<void> createLikePost() async {
    final idPost = widget.post['id_post'].toString();
    setState(() {
      isLiked = true;
      countLikes++;
    });
    try {
      await _api.putLike(idPost, idUser!);
    } catch (e) {
      print('Erro ao criar like no post: $e');
      setState(() {
        isLiked = false;
        countLikes--;
      });
    }
  }

  Future<void> deleteLikePost() async {
    final idPost = widget.post['id_post'].toString();
    setState(() {
      isLiked = false;
      countLikes--;
    });
    try {
      await _api.deleteLike(idPost, idUser!);
    } catch (e) {
      print('Erro ao remover like no post: $e');
      setState(() {
        isLiked = true;
        countLikes++;
      });
    }
  }

  Future<void> fetchTipoDenuncias() async {
    try {
      final esteDenuncia = await _api.listDenuncias();
      setState(() {
        denuncias = esteDenuncia;
      });
    } catch (e) {
      print('Erro ao encontrar tipo denuncia');
    }
  }

  Future<void> removerPost(String id) async {
    try {
      await _api.deletePost(id);
    } catch (e) {
      print('Erro ao remover post');
      rethrow;
    }
  }

  Future<void> confirmarEEliminarPost(String postId) async {
    final confirm = await showConfirmDialog(
      context: context,
      title: 'Tem a certeza que pretende eliminar o seu post?',
      content: 'Esta ação não poderá ser desfeita!',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
    );

    if (confirm == true) {
      try {
        await removerPost(postId);
        widget.onDelete?.call(postId);
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Post eliminado com sucesso')),
        );
      } catch (e) {
        if (!mounted) return;
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text('Erro ao eliminar post')));
      }
    }
  }

  Future<void> enviarDenuncia(String postId, int idTipoDenuncia) async {
    try {
      final data = {
        'id_comentario': null,
        'id_utilizador': idUser,
        'id_post': int.parse(postId),
        'id_tipo_denuncia': idTipoDenuncia,
      };
      await _api.criarDenuncia(data);
    } catch (e) {
      print('Erro ao criar denuncia: $e');
      rethrow;
    }
  }

  Future<void> confirmarEEnviarDenuncia(String postId) async {
    if (denuncias.isEmpty) {
      await fetchTipoDenuncias();
    }

    if (!mounted) return;
    final int? idTipo = await showDenunciaDialog(context, denuncias);

    if (idTipo != null) {
      try {
        await enviarDenuncia(postId, idTipo);
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Denúncia enviada com sucesso')),
        );
      } catch (e) {
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Erro ao enviar denúncia')),
        );
      }
    }
  }

  Future<void> abrirArquivo() async {
    final url = widget.post['caminho_ficheiro'];
    if (url == null) return;

    try {
      final filename = url.split('/').last;
      final dir = await getApplicationDocumentsDirectory();
      final filePath = '${dir.path}/$filename';

      final localFile = File(filePath);
      if (!await localFile.exists()) {
        await Dio().download(url, filePath);
      }

      final result = await OpenFile.open(filePath);
      if (result.type != ResultType.done) {
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(result.message),
          ),
        );
      }
    } catch (e) {
      print('Erro ao abrir arquivo: $e');
      if (!mounted) return;
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Erro ao abrir arquivo')));
    }
  }

  @override
  Widget build(BuildContext context) {
    final img = widget.post['id_utilizador_utilizador']?['img_perfil'];
    final imageUrl =
        'https://ui-avatars.com/api/?name=${Uri.encodeComponent(widget.post['id_utilizador_utilizador']?['nome_utilizador'])}&background=random&bold=true';

    final fileUrl = widget.post['caminho_ficheiro'];

    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: Color(0xFFEEEEEE), width: 1),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Padding(
        padding: EdgeInsets.all(8),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    ClipOval(
                      child: SizedBox(
                        height: 50,
                        width: 50,
                        child: Image.network(
                          'https://softskills-api.onrender.com/$img',
                          fit: BoxFit.cover,
                          errorBuilder: (context, error, stackTrace) {
                            return Image.network(imageUrl, fit: BoxFit.cover);
                          },
                        ),
                      ),
                    ),
                    SizedBox(width: 8),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget
                              .post['id_utilizador_utilizador']?['nome_utilizador'],
                          style: TextStyle(fontSize: 16),
                        ),
                        Text(
                          tempoDecorrido(widget.post['data_criacao_post']),
                          style: TextStyle(fontSize: 12),
                        ),
                      ],
                    ),
                  ],
                ),
                if (idUser != null)
                  PostOptionsDropdown(
                    post: widget.post,
                    userId: idUser!,
                    onDelete: confirmarEEliminarPost,
                    onDenunciar: confirmarEEnviarDenuncia,
                    tipo: 'post',
                  ),
              ],
            ),
            SizedBox(height: 10),
            Align(
              alignment: Alignment.centerLeft,
              child: Text(widget.post['texto_post']),
            ),
            SizedBox(height: 7),
            if (fileUrl != null) ...[
              SizedBox(height: 4),
              Align(
                alignment: Alignment.centerLeft,
                child: GestureDetector(
                  onTap: abrirArquivo,
                  child: Container(
                    padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppColors.primary.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: AppColors.primary, width: 1),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          Icons.attach_file,
                          size: 16,
                          color: AppColors.primary,
                        ),
                        SizedBox(width: 4),
                        Text(
                          p.basename(fileUrl),
                          style: TextStyle(
                            fontSize: 12,
                            color: AppColors.primary,
                            decoration: TextDecoration.underline,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
            SizedBox(height: 15),
            Row(
              children: [
                AbsorbPointer(
                  absorbing: isLiking,
                  child: GestureDetector(
                    onTap: () async {
                      setState(() {
                        isLiking = true;
                      });
                      if (!isLiked) {
                        await createLikePost();
                      } else {
                        await deleteLikePost();
                      }
                      setState(() {
                        isLiking = false;
                      });
                    },
                    child: Container(
                      padding: EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 6,
                      ),
                      decoration: BoxDecoration(
                        color: AppColors.primary,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Row(
                        children: [
                          Icon(
                            isLiked ? Icons.thumb_up : Icons.thumb_up_outlined,
                            color: Colors.white,
                            size: 20,
                          ),
                          SizedBox(width: 4),
                          Text(
                            countLikes.toString(),
                            style: TextStyle(color: Colors.white, fontSize: 14),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                SizedBox(width: 10),
                GestureDetector(
                  onTap: () {
                    if (widget.currentPage == 'post') {
                      widget.post['contador_likes_post'] = countLikes;
                      context.push('/commentPage', extra: widget.post);
                    }
                  },
                  child: Container(
                    padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: AppColors.primary,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Row(
                      children: [
                        Icon(
                          widget.currentPage == 'post'
                              ? Icons.chat_outlined
                              : Icons.chat,
                          color: Colors.white,
                          size: 20,
                        ),
                        SizedBox(width: 4),
                        Text(
                          widget.post['contador_comentarios'].toString(),
                          style: TextStyle(color: Colors.white, fontSize: 14),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
