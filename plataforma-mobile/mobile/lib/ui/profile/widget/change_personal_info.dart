import '../../core/shared/export.dart';
//import 'package:gender_picker/source/enums.dart';
import 'package:go_router/go_router.dart';
import '../../core/shared/navigationbar_component.dart';
import 'package:country_picker/country_picker.dart';
import 'package:image_picker/image_picker.dart';

class ChangePersonalInfo extends StatefulWidget {
  const ChangePersonalInfo({super.key, this.idUser});

  final String? idUser;

  @override
  State<ChangePersonalInfo> createState() => _ChangePersonalInfoState();
}

class _ChangePersonalInfoState extends State<ChangePersonalInfo> {
  @override
  Widget build(BuildContext context) {
    String? selectedGender;
    double screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          color: Colors.white,
          onPressed: () {
            context.go('/profile', extra: widget.idUser);
          },
        ),
        title: Text("Perfil", style: TextStyle(color: Colors.white)),
        centerTitle: true,
        backgroundColor: AppColors.primary,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(10),
        child: Column(
          children: <Widget>[
            SizedBox(height: 20),
            SizedBox(
              width: double.infinity,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
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
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                    ),
                    onPressed: () {
                      choosePhoto();
                    },
                    child: Text(
                      'Alterar foto',
                      style: TextStyle(color: Colors.white),
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
                        SizedBox(height: 10),
                        SizedBox(
                          width: 450,
                          child: Row(
                            children: <Widget>[
                              Text(
                                'Nome',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                ),
                                textAlign: TextAlign.left,
                              ),
                            ],
                          ),
                        ),
                        SizedBox(height: 5),
                        SizedBox(
                          width: 400,
                          height: 38,
                          child: TextField(
                            decoration: InputDecoration(
                              labelText: 'Nome do user',
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(20),
                                borderSide: BorderSide(color: Colors.black),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 12),
                  SizedBox(
                    width: 450,
                    child: Row(
                      children: <Widget>[
                        Text(
                          'Telemóvel',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                          textAlign: TextAlign.left,
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 5),
                  SizedBox(
                    width: 400,
                    height: 38,
                    child: TextField(
                      decoration: InputDecoration(
                        labelText: '+351',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                          borderSide: BorderSide(color: Colors.black),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: 12),
                  SizedBox(
                    width: 450,
                    child: Row(
                      children: <Widget>[
                        Text(
                          'Data de Nascimento',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                          textAlign: TextAlign.left,
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 5),
                  SizedBox(
                    width: 400,
                    height: 38,
                    child: TextField(
                      decoration: InputDecoration(
                        labelText: 'dd/mm/aaaa',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                          borderSide: BorderSide(color: Colors.black),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: 12),
                  SizedBox(
                    width: 450,
                    child: Row(
                      children: <Widget>[
                        Text(
                          'Morada',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                          textAlign: TextAlign.left,
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: 5),
                  SizedBox(
                    width: 400,
                    height: 38,
                    child: TextField(
                      decoration: InputDecoration(
                        labelText: 'Rua, nº, andar, código postal',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                          borderSide: BorderSide(color: Colors.black),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: 12),
                  SizedBox(
                    width: screenWidth, //Entire screen width
                    child: Column(
                      children: <Widget>[
                        Center(
                          child: Row(
                            children: <Widget>[
                              SizedBox(width: 20),
                              SizedBox(
                                width: 125,
                                child: Column(
                                  children: <Widget>[
                                    Text(
                                      'País',
                                      style: TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.bold,
                                      ),
                                      textAlign: TextAlign.left,
                                    ),
                                    SizedBox(height: 5),
                                    SizedBox(
                                      child: Container(
                                        decoration: BoxDecoration(
                                          border: Border.all(
                                            color: Colors.black,
                                            width: 1,
                                          ),
                                          borderRadius: BorderRadius.circular(
                                            4,
                                          ),
                                        ),
                                        child: TextButton(
                                          onPressed: () {
                                            showCountryPicker(
                                              context: context,
                                              showPhoneCode: false,
                                              onSelect: (Country country) {
                                                // ignore: avoid_print
                                                print(
                                                  'Selected country: ${country.flagEmoji} ${country.displayName}',
                                                );
                                              },
                                            );
                                          },
                                          child: Text(
                                            'Selecionar país',
                                            style: TextStyle(
                                              color: Colors.black,
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              SizedBox(width: 10),
                              /*Gender part*/
                              SizedBox(
                                width: 150,
                                child: Column(
                                  children: <Widget>[
                                    Text(
                                      'Género',
                                      style: TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.bold,
                                      ),
                                      textAlign: TextAlign.left,
                                    ),
                                    SizedBox(height: 5),
                                    TextButton(
                                      onPressed: () {
                                        showModalBottomSheet(
                                          context: context,
                                          builder: (BuildContext context) {
                                            return ListView(
                                              children: <Widget>[
                                                ListTile(
                                                  leading: Icon(Icons.male),
                                                  title: Text('Masculino'),
                                                  onTap: () {
                                                    selectedGender =
                                                        'Masculino';
                                                    context.pop(context);
                                                  },
                                                ),
                                                ListTile(
                                                  leading: Icon(Icons.female),
                                                  title: Text('Feminino'),
                                                  onTap: () {
                                                    selectedGender = 'Feminino';
                                                    context.pop(context);
                                                  },
                                                ),
                                              ],
                                            );
                                          },
                                        );
                                        // ignore: avoid_print
                                        print(
                                          'Selected Gender: $selectedGender',
                                        );
                                      },
                                      child: Container(
                                        decoration: BoxDecoration(
                                          border: Border.all(
                                            color: Colors.black,
                                            width: 1,
                                          ),
                                          borderRadius: BorderRadius.circular(
                                            4,
                                          ),
                                        ),
                                        padding: EdgeInsets.symmetric(
                                          vertical: 15,
                                          horizontal: 4,
                                        ),
                                        child: Text(
                                          'Selecionar género',
                                          style: TextStyle(color: Colors.black),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              SizedBox(width: 20),
                            ],
                          ),
                        ),
                        SizedBox(height: 25),
                        SizedBox(
                          width: 268,
                          height: 43,
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppColors.primary,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(20),
                              ),
                            ),
                            onPressed: () {
                              confirm();
                            },
                            child: Text(
                              'Confirmar Alterações',
                              style: TextStyle(color: Colors.white),
                            ),
                          ),
                        ),
                        SizedBox(height: 20),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
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
          content: Text('Quer guardar as alterações?'),
          actions: <Widget>[
            TextButton(
              style: TextButton.styleFrom(backgroundColor: Colors.green),
              child: Text('Sim', style: TextStyle(color: Colors.white)),
              onPressed: () {
                context.go('/profile');
                // ignore: avoid_print
                print('Alterações guardadas!');
              },
            ),
            TextButton(
              style: TextButton.styleFrom(backgroundColor: Colors.red),
              child: Text('Não', style: TextStyle(color: Colors.white)),
              onPressed: () {
                context.pop(); // Close the dialog
                // ignore: avoid_print
                print('Alterações não foram guardadas!');
              },
            ),
          ],
        );
      },
    );
  }

  choosePhoto() {
    return showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Escolher foto'),
          content: Text('Escolha uma opção para a nova foto de perfil'),
          actions: <Widget>[
            TextButton(
              style: TextButton.styleFrom(backgroundColor: Colors.green),
              child: Text('Galeria', style: TextStyle(color: Colors.white)),
              onPressed: () async {
                await uploadImage();
                // ignore: use_build_context_synchronously
                context.pop();
              },
            ),
            TextButton(
              style: TextButton.styleFrom(backgroundColor: Colors.red),
              child: Text('Câmara', style: TextStyle(color: Colors.white)),
              onPressed: () async {
                await takeAPicture();
                // ignore: use_build_context_synchronously
                context.pop();
              },
            ),
          ],
        );
      },
    );
  }

  Future<void> uploadImage() async {
    final ImagePicker picker = ImagePicker();
    final XFile? image = await picker.pickImage(
      source: ImageSource.gallery,
      imageQuality: 50,
    );
    if (image != null) {
      setState(() {
        // Use the selected image
         // ignore: avoid_print
        print('Image selected: ${image.path}');
      });
    }
  }

  Future<void> takeAPicture() async {
    final ImagePicker picker = ImagePicker();
    final XFile? image = await picker.pickImage(
      source: ImageSource.camera,
      imageQuality: 50,
    );
    if (image != null) {
      setState(() {
        // Use the selected image
         // ignore: avoid_print
        print('Image selected: ${image.path}');
      });
    }
  }
}
