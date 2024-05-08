import Youtube from "@/api/Youtube";

export default async function Home() {
  const videoData = Youtube('UKY3scPIMd8');

  return (
    <>
      <div className="bg-blue-500">home</div>
      <div className="bg-blue-500">home</div>
      <div className="bg-blue-500">home</div>
      <div className="bg-blue-500">home</div>
      <div className="bg-blue-500">home</div>
      <div className="bg-blue-500">home</div>
    </>
  );
}
