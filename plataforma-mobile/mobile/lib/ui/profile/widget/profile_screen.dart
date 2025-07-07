// ignore_for_file: prefer_typing_uninitialized_variables
import '../../core/shared/export.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../API/utilizadores_api.dart';
import 'package:provider/provider.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:mobile/services/auth_service.dart';

class Profile extends StatefulWidget {
  const Profile({super.key});

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  Map<String, dynamic> utilizador = {};
  final UtilizadoresApi _api = UtilizadoresApi();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final userId = Provider.of<AuthProvider>(context, listen: false).user?.id;
      if (userId != null) {
        print('ID do utilizador: $userId');
        fetchUtilizador(int.parse(userId));
      }
    });
  }

  Future<void> fetchUtilizador (int idUtilizador) async {
    try{
      final esteUtilizador = await _api.getUtilizador(idUtilizador);
      setState(() {
        utilizador = esteUtilizador;
      });
    } catch(e) {
      print('Erro ao buscar o curso: , $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBar(
        title: Text("Perfil", style: TextStyle(color: Colors.white)),
        centerTitle: true,
        backgroundColor: AppColors.primary,
      ),
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(2),
                child: Column(
                  children: [
                    SizedBox(height: 25),
                    SizedBox(
                      width: double.infinity,
                      height: 170,
                      child: utilizador.isEmpty
                        ? Center(child: CircularProgressIndicator())
                        : Column(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Container(
                                width: 100,
                                height: 100,
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  border: Border.all(color: Colors.grey.shade300, width: 2),
                                ),
                                child: ClipOval(
                                  child: Image.network(
                                    (utilizador['img_perfil'] != null && utilizador['img_perfil'].toString().isNotEmpty)
                                      ? 'https://softskills-api.onrender.com/${utilizador['img_perfil']}' 
                                      : 'https://ui-avatars.com/api/?name=${Uri.encodeComponent(utilizador['nome_utilizador'])}&background=random&bold=true',
                                    fit: BoxFit.cover,
                                    errorBuilder: (context, error, stackTrace) {
                                      final fallbackImg = 'https://ui-avatars.com/api/?name=${Uri.encodeComponent(utilizador['nome_utilizador'])}&background=random&bold=true';
                                      return Image.network(
                                        fallbackImg,
                                        height: 135,
                                        width: double.infinity,
                                        fit: BoxFit.cover,
                                      );
                                    },
                                  ) 
                                ),
                              ),
                              SizedBox(height: 10),
                              Text(
                                "${utilizador['nome_utilizador']}",
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black,
                                ),
                              ),
                              Text(
                                "${utilizador['email']}",
                                style: TextStyle(fontSize: 13, color: Colors.grey),
                              ),
                            ],
                          ), 
                    ),
                    Divider(
                      color: Colors.grey,
                      thickness: 1,
                      indent: 10,
                      endIndent: 10,
                    ),
                    SizedBox(
                      child: Column(
                        children: <Widget>[
                          SizedBox(
                            width: double.infinity,
                            child: Row(
                              children: [
                                SizedBox(width: 10),
                                Text(
                                  'CONTA',
                                  style: TextStyle(
                                    color: Color.fromRGBO(121, 112, 133, 1),
                                  ),
                                  textAlign: TextAlign.left,
                                ),
                              ],
                            ),
                          ),
                          SizedBox(height: 12),
                          ListTile(
                            contentPadding: const EdgeInsets.only(left: 18, right: 18),
                            leading: const Icon(
                              Icons.person,
                              color: Color.fromARGB(255, 88, 85, 85),
                            ),
                            title: const Text('Alteração de dados pessoais'),
                            trailing: const Icon(Icons.arrow_forward_ios, size: 15),
                            dense: true,
                            onTap: () => context.go('/alterarInformacoes'),
                          ),
                          ListTile(
                            contentPadding: const EdgeInsets.only(left: 18, right: 18),
                            leading: const Icon(
                              Icons.key,
                              color: Color.fromARGB(255, 88, 85, 85),
                            ),
                            title: const Text('Informações de login'),
                            trailing: const Icon(Icons.arrow_forward_ios, size: 15),
                            dense: true,
                            onTap: () {
                              //context.go('/seeinfoprofile');
                            },
                          ),
                        ],
                      ),
                    ),
                    Divider(
                      color: Colors.grey,
                      thickness: 1,
                      indent: 10,
                      endIndent: 10,
                    ),
                    SizedBox(
                      child: Column(
                        children: <Widget>[
                          SizedBox(
                            width: double.infinity,
                            child: Row(
                              children: [
                                SizedBox(width: 10),
                                Text(
                                  'CURSOS',
                                  style: TextStyle(
                                    color: Color.fromRGBO(121, 112, 133, 1),
                                  ),
                                  textAlign: TextAlign.left,
                                ),
                              ],
                            ),
                          ),
                          SizedBox(height: 12),
                          ListTile(
                            contentPadding: const EdgeInsets.only(left: 18, right: 18),
                            leading: const Icon(
                              Icons.computer,
                              color: Color.fromARGB(255, 88, 85, 85),
                            ),
                            title: const Text('Cursos inscritos'),
                            trailing: const Icon(Icons.arrow_forward_ios, size: 15),
                            dense: true,
                            onTap: () => context.push('/list-cursos-inscrito'),
                          ),
                          ListTile(
                            contentPadding: const EdgeInsets.only(left:18, right:18),
                            leading: const Icon(
                              Icons.flag_outlined,
                              color: Color.fromARGB(255,88,85,85),
                            ),
                            title: const Text('Cursos terminados'),
                            trailing: const Icon(Icons.arrow_forward_ios, size: 15),
                            dense: true,
                            onTap: () => context.push('/cursos-completed'),
                          ),
                        ],
                      ),
                    ),
                    Divider(
                      color: Colors.grey,
                      thickness: 1,
                      indent: 10,
                      endIndent: 10,
                    ),
                    SizedBox(
                      child: Column(
                        children: [
                          ListTile(
                            contentPadding: const EdgeInsets.only(left: 18, right: 18),
                            leading: const Icon(
                              Icons.contact_support,
                              color: Color.fromARGB(255, 88, 85, 85),
                            ),
                            title: const Text('Central de suporte'),
                            trailing: const Icon(Icons.arrow_forward_ios, size: 15),
                            dense: true,
                            onTap: () => context.push('/support'),
                          ),
                          const SizedBox(height: 2),
                          ListTile(
                            contentPadding: const EdgeInsets.only(left: 18, right: 18),
                            leading: const Icon(
                              Icons.privacy_tip_outlined,
                              color: Color.fromARGB(255, 88, 85, 85),
                            ),
                            title: const Text('Política de privacidade'),
                            trailing: const Icon(Icons.arrow_forward_ios, size: 15),
                            dense: true,
                            onTap: () => context.push('/privacypolitics'),
                          ),
                          const SizedBox(height: 2),
                          ListTile(
                            contentPadding: const EdgeInsets.only(left: 18, right: 18),
                            leading: const Icon(Icons.logout, color: Colors.red),
                            title: const Text( 'Encerrar sessão',style: TextStyle(color: Colors.red),
                            ),
                            trailing: const Icon(Icons.arrow_forward_ios, size: 15),
                            dense: true,
                            onTap: () async {
                              final prefs = await SharedPreferences.getInstance();
                              await prefs.setBool('rememberMe', false);
                              confirm();   
                            },
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar: Footer(),
    );
  }

  confirm() {
    if (!mounted) return;
    return showDialog(
      context: context,
      builder: (dialogContext) {
        return AlertDialog(
          title: Text('Aviso'),
          content: Text('Quer terminar sessão na tua conta?'),
          actions: <Widget>[
            TextButton(
              style: TextButton.styleFrom(backgroundColor: Colors.red),
              child: Text(
                'Terminar sessão',
                style: TextStyle(color: Colors.white),
              ),
              onPressed: () async {
                await authService.logout();
                Provider.of<AuthProvider>(context, listen: false).logout();
                if (mounted) dialogContext.go('/login');
                // ignore: avoid_print
                print('LogOut!');
              },
            ),
            TextButton(
              style: TextButton.styleFrom(backgroundColor: AppColors.primary),
              child: Text('Cancelar', style: TextStyle(color: Colors.white)),
              onPressed: () {
                if (mounted) dialogContext.pop(); // Close the dialog
                // ignore: avoid_print
                print('Não foi dado logOut!');
              },
            ),
          ],
        );
      },
    );
  }
}
