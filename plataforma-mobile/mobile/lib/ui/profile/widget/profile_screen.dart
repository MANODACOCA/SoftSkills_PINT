// ignore_for_file: prefer_typing_uninitialized_variables

import '../../core/shared/export.dart';
import 'package:go_router/go_router.dart';
import '../../core/shared/navigationbar_component.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../API/utilizadores_api.dart';

class Profile extends StatefulWidget {
  const Profile({super.key, this.idUser});

  final String? idUser;

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  final UtilizadoresApi api = UtilizadoresApi();
  late Future<Map<String, dynamic>> userInfo;

  @override
  void initState() {
    super.initState();
    userInfo = api.getUtilizador(widget.idUser!);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        /* leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          color: Colors.white,
          onPressed: () async {
            context.pop(); // Return to the previous screen no matter the route or the screen we were before
          },
        ), */
        title: Text("Perfil", style: TextStyle(color: Colors.white)),
        centerTitle: true,
        backgroundColor: AppColors.primary,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(2),
          child: Column(
            children: [
              SizedBox(height: 25),
              SizedBox(
                width: double.infinity,
                height: 170,
                child: FutureBuilder<Map<String, dynamic>>(
                  future: userInfo,
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return Center(child: CircularProgressIndicator());
                    } else if (snapshot.hasError) {
                      return Center(child: Text('Erro ao carregar dados'));
                    } else if (!snapshot.hasData || snapshot.data == null) {
                      return Center(child: Text('Sem dados do utilizador'));
                    }
                    final data = snapshot.data!;
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Container(
                          width: 100,
                          height: 100,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            image: DecorationImage(
                              image: AssetImage('${data['img_perfil']}'),
                              fit: BoxFit.cover,
                            ),
                          ),
                        ),
                        SizedBox(height: 10),
                        Text(
                          "${data['nome_utilizador']}",
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: Colors.black,
                          ),
                        ),
                        Text(
                          "${data['email']}",
                          style: TextStyle(fontSize: 13, color: Colors.grey),
                        ),
                      ],
                    );
                  },
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
                    SizedBox(
                      child: Row(
                        children: <Widget>[
                          SizedBox(width: 18),
                          Icon(
                            Icons.person,
                            color: const Color.fromARGB(255, 88, 85, 85),
                          ),
                          SizedBox(width: 5),
                          Text('Alteração de dados pessoais'),
                          Spacer(),
                          IconButton(
                            onPressed: () {
                              context.go('/alterarInformacoes');
                            },
                            icon: Icon(Icons.arrow_forward_ios, size: 15),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(
                      child: Row(
                        children: <Widget>[
                          SizedBox(width: 18),
                          Icon(
                            Icons.key,
                            color: const Color.fromARGB(255, 88, 85, 85),
                          ),
                          SizedBox(width: 5),
                          Text('Informações de login'),
                          Spacer(),
                          IconButton(
                            onPressed: () {
                              context.go('/seeinfoprofile');
                            },
                            icon: Icon(Icons.arrow_forward_ios, size: 15),
                          ),
                        ],
                      ),
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
                    SizedBox(
                      child: Row(
                        children: <Widget>[
                          SizedBox(width: 18),
                          Icon(
                            Icons.computer,
                            color: const Color.fromARGB(255, 88, 85, 85),
                          ),
                          SizedBox(width: 5),
                          Text('Cursos inscritos'),
                          Spacer(),
                          IconButton(
                            onPressed: () {
                              context.go('/coursejoined');
                            },
                            icon: Icon(Icons.arrow_forward_ios, size: 15),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(
                      child: Row(
                        children: <Widget>[
                          SizedBox(width: 18),
                          Icon(
                            Icons.flag_outlined,
                            color: const Color.fromARGB(255, 88, 85, 85),
                          ),
                          SizedBox(width: 5),
                          Text('Cursos terminados'),
                          Spacer(),
                          IconButton(
                            onPressed: () {
                              context.push('/endedcourses');
                            },
                            icon: Icon(Icons.arrow_forward_ios, size: 15),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(
                      child: Row(
                        children: <Widget>[
                          SizedBox(width: 18),
                          Icon(
                            Icons.favorite,
                            color: const Color.fromARGB(255, 88, 85, 85),
                          ),
                          SizedBox(width: 5),
                          Text('Cursos que gostaste'),
                          Spacer(),
                          IconButton(
                            onPressed: () {
                              context.push('/likedcourses');
                            },
                            icon: Icon(Icons.arrow_forward_ios, size: 15),
                          ),
                        ],
                      ),
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
                    Row(
                      children: <Widget>[
                        SizedBox(width: 10),
                        Text(
                          'PREFERÊNCIAS',
                          style: TextStyle(
                            color: Color.fromRGBO(121, 112, 133, 1),
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 12),
                    SizedBox(
                      child: Row(
                        children: <Widget>[
                          SizedBox(width: 18),
                          Icon(
                            Icons.notifications,
                            color: const Color.fromARGB(255, 88, 85, 85),
                          ),
                          SizedBox(width: 5),
                          Text('Notificações'),
                          Spacer(),
                          IconButton(
                            onPressed: () {
                              context.push('/gerirnotification');
                            },
                            icon: Icon(Icons.arrow_forward_ios, size: 15),
                          ),
                        ],
                      ),
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
                    Row(
                      children: <Widget>[
                        SizedBox(width: 18),
                        Icon(
                          Icons.contact_support,
                          color: const Color.fromARGB(255, 88, 85, 85),
                        ),
                        SizedBox(width: 5),
                        Text('Central de suporte'),
                        Spacer(),
                        IconButton(
                          onPressed: () {
                            context.push('/support');
                          },
                          icon: Icon(Icons.arrow_forward_ios, size: 15),
                        ),
                      ],
                    ),
                    SizedBox(height: 2),
                    Row(
                      children: <Widget>[
                        SizedBox(width: 18),
                        Icon(
                          Icons.privacy_tip_outlined,
                          color: const Color.fromARGB(255, 88, 85, 85),
                        ),
                        SizedBox(width: 5),
                        Text('Politica de privacidade'),
                        Spacer(),
                        IconButton(
                          onPressed: () {
                            context.push('/privacypolitics');
                          },
                          icon: Icon(Icons.arrow_forward_ios, size: 15),
                        ),
                      ],
                    ),
                    SizedBox(height: 2),
                    Row(
                      children: <Widget>[
                        SizedBox(width: 18),
                        Icon(Icons.logout, color: Colors.red),
                        SizedBox(width: 5),
                        Text(
                          'Encerrar sessão',
                          style: TextStyle(color: Colors.red),
                        ),
                        Spacer(),
                        IconButton(
                          onPressed: () async {
                            final prefs = await SharedPreferences.getInstance();
                            await prefs.setBool('remember_me', false);
                            confirm();
                          },
                          icon: Icon(Icons.arrow_forward_ios, size: 15),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: Footer(idUser: widget.idUser),
    );
  }

  confirm() {
    return showDialog(
      context: context,
      builder: (context) {
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
              onPressed: () {
                context.go('/');
                // ignore: avoid_print
                print('LogOut!');
              },
            ),
            TextButton(
              style: TextButton.styleFrom(backgroundColor: AppColors.primary),
              child: Text('Cancelar', style: TextStyle(color: Colors.white)),
              onPressed: () {
                context.pop(); // Close the dialog
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
