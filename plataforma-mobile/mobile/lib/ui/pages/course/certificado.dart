import 'package:go_router/go_router.dart';
import 'package:mobile/ui/core/shared/base_comp/app_bar_arrow.dart';

import '../../core/shared/export.dart';

class CertificadoPage extends StatelessWidget {
  const CertificadoPage({super.key, required this.formandoId, required this.cursoId});

  final int formandoId;
  final int cursoId;

  @override
  Widget build(BuildContext context) {
    return AppScaffold(
      appBar: AppBarArrow(
        title: 'Curso', 
        onBack: () => context.go('/cursos-completed')
      ),
      body: Center(
        child: Text('Certificado curso'),
      ),
      bottomNavigationBar: Footer(),
    );
  }
}