// ignore_for_file: unnecessary_brace_in_string_interps, avoid_print, prefer_typing_uninitialized_variables, unused_field, use_build_context_synchronously
import 'dart:io';
import 'package:file_picker/file_picker.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/API/forum_api.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:mobile/ui/core/shared/forum/card_post.dart';
import 'package:mobile/ui/core/shared/forum/forum_header.dart';
import 'package:path/path.dart' as p;
import 'package:provider/provider.dart';
import '../../../../API/utilizadores_api.dart';
import '../../../core/shared/export.dart';

// ignore: must_be_immutable
class ForumPage extends StatefulWidget {
  const ForumPage({super.key, required this.forumID, required this.description, required this.name});

  final String name;
  final String forumID;
  final String description;

  @override
  State<ForumPage> createState() => _ForumPageState();
}

class _ForumPageState extends State<ForumPage> {
  Color paint = Colors.white;
  bool addPost = false;
  late final String? userId;
  bool isLoading = true;

  final TextEditingController textControllerPost = TextEditingController();

  late var forumInfo;
  late List users = [];
  File? ficheiro; // Apenas um ficheiro
  late Map<String, dynamic>? forumPost;
  late List<dynamic> posts = [];
  late String forumID = widget.forumID;
  String _ordem = "Mais Recentes";

  Future<void> carregarDados([String? ordem]) async {
    _ordem = ordem ?? _ordem;
    try {
      forumInfo = await ForumAPI.getConteudosPartilhado(widget.forumID);
      forumPost = await ForumAPI.getPost(widget.forumID, ordenar: _ordem);
      print('Post Info: $forumPost');
      users = [];

      if (forumPost != null && forumPost!['posts'] != null) {
        posts = List.from(forumPost!['posts']);
        for (var post in posts) {
          final userId = post['id_utilizador_utilizador']['id_utilizador'];
          var userData = await UtilizadoresApi().getUtilizador(userId);
          users.add(userData);
        }
      } else {
        posts = [];
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
    userId = Provider.of<AuthProvider>(context, listen: false).user?.id;
    carregarDados();
  }

  void removerPostLocalmente(String postId) {
    setState(() {
      posts.removeWhere((post) => post['id_post'].toString() == postId);
    });
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
        actions: [],
      ),
      body:
          isLoading
              ? Center(child: CircularProgressIndicator())
              : RefreshIndicator(
                onRefresh: () => carregarDados(),
                child:Column(
                  children: [
                    Expanded(
                      child: SingleChildScrollView(
                        child: GestureDetector(
                          child: Padding(
                            padding: EdgeInsets.symmetric(),
                            child: Column(
                              children: <Widget>[
                                SizedBox(height: 8,),
                                ForumHeader(
                                  postCount: posts.length, 
                                  title: widget.name, 
                                  description: widget.description, 
                                  initials: (widget.name.isNotEmpty && widget.name.trim().contains(' '))
                                    ? widget.name.trim().split(' ').map((e) => e.isNotEmpty ? e[0] : '').take(2).join().toUpperCase()
                                    : widget.name.isNotEmpty ? widget.name[0].toUpperCase() : 'F', 
                                  onNewPost: () {
                                    setState(() {
                                      addPost = !addPost;
                                      paint = AppColors.secondary;
                                    });
                                  },
                                  addPost: addPost,
                                  paint: paint,
                                ),
                                Padding(
                                  padding: EdgeInsets.all(15),
                                  child: Column(
                                    children: [
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
                                      SizedBox(height: 10),
                                      if (posts.isNotEmpty)
                                        ...List.generate(posts.length, (index) {
                                          final post = posts[index];
                                          final user = post['id_utilizador_utilizador'];
                                          print('====== Post: $post');
                                          return Padding(
                                            padding: const EdgeInsets.only(
                                              bottom: 16.0,
                                            ),
                                            child: CardPost(
                                              key: ValueKey(post['id_post']),
                                              post: post,
                                              onDelete: (postId) {
                                                carregarDados();
                                              },
                                              currentPage: 'post',
                                            ),
                                          );
                                        }
                                      ),
                                      if (posts.isEmpty)
                                        Center(
                                          child: Text('Este fórum ainda não contém posts'),
                                        ),
                                    ],
                                  ), 
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ) ,
      bottomNavigationBar: Footer(),
    );
  }

  Widget buildAddPostForm() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text(
          'Criar novo post',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Colors.black87,
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
        if (ficheiro != null) ...[
          SizedBox(height: 12),
          Text(
            "Ficheiro anexado:",
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          ListTile(
            contentPadding: EdgeInsets.zero,
            leading: Icon(Icons.insert_drive_file),
            title: Text(
              p.basename(ficheiro!.path),
              overflow: TextOverflow.ellipsis,
            ),
            trailing: IconButton(
              icon: Icon(Icons.close),
              onPressed: () {
                setState(() {
                  ficheiro = null;
                });
              },
            ),
          ),
        ],
        SizedBox(height: 12),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            ElevatedButton.icon(
              onPressed: () async {
                FilePickerResult? result =
                    await FilePicker.platform.pickFiles();
                if (result != null && result.files.single.path != null) {
                  setState(() {
                    ficheiro = File(result.files.single.path!);
                  });
                  print('Ficheiro selecionado: ${ficheiro!.path}');
                }
              },
              label: Text('Anexar', style: TextStyle(color: Colors.white)),
              icon: Icon(Icons.attach_file, color: Colors.white),
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
              ),
            ),
            ElevatedButton.icon(
              icon: Icon(Icons.send, color: Colors.white),
              label: Text("Publicar", style: TextStyle(color: Colors.white)),
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
              ),
              onPressed: () async {
                final description = textControllerPost.text;
                if (description.isNotEmpty) {
                  try {
                    await ForumAPI.createPost(
                      textoPost: description,
                      userId: userId!,
                      forumId: widget.forumID,
                      ficheiro: ficheiro,
                    );

                    setState(() {
                      textControllerPost.clear();
                      addPost = false;
                      paint = Colors.white;
                      ficheiro = null;
                    });

                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text('Post criado com sucesso!'),
                        backgroundColor: Colors.green,
                      ),
                    );

                    await carregarDados();
                  } catch (e) {
                    print('Erro ao criar post: $e');
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text('Erro ao criar post. Tente novamente.'),
                        backgroundColor: Colors.red,
                      ),
                    );
                  }
                }
              },
            ),
          ],
        ),
      ],
    );
  }
}
