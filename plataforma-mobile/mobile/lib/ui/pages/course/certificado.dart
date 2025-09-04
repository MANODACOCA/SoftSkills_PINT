import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:mobile/ui/core/shared/base_comp/app_bar_arrow.dart';
import '../../core/shared/export.dart';
import '../../../API/certificado_api.dart';

class CertificadoPage extends StatelessWidget {
  final int cursoId;
  final int formandoId;

  const CertificadoPage({
    super.key,
    required this.cursoId,
    required this.formandoId,
  });

  Future<void> _abrirNoNavegador(BuildContext context) async {
    final uri = CertificadoApi().buildUri(cursoId, formandoId);

    final ok = await launchUrl(
      uri,
      mode: LaunchMode.externalApplication, // abre no browser
    );

    if (!ok && context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Não foi possível abrir o certificado')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBarArrow(
        title: 'Certificado',
        onBack: () {
          if (Navigator.of(context).canPop()) context.pop();
          else context.go('/cursos-completed'); // fallback
        },
      ),
      body: Center(
        child: FilledButton.icon(
          onPressed: () => _abrirNoNavegador(context),
          icon: const Icon(Icons.open_in_new),
          label: const Text('Abrir no navegador'),
        ),
      ),
      bottomNavigationBar: const Footer(),
    );
  }
}
