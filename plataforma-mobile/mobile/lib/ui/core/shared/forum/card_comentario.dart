// ignore_for_file: use_build_context_synchronously
import 'package:flutter/material.dart';
import 'package:mobile/API/comments_forum_api.dart';
import 'package:mobile/API/utilizadores_api.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:provider/provider.dart';

class CommentBox extends StatefulWidget {
  const CommentBox({
    super.key,
    required this.id,
    required this.avatarUrl,
    required this.nome,
    required this.email,
    required this.tempo,
    required this.description,
    required this.likes,
    this.onDelete,
  });

  final int id;
  final String avatarUrl;
  final String nome;
  final String email;
  final String tempo;
  final String description;
  final int likes;
  final void Function(int id)? onDelete; //Callback para apagar comentário

  @override
  State<CommentBox> createState() => _CommentBoxState();
}

class _CommentBoxState extends State<CommentBox> {
  bool expanded = false;
  late String idUser = '';
  late Future<Map<String, dynamic>> userINFO;
  late String nameUser;

  @override
  void initState() {
    super.initState();
    idUser = Provider.of<AuthProvider>(context, listen: false).user?.id ?? '';
    userINFO = UtilizadoresApi().getUtilizador(int.parse(idUser));
    userINFO.then((value) {
      nameUser = value['nome_utilizador'];
    });
  }

  @override
  Widget build(BuildContext context) {
    final showSeeMore = widget.description.length > 120;
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(color: Colors.black12, blurRadius: 2, offset: Offset(0, 1)),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CircleAvatar(
                  backgroundImage: NetworkImage(widget.avatarUrl),
                  radius: 22,
                  backgroundColor: Colors.blue[100],
                  child:
                      widget.avatarUrl.isEmpty
                          ? Text(
                            widget.nome.isNotEmpty
                                ? widget.nome
                                    .trim()
                                    .split(' ')
                                    .map((e) => e[0])
                                    .take(2)
                                    .join()
                                    .toUpperCase()
                                : '',
                          )
                          : null,
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Text(
                            widget.nome,
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Colors.blue[900],
                              fontSize: 16,
                            ),
                          ),
                          const SizedBox(width: 6),
                          Expanded(
                            child: Text(
                              "<${widget.email}>",
                              style: TextStyle(
                                color: Colors.grey[600],
                                fontSize: 13,
                              ),
                              overflow: TextOverflow.ellipsis,
                              maxLines: 1,
                            ),
                          ),
                        ],
                      ),
                      Text(
                        widget.tempo,
                        style: TextStyle(color: Colors.grey[500], fontSize: 12),
                      ),
                    ],
                  ),
                ),
                PopupMenuButton<String>(
                  icon: Icon(Icons.more_vert, color: Colors.grey[700]),
                  onSelected: (value) async {
                    if (value == 'apagar') {
                      final confirm = await showDialog<bool>(
                        context: context,
                        builder:
                            (context) => AlertDialog(
                              title: Text('Confirmar eliminação'),
                              content: Text(
                                'Tens a certeza que queres apagar este comentário?',
                              ),
                              actions: [
                                TextButton(
                                  onPressed:
                                      () => Navigator.of(context).pop(false),
                                  child: Text('Cancelar'),
                                ),
                                TextButton(
                                  onPressed:
                                      () => Navigator.of(context).pop(true),
                                  child: Text(
                                    'Apagar',
                                    style: TextStyle(color: Colors.red),
                                  ),
                                ),
                              ],
                            ),
                      );
                      if (confirm == true) {
                        try {
                          final String idUserString = widget.id.toString();
                          await ComentarioAPI.deleteComentario(idUserString);
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text('Comentário apagado com sucesso!'),
                            ),
                          );
                          if (widget.onDelete != null) {
                            widget.onDelete!(
                              widget.id,
                            );
                          }
                        } catch (e) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text('Erro ao apagar comentário!'),
                            ),
                          );
                        }
                      }
                    } else if (value == 'denunciar') {
                      // Handle report action
                    }
                  },
                  itemBuilder:
                      (context) => [
                        if (nameUser == widget.nome)
                          PopupMenuItem(
                            value: 'apagar',
                            child: Row(
                              children: [
                                Icon(Icons.delete, color: Colors.red, size: 18),
                                SizedBox(width: 8),
                                Text(
                                  'Apagar',
                                  style: TextStyle(color: Colors.red),
                                ),
                              ],
                            ),
                          )
                        else
                          PopupMenuItem(
                            value: 'denunciar',
                            child: Row(
                              children: [
                                Icon(
                                  Icons.warning,
                                  color: Colors.red,
                                  size: 18,
                                ),
                                SizedBox(width: 8),
                                Text(
                                  'Denunciar',
                                  style: TextStyle(color: Colors.red),
                                ),
                              ],
                            ),
                          ),
                      ],
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              widget.description,
              maxLines: expanded ? null : 3,
              overflow: expanded ? TextOverflow.visible : TextOverflow.ellipsis,
              style: TextStyle(fontSize: 15),
            ),
            if (showSeeMore)
              TextButton(
                style: TextButton.styleFrom(
                  padding: EdgeInsets.zero,
                  minimumSize: Size(50, 30),
                  tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                  visualDensity: VisualDensity.compact,
                ),
                onPressed: () => setState(() => expanded = !expanded),
                child: Text(
                  expanded ? 'Ver menos' : 'Ver mais',
                  style: TextStyle(
                    color: Theme.of(context).primaryColor,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            const SizedBox(height: 8),
            Divider(),
            Row(
              children: [
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color(0xFF3B5998),
                    foregroundColor: Colors.white,
                    padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(6),
                    ),
                  ),
                  icon: Icon(Icons.thumb_up_alt_outlined, size: 18),
                  label: Text(
                    '${widget.likes}',
                    style: TextStyle(fontSize: 15),
                  ),
                  onPressed: () {},
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
