'use client'

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { onValue, ref } from "firebase/database";

export default function DisplayPage() {
  const [url, setUrl] = useState("/initial");

  useEffect(() => {
    const urlRef = ref(db, "currentURL");
    const unsubscribe = onValue(urlRef, (snapshot) => {
      const newUrl = snapshot.val();
      if (newUrl) setUrl(newUrl);
    });

    return () => unsubscribe();
  }, []);

  return (
    <iframe
      src={url}
      className="w-screen h-screen border-none"
    />
  );
}