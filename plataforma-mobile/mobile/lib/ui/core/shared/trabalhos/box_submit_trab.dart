// ignore_for_file: use_build_context_synchronously

import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:mobile/API/entrega_trabalhos_api.dart';
import 'package:mobile/provider/auth_provider.dart';
import 'package:provider/provider.dart';

import '../export.dart';

class BoxSubmitTrab extends StatefulWidget {
  const BoxSubmitTrab({super.key, required this.idCurso, required this.idTrabalho});

  final int idCurso;
  final int idTrabalho;

  @override
  State<BoxSubmitTrab> createState() => _BoxSubmitTrabState();
}

class _BoxSubmitTrabState extends State<BoxSubmitTrab> {
  final EntregaTrabalhosApi _entregaTrabalhosApi = EntregaTrabalhosApi();
  PlatformFile? file;
  bool isLoading = false;
  bool isLoadingTrabalhos = true;
  int? idUser;
  Map<String, dynamic>? entregue;
  bool setEntregue = false;
  String? nomeTrabaho;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final userId = Provider.of<AuthProvider>(context, listen: false).user?.id;
      if (userId != null) {
        print('ID do utilizador: $userId');
        setState(() {
          idUser = int.parse(userId);
        });
        fetchTrabalhoEntregue();
      }
    });
  }

  Future<void> fetchTrabalhoEntregue() async {
    try {
      final estaEntrega = await _entregaTrabalhosApi.getEntregaTrabalho( widget.idTrabalho, idUser!);
      String url = estaEntrega['data']?['caminho_et'];
      String nomeFicheiro = url.split('/').last;
      setState(() {
        entregue = estaEntrega;
        setEntregue = entregue?['jaEntregou'];
        nomeTrabaho = nomeFicheiro;
        file = null;
        isLoadingTrabalhos = false;
      });
    } catch (e) {
      setState(() {
        isLoadingTrabalhos = false;
        setEntregue = false;
      });
      print('Ainda nao houve entrega para este curso');
    }
  }

  void selectFile() async {
    setState(() {
      isLoading = true;
    });
    final result = await FilePicker.platform.pickFiles(allowMultiple: false, withData: false,);
    if(result != null && result.files.isNotEmpty) {
      setState(() {
        file = result.files.first;
      });
      await Future.delayed(Duration(seconds: 2));
      setState(() {
        isLoading = false;
      });
    } else {
      setState(() {
        isLoading = false;
      });
    }
  }

  void removeFile() {
    setState(() {
      file = null;
    });
  }

  String formatBytes(int bytes) {
    if (bytes > 1024 * 1024) {
      return '${(bytes / (1024 * 1024)).toStringAsFixed(1)} MB';
    } else {
      return '${(bytes / 1024).toStringAsFixed(1)} KB';
    }
  }

  Future<void> criarTrabalho(File file) async {
    try {
      await _entregaTrabalhosApi.criarEntregaTrabalho(idTrabalho: widget.idTrabalho, idFormando: idUser!, ficheiro: file,);
      await fetchTrabalhoEntregue();
      if (!mounted) return;
      
      final scaffoldMessenger = ScaffoldMessenger.of(context);   
      
      scaffoldMessenger.showSnackBar(
        SnackBar(content: Text('Trabalho enviado com sucesso!')),
      );
    } catch (e) {
      print('Erro ao criar entrega de trabalho: $e');
    }
  } 

  void _handleSubmit() async {
    if (file != null && file!.path != null) {
      final pickedFile = File(file!.path!);
      await criarTrabalho(pickedFile);
    }
  }

  void _handleDelete() async {
    try{
      await _entregaTrabalhosApi.deleteEntregaTrabalho(idTrabalho: widget.idTrabalho, idFormando: idUser!);
      setState(() {
        isLoadingTrabalhos = true;
      });
      await fetchTrabalhoEntregue();
      if (!mounted) return;
      
      final scaffoldMessenger = ScaffoldMessenger.of(context);   
      
      scaffoldMessenger.showSnackBar(
        SnackBar(content: Text('Entrega cancelada com sucesso!')),
      );
    } catch (e) {
      print('Erro ao eliminar entrega de trabalho: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    if (isLoadingTrabalhos) {
      return Padding(
        padding: EdgeInsets.all(8),
        child: Center(child: CircularProgressIndicator()),
      );
    }
    return Column(
      children: [
        if (setEntregue == false) ...[
          if (file == null) ... [
            GestureDetector(
              onTap: selectFile,
              child: Container(
                width: double.infinity,
                height: 120,
                margin: EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                decoration: BoxDecoration(
                  color: Colors.grey[100],
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: Colors.grey,
                    width: 1,
                  )
                ),
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.upload_file_outlined),
                      SizedBox(height: 10,),
                      Text('Insira o seu trabalho'),
                    ],
                  ),
                ),
              ),
            ),
          ] else ...[
            Container(
              margin: EdgeInsets.symmetric(vertical: 10, horizontal: 10),
              padding: EdgeInsets.symmetric(horizontal: 10, vertical: 15),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: Colors.grey[300]!),
              ),
              child: Row(
                children: [
                  Icon(Icons.insert_drive_file_outlined),
                  SizedBox(width: 20,),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(file!.name, maxLines: 1, overflow: TextOverflow.ellipsis,),
                        Text(formatBytes(file!.size), style: TextStyle(fontSize: 12, color: Colors.grey)),
                      ],
                    )
                  ),
                  isLoading 
                  ? SizedBox(
                    width: 20,
                    height: 20,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  )
                  :  Icon(
                    (file!.size > 100 * 1024 * 1024) ? Icons.error : Icons.check_circle,
                    color: (file!.size > 100 * 1024 * 1024) ? Colors.red : Colors.green,
                  ),
                  SizedBox(width: 8),
                  GestureDetector(
                    onTap: removeFile,
                    child: Icon(Icons.close_rounded),
                  ),
                ],
              ),
            ),
            if (file!.size > 100 * 1024 * 1024) 
            Padding(
              padding: EdgeInsets.only(right: 20, left: 20, bottom: 15),
              child:Text('Ficheiro demasiado grande', style: TextStyle(color: Colors.red), ),
            ),
          ],
          //botao  
          if (file !=null)
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 10),
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20),
                ),
                fixedSize: Size(screenWidth - 10, 46),
              ),
              onPressed: file!.size > 100 * 1024 * 1024 ? null : () {
                _handleSubmit();
              }, 
              child: Text('Entregar', style: TextStyle(color: Colors.white),),
            ),
          ),
        ] else if (setEntregue == true) ...[
          Container(
            margin: EdgeInsets.symmetric(vertical: 10, horizontal: 10),
            padding: EdgeInsets.symmetric(horizontal: 10, vertical: 15),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: Colors.grey[300]!),
            ),
            child: Row(
              children: [
                Icon(Icons.insert_drive_file_outlined),
                SizedBox(width: 20,),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('nomeTrabaho'),
                    ],
                  )
                ),
                SizedBox(width: 8),
                GestureDetector(
                  onTap: () {
                    _handleDelete();
                  },
                  child: Icon(Icons.delete),
                ),
              ],
            ),
          ),
        ],        
      ],
    );
  }
}