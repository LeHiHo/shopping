// YoutubeVideo.tsx
import { useEffect, useState } from 'react';
import { fetchVideo } from '@/api/Youtube';

interface Props {
  videoId: string;
}

const YoutubeVideo = ({ videoId }: Props) => {
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchVideo(videoId).then(videoData => {
      if (videoData) {
        setVideo(videoData);
        setLoading(false);
      } else {
        setError('Failed to load video data');
        setLoading(false);
      }
    }).catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, [videoId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{video?.title}</h1>
      <img src={video?.thumbnailUrl} alt="Thumbnail" />
      <p>{video?.description}</p>
      <p>Views: {video?.viewCount}</p>
    </div>
  );
};

export default YoutubeVideo;
