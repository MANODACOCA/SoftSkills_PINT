import '../../core/shared/export.dart';
//import 'package:gender_picker/source/enums.dart';
import 'package:go_router/go_router.dart';
import '../../core/shared/navigationbar_component.dart';
import 'package:country_picker/country_picker.dart';

class SeeInfoProfile extends StatefulWidget {
  const SeeInfoProfile({super.key});

  @override
  State<SeeInfoProfile> createState() => _SeeInfoProfileState();
}

class _SeeInfoProfileState extends State<SeeInfoProfile> {
  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            context.go('/profile');
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
                        style: TextStyle(color: Colors.grey),
                        textAlign: TextAlign.left,
                      ),
                    ),
                    SizedBox(height: 8),
                    Padding(
                      padding: EdgeInsets.only(right: 40),
                      child: Column(
                        children: [
                          Row(
                            children: <Widget>[
                              SizedBox(
                                child: Row(
                                  children: [
                                    Icon(Icons.lock),
                                    SizedBox(width: 10),
                                    Text('Alterar Password'),
                                  ],
                                ),
                              ),
                            ],
                          ),
                          Row(),
                          Row(),
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
