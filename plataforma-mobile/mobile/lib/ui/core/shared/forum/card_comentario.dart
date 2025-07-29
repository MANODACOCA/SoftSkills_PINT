// ignore_for_file: use_build_context_synchronously, avoid_print
import 'package:flutter/material.dart';
import 'package:mobile/API/comments_forum_api.dart';
import 'package:mobile/API/forum_api.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:mobile/ui/core/shared/forum/dropdown_report_delete.dart';
import 'package:mobile/ui/core/shared/popup_check_generico/custom_dialogs.dart';
import 'package:mobile/ui/core/themes/colors.dart';
import 'package:mobile/utils/uteis.dart';
import 'package:provider/provider.dart';

class CommentBox extends StatefulWidget {
  const CommentBox({
    super.key,
    required this.comentario,
    this.onDelete,
    this.onLike,
  });

  final Map<String,dynamic> comentario;
  final Future<void> Function(String comentarioId)? onDelete;
  final Future<void> Function(String comentarioId)? onLike;

  @override
  State<CommentBox> createState() => _CommentBoxState();
}

class _CommentBoxState extends State<CommentBox> {
  final ForumAPI _apiForum = ForumAPI();
  final ComentarioAPI _apiComentario = ComentarioAPI();
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
          countLikes = widget.comentario['contador_likes_com'] ?? 0;
        });
        carregarEstadoLike();
      }
    });
  }

  //adicionar remover like comentario
  Future<void> carregarEstadoLike() async {
      final idComentario = widget.comentario['id_comentario'].toString();
      try {
        final deuLike = await _apiComentario.jaDeuLike(idComentario, idUser!);
        print(deuLike);
        setState(() {
          isLiked = deuLike;
        });
      } catch (e) {
        print('Erro ao carregar estado do like: $e');
      }
  }

  Future<void> createLike() async {
    final idComentario = widget.comentario['id_comentario'].toString();
    setState(() {
      isLiked = true;
      countLikes++;
    });
    try {
      await _apiComentario.likeComentario(idComentario, idUser!);
      widget.onLike?.call(idComentario);
    } catch (e) {
      print('Erro ao criar like: $e');
      setState(() {
        isLiked = false;
        countLikes--;
      });
    }
  }

  Future<void> deleteLike() async {
    final idComentario = widget.comentario['id_comentario'].toString();
    setState(() {
      isLiked = false;
      countLikes--;
    });
    try {
      await _apiComentario.unlikeComentario(idComentario, idUser!);
      widget.onLike?.call(idComentario);
    } catch (e) {
      print('Erro ao remover like: $e');
      setState(() {
        isLiked = true;
        countLikes++;
      });
    }
  }

  Future<void> fetchTipoDenuncias() async {
    try { 
      final esteDenuncia = await _apiForum.listDenuncias();
      setState(() {
        denuncias = esteDenuncia;
      });
    } catch(e) {
      print('Erro ao encontrar tipo denuncia');
    }
  }

  //eliminar comentario
  Future<void> removerComentario(String id) async {
    try {
      await _apiComentario.deleteComentario(id);
    } catch (e) {
      print('Erro ao remover comentario');
      rethrow;
    }
  }

  Future<void> confirmarEEliminarComentario(String comentarioId) async {
    final confirm = await showConfirmDialog(
      context: context, 
      title: 'Tem a certeza que pretende eliminar o seu comentário?', 
      content: 'Esta ação não poderá ser desfeita!', 
      confirmText: 'Eliminar', 
      cancelText: 'Cancelar'
    );

    if (confirm == true) {
      try {
        await removerComentario(comentarioId); 
        widget.onDelete?.call(comentarioId);
        if(!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Comentario eliminado com sucesso')),
        );
      } catch (e) {
        if(!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Erro ao eliminar comentario')),
        );
      }
    }
  }

//enviar denuncia
  Future<void> enviarDenuncia(String comentarioId, int idTipoDenuncia) async {
    try {
      final data = {
        'id_comentario': int.parse(comentarioId), 
        'id_utilizador': idUser, 
        'id_post': null, 
        'id_tipo_denuncia': idTipoDenuncia
      };
      await _apiForum.criarDenuncia(data);
    } catch (e) {
      print('Erro ao criar denuncia: $e');
      rethrow;
    }
  }

  Future<void> confirmarEEnviarDenuncia(String comentarioId) async {
    if (denuncias.isEmpty) {
      await fetchTipoDenuncias();
    }

    final int? idTipo = await showDenunciaDialog(context, denuncias);

    if (idTipo != null) {
      try {
        await enviarDenuncia(comentarioId, idTipo);
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

  @override
  Widget build(BuildContext context) {
    final img = widget.comentario['id_utilizador_utilizador']?['img_perfil'];
    final imageUrl = 'https://ui-avatars.com/api/?name= ${Uri.encodeComponent(widget.comentario['id_utilizador_utilizador']?['nome_utilizador'])}&background=random&bold=true';            
    return Container(
      
      width: double.infinity,
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(
          color: Color(0xFFEEEEEE),
          width: 1,
        ),
        borderRadius: BorderRadius.circular(10)
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
                            return Image.network(
                              imageUrl,
                              fit: BoxFit.cover,
                            );
                          },
                        )
                      ),
                    ),
                    SizedBox(width: 8,),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(widget.comentario['id_utilizador_utilizador']?['nome_utilizador'], style: TextStyle(fontSize: 16),),
                        Text(tempoDecorrido(widget.comentario['data_criacao_comentario']), style: TextStyle(fontSize: 12),),
                      ],
                    ),
                  ],
                ),
                //denuncia ou eliminar dropdown
                if (idUser != null)
                PostOptionsDropdown(
                  post: widget.comentario,
                  userId: idUser!,
                  onDelete: confirmarEEliminarComentario,
                  onDenunciar: confirmarEEnviarDenuncia,
                  tipo: 'comentario',
                )
              ],
            ),
            SizedBox(height: 10,),
            Align(
              alignment: Alignment.centerLeft,
              child: Text(widget.comentario['texto_comentario']),
            ),
            //like
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
                        await createLike();
                      } else {
                        await deleteLike();
                      }
                      setState(() {
                        isLiking = false;
                      });
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
              ],
            ),
          ],
        ),
      ),
    );
  }
}