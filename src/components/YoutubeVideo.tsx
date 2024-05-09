import axios from 'axios';
import { useEffect, useState } from 'react';

interface Props {
  videoId: string;
}

const YoutubeVideo = ({ videoId }: Props) => {
  console.log(videoId)
  const [video, setVideo] = useState<Youtube | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const API_KEY =  process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
        console.log("api",API_KEY)
        const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet,statistics`;
        console.log(url)
        const response = await axios.get(url);
        const videoData = response.data.items[0];

        if (videoData) {
          setVideo({
            videoId: videoData.id,
            title: videoData.snippet.title,
            description: videoData.snippet.description,
            publishedAt: videoData.snippet.publishedAt,
            thumbnailUrl: videoData.snippet.thumbnails.high.url,
            viewCount: videoData.statistics.viewCount,
          });
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching video:', err);
        setError('Failed to load video data');
        setLoading(false);
      }
    };

    fetchVideo();
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
