import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../core/shared/navigationbar_component.dart';
import '../../core/shared/export.dart';

class GerirNotification extends StatefulWidget {
  const GerirNotification({super.key});

  @override
  State<GerirNotification> createState() => _GerirNotificationState();
}

class _GerirNotificationState extends State<GerirNotification> {
  bool isSwitched = false;
  bool isSwitchedVibration = false;
  bool isSwitchedSound = false;
  bool isSwitchedNotification = false;
  bool isSwitchedVibrationinscritos = false;
  bool isSwitchedSoundinscritos = false;
  bool isSwitchedNotificationinscritos = false;
  bool isSwitchedVibrationforum = false;
  bool isSwitchedSoundforum = false;
  bool isSwitchedNotificationforum = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            context.pop();
          },
        ),
        title: Text(
          "Gerir Notificações",
          style: TextStyle(color: Colors.white),
        ),
        centerTitle: true,
        backgroundColor: AppColors.primary,
      ),
      body: SingleChildScrollView(
        child: GestureDetector(
          child: Padding(
            padding: EdgeInsets.all(20),
            child: SizedBox(
              width: double.infinity,
              child: Column(
                children: <Widget>[
                  SizedBox(
                    child: Row(
                      children: [
                        Text(
                          'Ativar todas as Notificações',
                          style: TextStyle(fontSize: 17),
                        ),
                        Spacer(),
                        Switch(
                          activeColor: AppColors.primary,
                          value: isSwitched,
                          onChanged: (value) async {
                            setState(() {
                              isSwitched = value;
                              isSwitchedVibration = value;
                              isSwitchedSound = value;
                              isSwitchedNotification = value;
                              isSwitchedVibrationinscritos = value;
                              isSwitchedSoundinscritos = value;
                              isSwitchedNotificationinscritos = value;
                              isSwitchedVibrationforum = value;
                              isSwitchedSoundforum = value;
                              isSwitchedNotificationforum = value;
                              print('Switch is $isSwitched');
                            });
                          },
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 25),
                  Divider(
                    color: Colors.grey,
                    thickness: 1,
                    indent: 10,
                    endIndent: 10,
                  ),
                  SizedBox(height: 25),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text(
                        'Novos Cursos',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(height: 10),
                      Row(
                        children: [
                          Text('Notificações', style: TextStyle(fontSize: 17)),
                          Spacer(),
                          Switch(
                            value: isSwitchedNotification,
                            activeColor: AppColors.primary,
                            onChanged: (value) async {
                              setState(() {
                                isSwitchedNotification = value;
                                print('Switch is $isSwitchedNotification');
                              });
                            },
                          ),
                        ],
                      ),
                      Row(
                        children: [
                          Text('Som', style: TextStyle(fontSize: 17)),
                          Spacer(),
                          Switch(
                            activeColor: AppColors.primary,
                            value: isSwitchedSound,
                            onChanged: (value) async {
                              value:
                              isSwitchedSound;
                              setState(() {
                                isSwitchedSound = value;
                                print('Switch is $isSwitchedSound');
                              });
                            },
                          ),
                        ],
                      ),
                      Row(
                        children: [
                          Text('Vibração', style: TextStyle(fontSize: 17)),
                          Spacer(),
                          Switch(
                            value: isSwitchedVibration,
                            activeColor: AppColors.primary,
                            onChanged: (value) async {
                              value:
                              isSwitchedVibration;
                              setState(() {
                                isSwitchedVibration = value;
                                print('Switch is $isSwitchedVibration');
                              });
                            },
                          ),
                        ],
                      ),
                    ],
                  ),
                  SizedBox(height: 25),
                  Divider(
                    color: Colors.grey,
                    thickness: 1,
                    indent: 10,
                    endIndent: 10,
                  ),
                  SizedBox(height: 25),
                  Container(
                    alignment: Alignment.centerLeft,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(
                          'Cursos Inscritos',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                          textAlign: TextAlign.left,
                        ),
                        SizedBox(height: 10),
                        Row(
                          children: [
                            Text(
                              'Notificações',
                              style: TextStyle(fontSize: 17),
                            ),
                            Spacer(),
                            Switch(
                              value: isSwitchedNotificationinscritos,
                              activeColor: AppColors.primary,
                              onChanged: (value) async {
                                setState(() {
                                  isSwitchedNotificationinscritos = value;
                                  print(
                                    'Switch is $isSwitchedNotificationinscritos',
                                  );
                                });
                              },
                            ),
                          ],
                        ),
                        Row(
                          children: [
                            Text('Som', style: TextStyle(fontSize: 17)),
                            Spacer(),
                            Switch(
                              activeColor: AppColors.primary,
                              value: isSwitchedSoundinscritos,
                              onChanged: (value) async {
                                value:
                                isSwitchedSoundinscritos;
                                setState(() {
                                  isSwitchedSoundinscritos = value;
                                  print('Switch is $isSwitchedSoundinscritos');
                                });
                              },
                            ),
                          ],
                        ),
                        Row(
                          children: [
                            Text('Vibração', style: TextStyle(fontSize: 17)),
                            Spacer(),
                            Switch(
                              value: isSwitchedVibrationinscritos,
                              activeColor: AppColors.primary,
                              onChanged: (value) async {
                                value:
                                isSwitchedVibrationinscritos;
                                setState(() {
                                  isSwitchedVibrationinscritos = value;
                                  print(
                                    'Switch is $isSwitchedVibrationinscritos',
                                  );
                                });
                              },
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 25),
                  Divider(
                    color: Colors.grey,
                    thickness: 1,
                    indent: 10,
                    endIndent: 10,
                  ),
                  SizedBox(height: 25),
                  Container(
                    alignment: Alignment.centerLeft,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(
                          'Fórum',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                          textAlign: TextAlign.left,
                        ),
                        SizedBox(height: 10),
                        Row(
                          children: [
                            Text(
                              'Notificações',
                              style: TextStyle(fontSize: 17),
                            ),
                            Spacer(),
                            Switch(
                              value: isSwitchedNotificationforum,
                              activeColor: AppColors.primary,
                              onChanged: (value) async {
                                setState(() {
                                  isSwitchedNotificationforum = value;
                                  print(
                                    'Switch is $isSwitchedNotificationforum',
                                  );
                                });
                              },
                            ),
                          ],
                        ),
                        Row(
                          children: [
                            Text('Som', style: TextStyle(fontSize: 17)),
                            Spacer(),
                            Switch(
                              activeColor: AppColors.primary,
                              value: isSwitchedSoundforum,
                              onChanged: (value) async {
                                value:
                                isSwitchedSoundforum;
                                setState(() {
                                  isSwitchedSoundforum = value;
                                  print('Switch is $isSwitchedSoundforum');
                                });
                              },
                            ),
                          ],
                        ),
                        Row(
                          children: [
                            Text('Vibração', style: TextStyle(fontSize: 17)),
                            Spacer(),
                            Switch(
                              value: isSwitchedVibrationforum,
                              activeColor: AppColors.primary,
                              onChanged: (value) async {
                                value:
                                isSwitchedVibrationforum;
                                setState(() {
                                  isSwitchedVibrationforum = value;
                                  print('Switch is $isSwitchedVibrationforum');
                                });
                              },
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
        ),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
