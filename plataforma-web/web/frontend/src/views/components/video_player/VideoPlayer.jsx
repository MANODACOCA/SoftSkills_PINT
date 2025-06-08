import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import './VideoPlayer.css';

const DEFAULT_VIDEO_URL = "https://www.youtube.com/watch?v=Qpz077EhIOY&ab";

const VideoPlayer = ({ videoUrl }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const videoSrc = videoUrl && videoUrl.trim() !== '' ? videoUrl : DEFAULT_VIDEO_URL;
    console.log(videoUrl);
    return (
        <div className="ratio ratio-16x9 rounded-4 overflow-hidden">
            <ReactPlayer
                url={DEFAULT_VIDEO_URL}
                width="100%"
                height="100%"
                controls
                playing={false}
                onReady={() => setLoading(false)}
                onError={(e) => {
                    console.error('Error loading video:', e);
                    setError('Error loading video');
                    setLoading(false);
                }}
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


