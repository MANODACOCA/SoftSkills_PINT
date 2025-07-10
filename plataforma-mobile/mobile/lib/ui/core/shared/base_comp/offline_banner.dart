import 'package:flutter/material.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:internet_connection_checker/internet_connection_checker.dart';

class OfflineBannerGlobal extends StatefulWidget {
  const OfflineBannerGlobal({super.key});

  @override
  State<OfflineBannerGlobal> createState() => _OfflineBannerGlobalState();
}

class _OfflineBannerGlobalState extends State<OfflineBannerGlobal> {
  bool _isOffline = false;

  @override
  void initState() {
    super.initState();
    _checkInitialConnection();
    Connectivity().onConnectivityChanged.listen((_) {
      _checkInternetAccess();
    });
  }

  Future<void> _checkInitialConnection() async {
    _checkInternetAccess();
  }

  Future<void> _checkInternetAccess() async {
    final hasInternet = await InternetConnectionChecker().hasConnection;
    setState(() {
      _isOffline = !hasInternet;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (!_isOffline) return const SizedBox.shrink();
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
  }
}
