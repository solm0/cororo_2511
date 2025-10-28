'use client'

import Image from "next/image";
import { Project, projects } from "./data";
import { changeDisplay } from "./firebase";
import { useState } from "react";
import Link from "next/link";

export function Lp({
  proj, tabOpen = null, isInList
}:{
  proj?: Project;
  tabOpen?: string | null;
  isInList?: boolean;
}) {
  if (!proj) return null;

  return (
    <>
      <div className="absolute w-full h-full rounded-full bg-zinc-950 shrink-0"/>
      <div className={`
        absolute w-1/2 h-1/2 rounded-full bg-zinc-950 overflow-clip
        ${proj.url === tabOpen && isInList && 'brightness-200'}
        ${isInList && 'hover:brightness-200'}
      `}>
        <Image
          src={proj.thumb}
          alt={proj.title}
          width={500}
          height={500}
        />
      </div>
      <div className="absolute w-3 h-3 rounded-full bg-zinc-950"/>
    </>
  )
}

export default function Home() {
  const [tabOpen, setTabOpen] = useState<string | null>(null);
  const detail = projects.find(proj => proj.url === tabOpen);

  return (
    <>
      <div className="absolute bg-zinc-800 text-zinc-100 w-screen h-screen top-0 left-0 flex justify-center">
        <div className="flex flex-col w-full h-auto p-4 gap-4 overflow-y-scroll">

          {/* 제목 */}
          <h1 className="relative w-full h-40 shrink-0 pb-2 flex justify-center items-center text-center text-3xl font-serif font-bold">
            코로로 전시제목
          </h1>

          <p className="w-full h-auto px-4 break-keep opacity-70 text-center">LP를 터치하면 아이맥 화면에서 웹사이트가 나옵니다. 헤드셋을 이용해 음악과 함께 감상해 보세요.</p>

          {/* LP들 */}
          <div className="relative flex flex-wrap gap-2 py-8">
            {projects.map((proj, i) => (
              <button
                key={i}
                className="relative w-[calc((100vw-2.5rem)/2)] h-[calc((100vw-2.5rem)/2)] p-4 flex items-center justify-center"
                onClick={() => {
                  changeDisplay(proj.url);
                  setTabOpen(proj.url);
                }}
              >
                <Lp proj={proj} tabOpen={tabOpen} isInList={true} />
              </button>
            ))}
          </div>

          <footer className="opacity-70">
            국민대학교 제 18회 조형전<br/>
            시각디자인학과 코딩 소모임 코로로<br/>
            2025.11.6-2025.11.15<br/>
            조형관 4층
          </footer>

          {/* 탭 열려도 스크롤 가능하게 밑에 공간 */}
          <div className="relative w-full h-[calc(60vh+0.5rem)] shrink-0" />
        </div>
      </div>

      {/* 상세 탭 */}
      <div className="z-80 fixed top-0 left-0 w-[calc(100vw-2rem)] translate-x-4 h-full overflow-y-scroll pointer-events-none">
        
        {/* 스크롤 */}
        <div
          className={`
            w-full bg-zinc-800 mt-[40vh] pointer-events-auto rounded-t-4xl transition-[margin,height] duration-300
            py-20 px-4 flex flex-col justify-start items-center gap-12 border border-zinc-900
            ${tabOpen ? 'mt-[40vh] h-auto' : 'mt-[100vh] h-10'}
          `}
        >
          {/* LP */}
          <div className="relative w-[60vw] h-[60vw] flex items-center justify-center">
            <Lp proj={detail} tabOpen={tabOpen} />
          </div>

          {/* 작품명, 이름, 설명 */}
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-3xl font-serif font-bold">{detail?.title}</h2>
            <div className="flex flex-col items-center gap-2 opacity-70">
              <p>{detail?.author}</p>
              {detail?.social &&
                <Link
                  href={detail?.social}
                  className="w-8 h-8 px-1 py-1 bg-zinc-800 rounded-lg hover:bg-zinc-900 transition-colors duration-300">
                  <Image
                    src="/insta.svg"
                    alt="social"
                    width={50}
                    height={50}
                  />
                </Link>
              }
            </div>
            <div className="break-keep flex flex-col gap-7">
              {detail?.desc.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>

          {/* 닫기 버튼 */}
          <button
            onClick={() => setTabOpen(null)}
            className="px-5 py-2 bg-zinc-50 rounded-full text-zinc-900 hover:bg-zinc-400 transition-colors duration-300"
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
}