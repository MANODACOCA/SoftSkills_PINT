import 'package:youtube_player_flutter/youtube_player_flutter.dart';
import '../export.dart';

class AulaVideoPlayer extends StatefulWidget {
  final String videoUrl;

  const AulaVideoPlayer({super.key, required this.videoUrl});

  @override
  State<AulaVideoPlayer> createState() => _AulaVideoPlayerState();
}

class _AulaVideoPlayerState extends State<AulaVideoPlayer> {
  late YoutubePlayerController _controller;

  @override
  void initState() {
    super.initState();
    final videoId = YoutubePlayer.convertUrlToId(widget.videoUrl);
    _controller = YoutubePlayerController(
      initialVideoId: videoId ?? '',
      flags: const YoutubePlayerFlags(
        autoPlay: false,
        mute: false,
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return YoutubePlayer(
      controller: _controller,
      showVideoProgressIndicator: true,
    );
  }
}
