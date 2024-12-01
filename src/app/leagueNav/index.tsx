"use client";
import Image from "next/image";
import NBA from "/public/images/nba.png";
import EuroLeague from "/public/images/euroleague.png";
import NCAA from "/public/images/ncaa.png";
import { useState } from "react";

export default function LeagueNav() {
  const [league, setLeague] = useState(String);

  return (
    <div className="grid grid-cols-3 grid-rows-1 gap-4 mb-10 align-middle justify-center items-center">
      <div onClick={() => setLeague("nba")}>
        <Image alt="skdlasf" width={50} height={50} src={NBA} />
      </div>
      <div onClick={() => setLeague("ncaa")}>
        <Image alt="skdlasf" width={50} height={50} src={NCAA} />
      </div>
      <div onClick={() => setLeague("euro")}>
        <Image alt="skdlasf" width={50} height={50} src={EuroLeague} />
      </div>
    </div>
  );
}
