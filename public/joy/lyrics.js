// lyrics.js
let lyrics = [
    {time: 0, text: "첫 번째 가사"},
    {time: 5.2, text: "두 번째 가사"},
    {time: 10.7, text: "세 번째 가사"}
  ];
  
  let lyricsDiv = document.getElementById("lyrics");
  
  function updateLyrics(currentTime) {
    // currentTime: song.currentTime()에서 가져오기
    let currentLyric = "";
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) {
        currentLyric = lyrics[i].text;
        break;
      }
    }
    lyricsDiv.innerText = currentLyric;
  }
  