// ignore_for_file: use_build_context_synchronously
import 'package:mobile/API/utilizadores_api.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:provider/provider.dart';
import '../../core/shared/export.dart';
import 'package:go_router/go_router.dart';
import 'package:country_picker/country_picker.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import 'package:dropdown_search/dropdown_search.dart';
import '../../core/shared/popup_check_generico/custom_dialogs.dart';

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
    final screenWidth = MediaQuery.of(context).size.width;
    final double fieldWidth = 400;
    final double fieldHeight = 40;
    final double buttonWidth = 268;
    final double buttonHeight = 40;
    final double borderRadius = 20;
    return AppScaffold(
      appBar: AppBar(
        title: Text('Alterar Dados Pessoais', style: TextStyle(color: Colors.white)),
        centerTitle: true,
        backgroundColor: AppColors.primary,
      ),
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
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
                                  width: fieldWidth,
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
                                  width: fieldWidth,
                                  height: fieldHeight,
                                  child: TextField(
                                    controller: _nomeController,
                                    decoration: InputDecoration(
                                      labelText: 'Nome do user',
                                      border: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(borderRadius),
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
                            width: fieldWidth,
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
                            width: fieldWidth,
                            height: fieldHeight,
                            child: TextField(
                              controller: _telemovelController,
                              decoration: InputDecoration(
                                labelText: '+351',
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(borderRadius),
                                  borderSide: BorderSide(color: Colors.black),
                                ),
                              ),
                            ),
                          ),
                          SizedBox(height: 12),
                          SizedBox(
                            width: fieldWidth,
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
                            width: fieldWidth,
                            height: fieldHeight,
                            child: TextField(
                              controller: _dataNascController,
                              decoration: InputDecoration(
                                labelText: 'dd/mm/aaaa',
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(borderRadius),
                                  borderSide: BorderSide(color: Colors.black),
                                ),
                              ),
                            ),
                          ),
                          SizedBox(height: 12),
                          SizedBox(
                            width: fieldWidth,
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
                            width: fieldWidth,
                            height: fieldHeight,
                            child: TextField(
                              controller: _moradaController,
                              decoration: InputDecoration(
                                labelText: 'Rua, nº, andar, código postal',
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(borderRadius),
                                  borderSide: BorderSide(color: Colors.black),
                                ),
                              ),
                            ),
                          ),
                          SizedBox(height: 12),
                          // País
                          SizedBox(
                            width: fieldWidth,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
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
                                  height: fieldHeight,
                                  child: DropdownSearch<String>(
                                    items: CountryService().getAll().map((c) => c.displayNameNoCountryCode).toList(),
                                    selectedItem: _selectedPais,
                                    dropdownDecoratorProps: DropDownDecoratorProps(
                                      dropdownSearchDecoration: InputDecoration(
                                        contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 0),
                                        border: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(borderRadius),
                                          borderSide: BorderSide(color: Colors.black),
                                        ),
                                      ),
                                    ),
                                    popupProps: PopupProps.menu(
                                      showSearchBox: true,
                                      fit: FlexFit.loose,
                                      constraints: BoxConstraints(
                                        minWidth: fieldWidth,
                                        maxWidth: fieldWidth,
                                      ),
                                      menuProps: MenuProps(
                                        borderRadius: BorderRadius.circular(borderRadius),
                                      ),
                                      searchFieldProps: TextFieldProps(
                                        decoration: InputDecoration(
                                          hintText: 'Pesquisar país',
                                          contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 8), // aumenta altura visual
                                          border: OutlineInputBorder(
                                            borderRadius: BorderRadius.circular(borderRadius),
                                          ),
                                        ),
                                        style: TextStyle(fontSize: 16),
                                      ),
                                    ),
                                    onChanged: (String? value) {
                                      setState(() {
                                        _selectedPais = value;
                                      });
                                    },
                                    dropdownButtonProps: DropdownButtonProps(
                                      icon: Icon(Icons.arrow_drop_down),
                                    ),
                                    dropdownBuilder: (context, selectedItem) {
                                      return Container(
                                        height: fieldHeight,
                                        alignment: Alignment.centerLeft,
                                        decoration: BoxDecoration(
                                          borderRadius: BorderRadius.circular(borderRadius),
                                        ),
                                        child: Text(selectedItem ?? 'Selecionar país'),
                                      );
                                    },
                                  ),
                                ),
                              ],
                            ),
                          ),
                          SizedBox(height: 12),
                          // Género
                          SizedBox(
                            width: fieldWidth,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
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
                                SizedBox(
                                  height: fieldHeight,
                                  child: DropdownSearch<String>(
                                    items: ['Masculino', 'Feminino'],
                                    selectedItem: _selectedGenero,
                                    dropdownDecoratorProps: DropDownDecoratorProps(
                                      dropdownSearchDecoration: InputDecoration(
                                        contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 0),
                                        border: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(borderRadius),
                                          borderSide: BorderSide(color: Colors.black),
                                        ),
                                      ),
                                    ),
                                    popupProps: PopupProps.menu(
                                      fit: FlexFit.loose,
                                      constraints: BoxConstraints(
                                        minWidth: fieldWidth,
                                        maxWidth: fieldWidth,
                                      ),
                                      menuProps: MenuProps(
                                        borderRadius: BorderRadius.circular(borderRadius),
                                      ),
                                    ),
                                    onChanged: (String? value) {
                                      setState(() {
                                        _selectedGenero = value;
                                      });
                                    },
                                    dropdownButtonProps: DropdownButtonProps(
                                      icon: Icon(Icons.arrow_drop_down),
                                    ),
                                    dropdownBuilder: (context, selectedItem) {
                                      return Container(
                                        height: fieldHeight,
                                        alignment: Alignment.centerLeft,
                                        decoration: BoxDecoration(
                                          borderRadius: BorderRadius.circular(borderRadius),
                                        ),
                                        child: Text(selectedItem ?? 'Selecionar género'),
                                      );
                                    },
                                  ),
                                ),
                              ],
                            ),
                          ),
                          SizedBox(height: 25),
                          SizedBox(
                            width: fieldWidth,
                            height: buttonHeight,
                            child: ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: AppColors.primary,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(borderRadius),
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
            ),
          ),
        ],
      ),
      bottomNavigationBar: Footer(),
    );
  }

  Future<void> confirm() async {
    final confirmed = await showConfirmDialog(
      context: context,
      title: 'Aviso',
      content: 'Quer guardar as alterações?',
      confirmText: 'Sim',
      cancelText: 'Não',
    );
    if (confirmed == true) {
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
          } catch (_) {}
        }
        if (_selectedGenero != null) {
          body['genero'] = _selectedGenero == 'Masculino' ? 1 : 2;
        }
        if (_selectedPais != null) {
          body['pais'] = _selectedPais;
        }
        body.removeWhere((k, v) => v == null || (v is String && v.isEmpty));
        await _api.updateUtilizador(userIdd, body);
        await showSuccessDialog(
          context: context,
          message: 'Dados atualizados com sucesso!',
        );
        context.go('/profile');
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Erro ao atualizar dados'), backgroundColor: Colors.red),
        );
      }
    }
  }
}
