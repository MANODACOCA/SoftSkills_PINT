import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import './VideoPlayer.css';

const DEFAULT_VIDEO_URL = "https://www.youtube.com/watch?v=rhvF2_JkDhQ";

const VideoPlayer = ({ videoUrl }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getCleanVideoUrl = (url) => {
        try {
            const parsed = new URL(url);
            const videoId = parsed.searchParams.get('v');
            if (videoId) return `https://www.youtube.com/watch?v=${videoId}`;
            return url;
        } catch (e) {
            return DEFAULT_VIDEO_URL;
        }
    };

    const videoSrc = getCleanVideoUrl(videoUrl);

    return (
        <div className="rounded-4 overflow-hidden">
            {error ? (
                <div className="text-center p-5 bg-light border rounded">
                    <p className="text-danger">{error}</p>
                    <p>Não foi possível carregar o vídeo. Verifique o link ou tente novamente mais tarde.</p>
                </div>
            ) : (
                <ReactPlayer
                    url={videoSrc}
                    width="100%"
                    height="575px"
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
            )}

        </div>
    );
};

export default VideoPlayer;


