import 'package:flutter/material.dart';
import 'offline_banner.dart';

class AppScaffold extends StatelessWidget {
  final PreferredSizeWidget? appBar;
  final Widget body;
  final Widget? bottomNavigationBar;
  final Color? backgroundColor;

  const AppScaffold({
    super.key,
    this.appBar,
    required this.body,
    this.bottomNavigationBar,
    this.backgroundColor,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar,
      backgroundColor: backgroundColor,
      body: SafeArea(
        child: LayoutBuilder(
          builder: (context, constraints) {
            return Column(
              children: [
                const OfflineBannerGlobal(),
                Expanded(
                  child: SizedBox(
                    width: double.infinity,
                    height: constraints.maxHeight,
                    child: body,
                  ),
                ),
              ],
            );
          },
        ),
      ),
      bottomNavigationBar: bottomNavigationBar,
    );
  }
}
