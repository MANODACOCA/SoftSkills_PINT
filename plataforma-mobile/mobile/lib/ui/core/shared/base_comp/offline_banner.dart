import 'package:flutter/material.dart';
import 'package:connectivity_plus/connectivity_plus.dart';

class OfflineBannerGlobal extends StatelessWidget {
  const OfflineBannerGlobal({super.key});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<List<ConnectivityResult>>(
      stream: Connectivity().onConnectivityChanged,
      builder: (context, snapshot) {
        final offline = snapshot.hasData && snapshot.data!.contains(ConnectivityResult.none);
        if (!offline) return const SizedBox.shrink();
        return Container(
          width: double.infinity,
          color: Colors.red.shade700,
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: const Center(
            child: Text(
              'Sem ligação à internet. Está em modo offline.',
              style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
            ),
          ),
        );
      },
    );
  }
}
