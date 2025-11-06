export default function Page() {
  return (
    <video
      controls
      autoPlay
      loop
      playsInline
      className="w-screen h-screen object-cover"
    >
      <source src="/punk.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}
