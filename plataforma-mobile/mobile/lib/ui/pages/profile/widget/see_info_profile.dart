import '../../../core/shared/export.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:mobile/provider/auth_provider.dart';

class SeeInfoProfile extends StatefulWidget {
  const SeeInfoProfile({super.key, this.idUser});

  final String? idUser;

  @override
  State<SeeInfoProfile> createState() => _SeeInfoProfileState();
}

class _SeeInfoProfileState extends State<SeeInfoProfile> {
  String? userId;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final authUserId = Provider.of<AuthProvider>(context, listen: false).user?.id;
      setState(() {
        userId = authUserId ?? widget.idUser;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () {
            context.go('/profile', extra: userId);
          },
        ),
        title: const Text(
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
                padding: const EdgeInsets.only(left:18),
                child: Column(
                  children: [
                    SizedBox(
                      width: double.infinity,
                      child: const Text(
                        'Segurança',
                        style: TextStyle(color: Colors.grey, fontSize: 20),
                        textAlign: TextAlign.left,
                      ),
                    ),
                    SizedBox(height: 8),
                    Padding(
                      padding: const EdgeInsets.only(left: 0, right: 0),
                      child: Column(
                        children: [
                             Column(
                              children: [
                                ListTile(
                                  contentPadding: const EdgeInsets.only(left: 18, right: 18),
                                  leading: const Icon(
                                    Icons.lock,
                                    color: Color.fromARGB(255, 88, 85, 85),
                                  ),
                                  title: const Text('Alterar Password'),
                                  trailing: const Icon(Icons.arrow_forward_ios, size: 15, color: Color.fromARGB(255, 88, 85, 85)),
                                  dense: true,
                                  onTap: () {
                                    context.push('/changeinfopass', extra: userId);
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
            ],
          ),
        ),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}
