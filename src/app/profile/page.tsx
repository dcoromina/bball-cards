import React from "react";
import LeagueNav from "../leagueNav";
import CardGrid from "../grid/cardGrid";
import Image from "next/image";
import T from "/public/cards/butler.png";

export default function Profile() {
  return (
    <div className=" items-center justify-items-center min-h-screen p-8  gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <LeagueNav />
      <CardGrid></CardGrid>
    </div>
  );
}
