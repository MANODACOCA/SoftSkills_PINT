// ignore_for_file: use_build_context_synchronously
//import 'dart:io';
//import 'package:http/http.dart' as http;
import 'package:mobile/API/utilizadores_api.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:provider/provider.dart';
import '../../core/shared/export.dart';
//import 'package:gender_picker/source/enums.dart';
import 'package:go_router/go_router.dart';
import '../../core/shared/base_comp/navigationbar_component.dart';
import 'package:country_picker/country_picker.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';

class ChangePersonalInfo extends StatefulWidget {
  const ChangePersonalInfo({super.key});

  @override
  State<ChangePersonalInfo> createState() => _ChangePersonalInfoState();
}

class _ChangePersonalInfoState extends State<ChangePersonalInfo> {
  Map<String, dynamic> utilizador = {};
  final UtilizadoresApi _api = UtilizadoresApi();
  late final String userIdd;
  final TextEditingController _nomeController = TextEditingController();
  final TextEditingController _telemovelController = TextEditingController();
  final TextEditingController _moradaController = TextEditingController();
  final TextEditingController _dataNascController = TextEditingController();
  String? _selectedPais;
  String? _selectedGenero;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final id = Provider.of<AuthProvider>(context, listen: false).user?.id;
      if (id != null) {
        userIdd = id;
        print('ID do utilizador: $id');
        fetchUtilizador(int.parse(id));
      }
    });
  }

  Future<void> fetchUtilizador(int idUtilizador) async {
    try {
      final esteUtilizador = await _api.getUtilizador(idUtilizador);
      setState(() {
        utilizador = esteUtilizador;
        _nomeController.text = esteUtilizador['nome_utilizador'] ?? '';
        _telemovelController.text = esteUtilizador['telemovel']?.toString() ?? '';
        _moradaController.text = esteUtilizador['morada'] ?? '';
        _dataNascController.text = esteUtilizador['data_nasc'] ?? '';
        _selectedPais = esteUtilizador['pais']?.toString();
        _selectedGenero = (esteUtilizador['genero'] == 1) ? 'Masculino' : 'Feminino';
      });
    } catch (e) {
      print('Erro ao buscar o curso: , $e');
    }
  }

  Future<void> _enviar(ImageSource source) async {
    try{
      final res = await _api.alterarImgPerfil(userIdd, source);
      //await fetchUtilizador(int.parse(userIdd));
      setState(() {
        utilizador['img_perfil'] = res['img_perfil'];
      });
    } catch(e) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Falha ao enviar imagem')),
      );
    } 
  }

  void choosePhoto() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Escolher foto'),
        content: const Text('Seleciona a origem da imagem'),
        actions: [
          TextButton(
            style: TextButton.styleFrom(backgroundColor: Colors.green),
            child: const Text('Galeria', style: TextStyle(color: Colors.white)),
            onPressed: () {
              context.pop();
              Future.microtask(() => _enviar(ImageSource.gallery));
            },
          ),
          TextButton(
            style: TextButton.styleFrom(backgroundColor: Colors.red),
            child: const Text('Câmara', style: TextStyle(color: Colors.white)),
            onPressed: () {
              context.pop();
              Future.microtask(() => _enviar(ImageSource.camera));
            },
          ),
        ],
      ),
    );
  }

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
            context.go('/profile');
          },
        ),
        title: Text("Perfil", style: TextStyle(color: Colors.white)),
        centerTitle: true,
        backgroundColor: AppColors.primary,
      ),
      body: GestureDetector(
        onTap: () {
          FocusScope.of(context).unfocus();
        },
        child: SingleChildScrollView(
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
                          image: NetworkImage(
                            (utilizador['img_perfil'] != null &&
                                    utilizador['img_perfil']
                                        .toString()
                                        .isNotEmpty)
                                ? 'https://softskills-api.onrender.com/${utilizador['img_perfil']}'
                                : 'https://ui-avatars.com/api/?name=${Uri.encodeComponent(utilizador['nome_utilizador'] ?? 'User')}&background=random&bold=true',
                          ),
                          fit: BoxFit.cover,
                        ),
                      ),
                      child:
                          (utilizador['img_perfil'] == null ||
                                  utilizador['img_perfil'].toString().isEmpty)
                              ? null
                              : ClipOval(
                                child: Image.network(
                                  'https://softskills-api.onrender.com/${utilizador['img_perfil']}',
                                  width: 100,
                                  height: 100,
                                  fit: BoxFit.cover,
                                  errorBuilder: (context, error, stackTrace) {
                                    final fallbackImg =
                                        'https://ui-avatars.com/api/?name=${Uri.encodeComponent(utilizador['nome_utilizador'])}&background=random&bold=true';
                                    return Image.network(
                                      fallbackImg,
                                      width: 100,
                                      height: 100,
                                      fit: BoxFit.cover,
                                    );
                                  },
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
                              controller: _nomeController,
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
                        controller: _telemovelController,
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
                        controller: _dataNascController,
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
                        controller: _moradaController,
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
                                                  setState(() {
                                                    _selectedPais = country.displayNameNoCountryCode;
                                                  });
                                                  // ignore: avoid_print
                                                  print(
                                                    'Selected country: ${country.flagEmoji} ${country.displayName}',
                                                  );
                                                },
                                              );
                                            },
                                            child: Text(
                                              _selectedPais ?? 'Selecionar país',
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
                                                      setState(() {
                                                        _selectedGenero = 'Masculino';
                                                      });
                                                      context.pop();
                                                    },
                                                  ),
                                                  ListTile(
                                                    leading: Icon(Icons.female),
                                                    title: Text('Feminino'),
                                                    onTap: () {
                                                      setState(() {
                                                        _selectedGenero = 'Feminino';
                                                      });
                                                      context.pop();
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
                                            _selectedGenero ?? 'Selecionar género',
                                            style: TextStyle(
                                              color: Colors.black,
                                            ),
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
      ),
      bottomNavigationBar: Footer(),
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
                onPressed: () async {
                  try {
                    final body = {
                      'nome_utilizador': _nomeController.text,
                      'telemovel': int.tryParse(_telemovelController.text),
                      'morada': _moradaController.text,
                    };

                    if (_dataNascController.text.isNotEmpty) {
                      try {
                        final nasc = DateFormat('dd/MM/yyyy')
                            .parseStrict(_dataNascController.text);
                        body['data_nasc'] = DateFormat('yyyy-MM-dd').format(nasc);
                      } catch (_) {
                        //
                      }
                    }
                    if (_selectedGenero != null) {
                      body['genero'] = _selectedGenero == 'Masculino' ? 1 : 2;
                    }
                    if (_selectedPais != null) {
                      body['pais'] = _selectedPais; 
                    }

                  body.removeWhere((k, v) => v == null || (v is String && v.isEmpty));

                  await _api.updateUtilizador(userIdd, body);
              
                  await showDialog(
                    context: context, barrierDismissible: false,
                    builder: (diagolCtx) {
                      Future.delayed(Duration(seconds: 1), () {
                        Navigator.of(diagolCtx).pop();
                      });
                     return AlertDialog(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16),
                      ),
                      contentPadding: const EdgeInsets.all(24),
                      content: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: const [
                          Icon(Icons.check_circle,
                            color:Colors.green, size: 72),
                          SizedBox(height: 16),
                          Text(
                            'Dados atualizados com sucesso!',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              fontSize: 18, fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                );
                  context.go('/profile');
                } catch (e) {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Erro ao atualizar dados'),
                    backgroundColor: Colors.red,),
                  );
                }
              },
            ),
            TextButton(
              style: TextButton.styleFrom(backgroundColor: Colors.red),
              child: Text('Não', style: TextStyle(color: Colors.white)),
              onPressed: () {
                context.pop(); 
              },
            ),
          ],
        );
      },
    );
  }
}
