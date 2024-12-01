"use client";
import Image from "next/image";
import React, { useState } from "react";
import NBA from "/public/images/nba.png";
import EuroLeague from "/public/images/euroleague.png";
import NCAA from "/public/images/ncaa.png";
import packNcaa from "/public/pack-ncaa.png";
import packNba from "/public/pack-nba.png";
import packEuro from "/public/pack-euro.png";
import Cards from "@/components/data";
import Modal from "@/components/modal";
import { motion } from "motion/react";

const packs = [
  { id: 1, category: "nba", logo: NBA, bg: packNba },
  { id: 2, category: "euro", logo: EuroLeague, bg: packEuro },
  { id: 3, category: "ncaa", logo: NCAA, bg: packNcaa },
];

export default function CardPacks() {
  const [chosenPack, setChosenPack] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [finalResults, setFinalResults] = useState({});

  const handleResult = (pack) => {
    const filtered = Cards.filter((card) => card.pack === pack);
    const randomIndex = Math.floor(Math.random() * filtered.length);
    const selectedCard = filtered[randomIndex]; // Get the actual card
    setFinalResults(selectedCard); // Store the entire card object
    setIsModalOpen(true);
  };

  return (
    <div className="flex bottom-0 items-center  gap-3">
      {packs.map((p) => (
        <div
          style={{ backgroundImage: `url(${p.bg})` }}
          key={p.id}
          className=" w-28 h-[30vh] hover:scale-110 transition-all "
          onClick={() => handleResult(p.category)}
        >
          <Image
            className="w-fit h-full rotate-1"
            alt="s"
            width={50}
            height={50}
            src={p.bg}
          />
        </div>
      ))}
      <motion.div
        animate={{ rotate: 180 }}
        transition={{ type: "spring", restDelta: 0.5 }}
      >
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          content={finalResults || {}}
        />
      </motion.div>
    </div>
  );
}