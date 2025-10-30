export interface Project {
  author: string;
  title: string;
  url: string;
  thumb: string;
  desc: string[];
  social?: string;
}

export const projects: Project[] = [
  {
    author: '정솔미',
    title: 'Судно',
    url: 'https://sudno.vercel.app/',
    thumb: '/정솔미_1.png',
    desc: [
      '벨라루스의 포스트펑크 밴드 Молчат Дома의 곡 Судно의 가사는 러시아 시인 Борис Рыжий의 시를 인용한 것이다.',
      '‘에나멜 칠 요강, 쪽창, 탁자, 침대, ... ... .’ 시인의 묘사에 따라 방을 재현하였다.',
      '방의 물체들을 클릭해 시구들을 모아 시를 완성해 보자.'
    ],
    social: 'https://www.instagram.com/solmi.wiki/',
  },
  {
    author: '정솔미',
    title: 'Loš je dan',
    url: 'https://brutalist-pixels.vercel.app/',
    thumb: '/정솔미_2.png',
    desc: [
      '모노스페이스 키릴문자 픽셀들로 구 유고슬라비아 지역 브루탈리즘 양식의 기념비들을 그렸습니다.',
      '유고슬라비아 시대, 현 세르비아 수도 베오그라드에서 활동한 신스팝 음악가 Max Vincent의 곡 Loš je dan(1986)이 재생됩니다.',
    ],
    social: 'https://www.instagram.com/solmi.wiki/',
  },
  {
    author: '김민제',
    title: 'stormy coast',
    url: 'https://stormycoast.vercel.app/',
    thumb: '/김민제_1.png',
    desc: ['<레인 월드> 게임에서 음악은 위협에 가까이 다가갈수록 음악의 레이어가 중첩된다. 이런 시스템을 바탕으로 미로 속에서 음악의 진원지를 찾아나서는 게임을 만들었다.'],
    social: 'https://www.instagram.com/exsignificant/'
  },
  {
    author: '김민제',
    title: 'tian tian',
    url: 'https://cororo-2511.vercel.app/tian-tian',
    thumb: '/김민제_2.png',
    desc: ['tian tian은 매일매일, 날마다라는 뜻이다. 이 노래를 듣고 떠오르는 심상을 표현한 뮤직비디오를 만들었다.'],
    social: 'https://www.instagram.com/exsignificant/'
  },
  {
    author: '정현상',
    title: 'joy',
    url: 'https://cororo-2511.vercel.app/joy',
    thumb: '/f_1.png',
    desc: ['신나는 트럼펫 소리에 맞춰서 아름답게 반응하는 그래픽을 신나게 구경해보세요.'],
  },
  {
    author: '정현상',
    title: 'sudno',
    url: 'https://ko.wikipedia.org/wiki/%EC%9C%84%ED%82%A4%EB%B0%B1%EA%B3%BC:%EB%8C%80%EB%AC%B8',
    thumb: '/ㄴㄴ_2.png',
    desc: [],
  },
  {
    author: '정솔미',
    title: 'sudno',
    url: 'https://ko.wikipedia.org/wiki/2025%EB%85%84_%EB%A3%A8%EB%B8%8C%EB%A5%B4_%EB%B0%95%EB%AC%BC%EA%B4%80_%EB%8F%84%EB%82%9C_%EC%82%AC%EA%B1%B4',
    thumb: '/ㄷㄷ_1.png',
    desc: [],
  },
  {
    author: '정솔미',
    title: 'sudno',
    url: 'https://ko.wikipedia.org/wiki/%ED%94%84%EB%9E%91%EC%8A%A4_%EC%99%95%EA%B4%80_%EB%B3%B4%EC%84%9D',
    thumb: '/ㄷㄷ_2.png',
    desc: [],
  },
]