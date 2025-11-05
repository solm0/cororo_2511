export default function Page() {
  return (
    <video
      controls
      autoPlay
      loop
      muted
      playsInline
      className="w-screen h-screen object-cover"
    >
      <source src="/static/punk/punk.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}
