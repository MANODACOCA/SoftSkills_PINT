import ReactPlayer from 'react-player/youtube';
import './VideoPlayer.css';

const DEFAULT_VIDEO_URL = "https://www.youtube.com/watch?v=Qpz077EhIOY&ab_channel=bashbunni";

const VideoPlayer = ({ videoUrl }) => {
    const videoSrc = videoUrl && videoUrl.trim() !== '' ? videoUrl : DEFAULT_VIDEO_URL;
    
    return (
        <div className="ratio ratio-16x9 rounded-4 overflow-hidden">
            <ReactPlayer
                url={videoSrc}
                width="100%"
                height="100%"
                controls
                playing={false}
                config={{
                    youtube: {
                        playerVars: {
                            origin: window.location.origin,
                            modestbranding: 1,
                            rel: 0
                        }
                    }
                }}
            />
        </div>
    );
};

export default VideoPlayer;


