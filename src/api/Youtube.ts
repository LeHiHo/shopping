import axios from 'axios';

const Youtube = async (videoId: string) => {
  const API_KEY = process.env.NEXT_YOUTUBE_API_KEY; 
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet,statistics`;

  const response = await axios.get(url);
  const videoData = response.data.items[0]; // API 응답에서 첫 번째 동영상 정보 추출

  // API 응답에서 필요한 정보만 추출하여 반환
  return {
    videoId: videoData.id,
    title: videoData.snippet.title,
    description: videoData.snippet.description,
    publishedAt: videoData.snippet.publishedAt,
    thumbnailUrl: videoData.snippet.thumbnails.high.url,
    viewCount: videoData.statistics.viewCount,
  };
};

export default Youtube;
