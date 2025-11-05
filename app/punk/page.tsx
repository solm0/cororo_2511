export default function Page() {
  return (
<video controls className="w-screen h-screen">
        <source src={'/static/Punk.mp4'} type={`video/mp4`} />
        Your browser does not support the video tag.
 </video>
  )
}
