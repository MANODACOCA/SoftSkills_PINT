import 'package:flutter/material.dart';

class PostOptionsDropdown extends StatelessWidget {
  const PostOptionsDropdown({super.key, required this.post, required this.userId, this.onDelete, this.onDenunciar});

  final Map<String, dynamic> post;
  final int userId;
  final void Function(String postId)? onDelete;
  final void Function()? onDenunciar;

  @override
  Widget build(BuildContext context) {
    final isOwner = post['id_utilizador'] == userId;

    return PopupMenuButton<String>(
      onSelected: (value) {
        if (value == 'denunciar') {
          onDenunciar?.call();
        } else if (value == 'eliminar') {
          onDelete?.call(post['id_post'].toString());
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
