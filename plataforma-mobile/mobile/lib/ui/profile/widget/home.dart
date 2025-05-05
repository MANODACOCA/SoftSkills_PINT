import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/ui/core/themes/colors.dart';
import '../../core/shared/navigationbar_component.dart';

//None of the buttons have a fuction, and i need to insert a right arrow

class Profile extends StatefulWidget {
  const Profile({super.key});

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          color: Colors.white,
          onPressed: () async {
            context.pop(); // Return to the previous screen no matter the route or the screen we were before
          },
        ),
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
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Container(
                      width: 100,
                      height: 100,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        image: DecorationImage(
                          image: AssetImage('assets/logo-softinsa.png'),
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                    SizedBox(height: 10),
                    Text(
                      "Nome do Utilizador",
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                    ),
                    Text(
                      "Emai do Utilizador",
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
                      ],
                    ),
                    SizedBox(height: 2),
                    Row(
                      children: <Widget>[
                        SizedBox(width: 18),
                        Icon(Icons.logout, color: Colors.red),
                        SizedBox(width: 5),
                        Text('Encerrar sessão'),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
