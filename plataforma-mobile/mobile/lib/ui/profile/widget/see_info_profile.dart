import '../../core/shared/export.dart';
//import 'package:gender_picker/source/enums.dart';
import 'package:go_router/go_router.dart';
import '../../core/shared/navigationbar_component.dart';
//import 'package:country_picker/country_picker.dart';

class SeeInfoProfile extends StatefulWidget {
  const SeeInfoProfile({super.key, this.idUser});

  final String? idUser;

  @override
  State<SeeInfoProfile> createState() => _SeeInfoProfileState();
}

class _SeeInfoProfileState extends State<SeeInfoProfile> {
  @override
  Widget build(BuildContext context) {
    //double screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            context.go('/profile', extra: widget.idUser);
          },
        ),
        title: Text(
          "Informações de login",
          style: TextStyle(color: Colors.white),
        ),
        centerTitle: true,
        backgroundColor: AppColors.primary,
      ),
      body: Center(
        child: SizedBox(
          child: Column(
            children: <Widget>[
              Padding(
                padding: EdgeInsets.all(20),
                child: Column(
                  children: [
                    SizedBox(
                      width: double.infinity,
                      child: Text(
                        'Segurança',
                        style: TextStyle(color: Colors.grey, fontSize: 20),
                        textAlign: TextAlign.left,
                      ),
                    ),
                    SizedBox(height: 8),
                    Padding(
                      padding: EdgeInsets.only(left: 0, right: 0),
                      child: Column(
                        children: [
                          Padding(
                            padding: EdgeInsets.only(left: 10, right: 0),
                            child: Column(
                              children: [
                                Row(
                                  children: [
                                    Icon(Icons.lock),
                                    SizedBox(width: 10),
                                    Text('Alterar Password'),
                                    Spacer(),
                                    IconButton(
                                      onPressed: () {
                                        context.push('/changeinfopass', extra: widget.idUser);
                                      },
                                      icon: Icon(
                                        Icons.arrow_forward_ios,
                                        size: 15,
                                      ),
                                    ),
                                  ],
                                ),
                                SizedBox(height: 15),
                                Row(
                                  children: [
                                    Icon(Icons.device_unknown),
                                    SizedBox(width: 10),
                                    Text('Autenticação de dois fatores'),
                                    Spacer(),
                                    IconButton(
                                      onPressed: () {
                                        context.push('/activateTwofa', extra: widget.idUser);
                                      },
                                      icon: Icon(
                                        Icons.arrow_forward_ios,
                                        size: 15,
                                      ),
                                    ),
                                  ],
                                ),
                                SizedBox(height: 15),
                                Row(
                                  children: [
                                    Icon(Icons.logout),
                                    SizedBox(width: 10),
                                    Text('Encerrar sessão noutro dispositivo'),
                                    Spacer(),
                                    IconButton(
                                      onPressed: () {
                                        //context.push('');
                                         // ignore: avoid_print
                                        print('Ir para todos os devices que têm ligação',);
                                      },
                                      icon: Icon(
                                        Icons.arrow_forward_ios,
                                        size: 15,
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
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
