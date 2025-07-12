// ignore_for_file: avoid_print
// ignore: unused_import
import 'package:mobile/ui/core/shared/base_comp/dropdown_filter_forum.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/ui/core/shared/forum/forum_card.dart';
import '../../../../API/forum_api.dart';
import '../../../core/shared/export.dart';

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
