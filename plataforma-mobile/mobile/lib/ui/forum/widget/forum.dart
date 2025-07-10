// ignore_for_file: avoid_print
// ignore: unused_import
import 'package:mobile/ui/core/shared/base_comp/dropdown_filter_forum.dart';

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

  @override
  void initState() {
    super.initState();
    carregarForuns();
  }

  String _search = "";
  String _ordem = "Mais Recentes";

  Future<void> carregarForuns({String? ordem, String? search}) async {
    _search = search ?? _search;
    _ordem = ordem ?? _ordem;

    try {
      final resultado = await ForumAPI.listConteudosPartilhado(ordenar: _ordem, search: _search);
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
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScope.of(context).unfocus();
      },
      child: AppScaffold(
        appBar: AppBar(
          backgroundColor: AppColors.primary,
          title: SearchBarCustom(
            hintText: 'Pesquisar fórum',
            onFilterTap: () {
              DropdownFilterForum.show(context, ({String? ordem}) {
                carregarForuns(ordem: ordem);
              },
              "Forum",
              );
            },
            onSearchChanged: (value) {
              carregarForuns(search: value);
            },
          ),
          centerTitle: true,
        ),
        body:
            loading
                ? Center(child: CircularProgressIndicator())
                : foruns.isEmpty
                ? Center(child: Text('Nenhum fórum encontrado.'))
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
                              'name': forum['id_topico_topico']?['nome_topico'],
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
        subtitle: Builder(
          builder: (context) {
            return _ExpandableText(description);
          },
        ),
      ),
    );
  }
}

class _ExpandableText extends StatefulWidget {
  final String text;
  const _ExpandableText(this.text);

  @override
  State<_ExpandableText> createState() => _ExpandableTextState();
}

class _ExpandableTextState extends State<_ExpandableText> {
  bool _expanded = false;
  bool _exceedsMaxLines = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Verifica se o texto excede 2 linhas
    final span = TextSpan(
      text: widget.text,
      style: Theme.of(context).textTheme.bodyMedium,
    );
    final tp = TextPainter(
      text: span,
      maxLines: 2,
      textDirection: TextDirection.ltr,
    )..layout(maxWidth: MediaQuery.of(context).size.width - 100);
    _exceedsMaxLines = tp.didExceedMaxLines;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        AnimatedSize(
          duration: Duration(milliseconds: 200),
          child: Text(
            widget.text,
            maxLines: _expanded ? null : 2,
            overflow: _expanded ? TextOverflow.visible : TextOverflow.ellipsis,
          ),
        ),
        if (_exceedsMaxLines)
          GestureDetector(
            onTap: () {
              setState(() {
                _expanded = !_expanded;
              });
            },
            child: Text(
              _expanded ? 'Ver menos' : 'Ver mais',
              style: TextStyle(
                color: AppColors.primary,
                fontWeight: FontWeight.bold,
                fontSize: 13,
              ),
            ),
          ),
      ],
    );
  }
}
