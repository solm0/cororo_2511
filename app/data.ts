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
    desc: ['게임 <레인 월드>에서의 음악 시스템은 위협에 가까이 다가갈수록 음악의 레이어가 중첩되는 형식이다. 이런 시스템을 바탕으로 미로 속에서 음악의 진원지를 찾아나서는 게임을 만들었다.'],
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
    thumb: '/정현상_1.png',
    desc: ['신나는 트럼펫 소리에 맞춰서 아름답게 반응하는 그래픽을 신나게 구경해보세요.'],
  },
  {
    author: '정현상',
    title: 'Kiseki',
    url: 'https://cororo-2511.vercel.app/kiseki',
    thumb: '/정현상_2.png',
    desc: ['Greeen의 대표곡 중 하나인 기적입니다. 화면 속 다양한 모습으로 표현된 자신의 모습을 보면서 노래 가사를 들어보세요'],
  },
  {
    author: '최호은',
    title: 'alien',
    url: 'https://cororo-2511.vercel.app/alien1',
    thumb: '/최호은_1.png',
    desc: ['안녕하세요 외계인의 방을 함꼐 보며 우리 다 같이 외계인 체험해보실까요?'],
  },
  {
    author: '김봄, 차시은',
    title: 'PUNK',
    url: 'https://cororo-2511.vercel.app/Punk',
    thumb: '/김_차.png',
    desc: ['이 작업은 두 사람이 같은 음악을 듣고 하나의 폰트를 완성하는 실험이다. 두 사람은 고릴라즈의 <Punk>를 들으며 한 명은 홀수 알파벳, 다른 한 명은 짝수 알파벳을 맡아 레터링했다. 음악의 리듬과 각자의 감각이 겹치고 섞이며 우연한 조화로 나타난다.'],
    social: 'https://www.instagram.com/kim_bom___/',
  },
]