// YouTube 동영상 정보에 맞는 인터페이스 정의
interface YoutubeData {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  viewCount: number;
}