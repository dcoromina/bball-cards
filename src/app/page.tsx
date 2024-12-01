import Image from "next/image";
import CardGrid from "./grid/cardGrid";
import LeagueNav from "./leagueNav";
import CardPacks from "@/components/cardPacks";
import MainInfo from "@/components/mainInfo";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full">
      <MainInfo />
      <div className="flex  items-center  justify-center min-h-fit h-fit p-8  gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <CardPacks />
      </div>
    </div>
  );
}
