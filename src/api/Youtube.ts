// youtube.ts
import axios from 'axios';

export async function fetchVideo(videoId: string): Promise<YoutubeData | null> {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet,statistics`;
    const response = await axios.get(url);
    const videoData = response.data.items[0];

    if (!videoData) {
      console.error('No video found for the given ID');
      return null;
    }

    return {
      videoId: videoData.id,
      title: videoData.snippet.title,
      description: videoData.snippet.description,
      publishedAt: videoData.snippet.publishedAt,
      thumbnailUrl: videoData.snippet.thumbnails.high.url,
      viewCount: videoData.statistics.viewCount,
    };
  } catch (error) {
    console.error('Error fetching video:', error);
    throw new Error('Failed to fetch video data');
  }
}
