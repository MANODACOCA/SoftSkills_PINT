import 'package:flutter/material.dart';

class PostOptionsDropdown extends StatelessWidget {
  const PostOptionsDropdown({super.key, required this.post, required this.userId, this.onDelete, this.onDenunciar, required this.tipo});

  final Map<String, dynamic> post;
  final int userId;
  final void Function(String postId)? onDelete;
  final void Function(String postId)? onDenunciar;
  final String tipo;

  @override
  Widget build(BuildContext context) {
    final isOwner = post['id_utilizador'] == userId;

    return PopupMenuButton<String>(
      onSelected: (value) {
        if (value == 'denunciar') {
          if (tipo == 'post'){
            onDenunciar?.call(post['id_post'].toString());
          }else if (tipo == 'comentario') {
            onDenunciar?.call(post['id_comentario'].toString());
          }
        } else if (value == 'eliminar') {
          if (tipo == 'post'){
            onDelete?.call(post['id_post'].toString());
          }else if (tipo == 'comentario') {
            onDelete?.call(post['id_comentario'].toString());
          }
        }
      },
      itemBuilder: (context) => [
        if (isOwner)
          const PopupMenuItem<String>(
            value: 'eliminar',
            child: Text('Eliminar'),
          )
        else
          const PopupMenuItem<String>(
            value: 'denunciar',
            child: Text('Denunciar'),
          ),
      ],
    );
  }
}
