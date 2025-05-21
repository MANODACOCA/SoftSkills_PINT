import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/ui/core/shared/navigationbar_component.dart';
import 'package:mobile/ui/core/themes/colors.dart';
import 'package:shared_preferences/shared_preferences.dart';

class TwoFactorActivate extends StatefulWidget {
  const TwoFactorActivate({super.key});

  @override
  State<TwoFactorActivate> createState() => _TwoFactorActivate();
}

class _TwoFactorActivate extends State<TwoFactorActivate> {
  bool _isTwoFactorEnabled = false;
  
  @override
  void initState() {
    super.initState();
    loadTwoFactor();
  }

  /*Falta passar a verificacao dos dois fatores para o loginpage*/

  Future<void> _saveTwoFactor(bool value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('two_factor_enabled', value);
  }

  Future<bool> loadTwoFactor() async {
    final prefs = await SharedPreferences.getInstance();
    final twoFactorEnabled = prefs.getBool('two_factor_enabled') ?? false;
    setState(() {
      _isTwoFactorEnabled = twoFactorEnabled;
    });
    return _isTwoFactorEnabled;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Autenticação de Dois Fatores',
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: AppColors.primary,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          color: Colors.white,
          onPressed: () {
            context.pop('');
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
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                    ),
                  ),
                  Spacer(),
                  Switch(
                    activeTrackColor: AppColors.primary,
                    value: _isTwoFactorEnabled,
                    onChanged: (value) {
                      setState(() {
                        _isTwoFactorEnabled = !_isTwoFactorEnabled;
                        _saveTwoFactor(_isTwoFactorEnabled);
                        print(
                          'Autenticação de dois fatores: $_isTwoFactorEnabled',
                        );
                      });
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
