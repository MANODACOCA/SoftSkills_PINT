// ignore_for_file: unnecessary_string_interpolations, unnecessary_brace_in_string_interps

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/ui/core/shared/navigationbar_component.dart';
import 'package:mobile/ui/core/themes/colors.dart';
import '../../../API/two_fa.dart';

class TwoFactorActivate extends StatefulWidget {
  const TwoFactorActivate({super.key, this.idUser});

  final String? idUser;

  @override
  State<TwoFactorActivate> createState() => _TwoFactorActivate();
}

class _TwoFactorActivate extends State<TwoFactorActivate> {
  final api = TwofaApi();
  late bool _isTwoFactorEnabled;

  @override
  void initState() {
    super.initState();
    _initializeTwoFactor();
  }

  Future<void> _initializeTwoFactor() async {
    if (widget.idUser == null) return;
    final result = await api.getTwofa(widget.idUser!);
    setState(() {
      _isTwoFactorEnabled = result as bool;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Autenticação de Dois Fatores',
          style: TextStyle(color: Colors.white, fontSize: 18),
        ),
        backgroundColor: AppColors.primary,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          color: Colors.white,
          onPressed: () {
            context.push('/seeinfoprofile', extra: widget.idUser);
          },
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
              Row(
                children: <Widget>[
                  Text(
                    'Ativar autenticação de dois fatores',
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                    ),
                  ),
                  Spacer(),
                  Switch(
                    activeTrackColor: AppColors.primary,
                    value: _isTwoFactorEnabled,
                    onChanged: (value) async {
                      setState(() {
                        _isTwoFactorEnabled = !_isTwoFactorEnabled;
                      });
                      if (_isTwoFactorEnabled) {
                        if(widget.idUser != null){
                          await api.updateTwofa(widget.idUser!, {
                          'auten2fat': true,
                        });
                      } else {
                        print('Ocorreu um erro na atualizar o TWO_FA.');
                          return;
                        }
                      }else{
                        if(widget.idUser != null){
                          await api.updateTwofa(widget.idUser!, {
                          'auten2fat': false,
                        });
                      } else {
                        print('Ocorreu um erro na atualizar o TWO_FA.');
                          return;
                        }
                      }
                    },
                    activeColor: Colors.blue,
                  ),
                ],
              ),
              SizedBox(height: 10),
              Text(
                'A autenticação em dois fatores (2FA) é uma camada extra de segurança: primeiro, introduz a palavra-passe no login e, em seguida, confirma a identidade com um código enviado para o seu email.',
                style: TextStyle(color: Colors.black, fontSize: 13),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
