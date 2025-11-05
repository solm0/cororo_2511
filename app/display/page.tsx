'use client'

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { onValue, ref } from "firebase/database";
import { projects } from "../data";
import { Lp } from "../page";

export default function DisplayPage() {
  const [url, setUrl] = useState("/initial");
  const initProj = projects.find(proj => proj.url === url);
  const [proj, setProj] = useState(initProj);

  useEffect(() => {
    const urlRef = ref(db, "currentURL");
    const unsubscribe = onValue(urlRef, (snapshot) => {
      const newUrl = snapshot.val();
      if (newUrl) setUrl(newUrl);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const project = projects.find(proj => proj.url === url);
    setProj(project);
    console.log(url, project)
  }, [url]);

  return (
    <>
      <iframe
        src={url}
        className="w-screen h-screen border-none"
      />

      <div className="fixed top-4 left-4 w-20 flex items-center animate-[spin_15s_linear_infinite]">

        {/* LP */}
        <div className="relative w-20 h-20 flex items-center justify-center border border-zinc-500 rounded-full shrink-0">
          <Lp proj={proj} />
        </div>

        {/* 라벨 */}
        <div className="px-4 w-40 shrink-0 py-1 text-zinc-400 flex flex-col break-keep">
          <p>{proj?.title}</p>
          <p>{proj?.author}</p>
        </div>

        <div className="px-4 w-auto py-1 text-zinc-700 flex flex-col">
          https://cororo-2511.vercel.app/
        </div>

      </div>
    </>
  );
}