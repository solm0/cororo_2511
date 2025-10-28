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
    title: 'sudno',
    url: 'https://sudno.vercel.app/',
    thumb: '/정솔미_1.png',
    desc: [
      '들리는 음악은 벨라루스의 포스트펑크 밴드 Молчат Дома의 곡 Судно이다. 해당 곡의 가사는 러시아 시인 Борис Рыжий의 시를 인용한 것이다.',
      '‘에나멜 칠 요강, 쪽창, 탁자, 침대, ... ... .’ 시인의 묘사에 따라 방을 재현하였다.',
      '시구들을 모아 시를 완성해 보자.'
    ],
    social: 'https://www.instagram.com/solmi.wiki/',
  },
  {
    author: '정솔미',
    title: 'sudno',
    url: 'https://brutalist-pixels.vercel.app/',
    thumb: '/정솔미_2.png',
    desc: [
      '모노스페이스 키릴문자 픽셀들로 구 유고슬라비아 지역 브루탈리즘 양식의 기념비들을 그렸습니다.',
      '유고슬라비아 시대, 현 세르비아 수도 베오그라드에서 활동한 신스팝 음악가 Max Vincent의 곡 Loš je dan(1986)의 가사를 넣었습니다.',
    ]
  },
  {
    author: '정솔미',
    title: 'sudno',
    url: 'https://ko.wikipedia.org/wiki/%EB%8F%99%ED%8B%B0%EB%AA%A8%EB%A5%B4',
    thumb: '/ㄱㄱ_1.png',
    desc: [],
  },
  {
    author: '정솔미',
    title: 'sudno',
    url: 'https://ko.wikipedia.org/wiki/%EB%8F%99%EB%82%A8%EC%95%84%EC%8B%9C%EC%95%84_%EA%B5%AD%EA%B0%80_%EC%97%B0%ED%95%A9',
    thumb: '/ㄱㄱ_2.png',
    desc: [],
  },
  {
    author: '정솔미',
    title: 'sudno',
    url: 'https://ko.wikipedia.org/wiki/%ED%8E%98%EA%B0%80%EC%88%98%EC%8A%A4%EC%9E%90%EB%A6%AC_IK',
    thumb: '/ㄴㄴ_1.png',
    desc: [],
  },
  {
    author: '정솔미',
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