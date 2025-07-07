// ignore_for_file: avoid_print
// ignore: unused_import
import '../../../routing/forum_routes.dart';
import 'package:go_router/go_router.dart';
import '../../../API/forum_api.dart';
import '../../core/shared/export.dart';


class Forum extends StatefulWidget {
  const Forum({super.key});

  @override
  State<Forum> createState() => _ForumState();
}

class _ForumState extends State<Forum> {
  List<dynamic> foruns = [];
  bool loading = true;

  Future<void> carregarForuns() async {
    try {
      final resultado = await ForumAPI.listConteudosPartilhado();
      setState(() {
        foruns = resultado;
        loading = false;
      });
    } catch (e) {
      setState(() {
        loading = false;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    carregarForuns();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScope.of(context).unfocus();
      },
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: AppColors.primary,
          title: SearchBarCustom(),
          centerTitle: true,
        ),
        body:
            loading
                ? Center(child: CircularProgressIndicator())
                : SingleChildScrollView(
                  padding: EdgeInsets.all(20),
                  child: ListView.builder(
                    shrinkWrap: true,
                    physics: NeverScrollableScrollPhysics(),
                    itemCount: foruns.length,
                    itemBuilder: (context, index) {
                      final forum = foruns[index];
                      return GestureDetector(
                        onTap: () {
                          context.push(
                            '/forumPage',
                            extra: {
                              'forumID':
                                  forum['id_conteudos_partilhado'].toString(),
                              'name':
                                  forum['id_topico_topico']?['nome_topico'],
                            },
                          );
                        },
                        child: CardForum(
                          title:
                              forum['id_topico_topico']?['nome_topico'] ??
                              'Sem título',
                          description:
                              forum['id_topico_topico']?['descricao_top'] ?? '',
                          imageUrl:
                              forum['imagem'] ??
                              'https://ui-avatars.com/api/?name=${Uri.encodeComponent(forum['id_topico_topico']?['nome_topico'] ?? 'Forum')}&background=random&bold=true',
                        ),
                      );
                    },
                  ),
                ),
        bottomNavigationBar: Footer(),
      ),
    );
  }
}

class CardForum extends StatelessWidget {
  final String title;
  final String description;
  final String imageUrl;

  const CardForum({
    super.key,
    required this.title,
    required this.description,
    required this.imageUrl,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: Image.network(
          imageUrl,
          width: 50,
          height: 50,
          fit: BoxFit.cover,
          loadingBuilder: (context, child, loadingProgress) {
            if (loadingProgress == null) return child;
            return CircleAvatar(
              backgroundColor: Colors.grey[300],
              child: Text(
                title.isNotEmpty
                    ? title
                        .trim()
                        .split(' ')
                        .map((e) => e[0])
                        .take(2)
                        .join()
                        .toUpperCase()
                    : '',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.black,
                ),
              ),
            );
          },
          errorBuilder:
              (context, error, stackTrace) => CircleAvatar(
                backgroundColor: Colors.grey[300],
                child: Text(
                  title.isNotEmpty
                      ? title
                          .trim()
                          .split(' ')
                          .map((e) => e[0])
                          .take(2)
                          .join()
                          .toUpperCase()
                      : '',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
              ),
        ),
        contentPadding: EdgeInsets.all(10),
        title: Text(title),
        subtitle: Text(
          description,
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
        ),
      ),
    );
  }
}
