import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import './VideoPlayer.css';

const DEFAULT_VIDEO_URL = "https://www.youtube.com/watch?v=qxOkaU6RVz4&ab";

const VideoPlayer = ({ videoUrl }) => {

    const [videoSrc, setVideoSrc] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [verificarLink, setVerificarLink] = useState(false);

    const isInvalidYoutubeURL = (url) => {
        try {
            const parsed = new URL(url);
            return (
                parsed.hostname.includes('youtube.com') && parsed.searchParams.get('v')
            );
        } catch (e) {
            return false;
        }
    };

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


    useEffect(() => {
        if (isInvalidYoutubeURL(videoUrl)) {
            const validURL = getCleanVideoUrl(videoUrl);
            setVideoSrc(validURL);
            setVerificarLink(true);
            setError(null);
        }else{
            setVerificarLink(false);
            setError("Erro: URL inválida!");
        }


    }, [videoUrl]);

    return (
        <div className="rounded-4 overflow-hidden">
            {!verificarLink ? (
                <div className="text-center p-5 bg-light border rounded">
                    <p>Não foi possível carregar o vídeo. Tente novamente mais tarde.</p>
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
                        setVerificarLink(false);
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


