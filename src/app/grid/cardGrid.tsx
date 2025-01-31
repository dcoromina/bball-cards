"use client";
import Image from "next/image";
import React, { useState } from "react";
import Cards from "@/components/data";
import NBA from "/public/images/nba.png";
import EuroLeague from "/public/images/euroleague.png";
import NCAA from "/public/images/ncaa.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { X, Info } from "lucide-react";
import Modal from "@/components/modal";

export default function CardGrid() {
  const [zoomedId, setZoomedId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [variantName, setVariantName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [league, setLeague] = useState("nba");
  const selectedLeague = "nba";

  const handleImageClick = (id) => {
    if (zoomedId === id) {
      setShowDetails(!showDetails);
    } else {
      setZoomedId(id);
      setShowDetails(false);
    }
  };

  const handleBackgroundClick = () => {
    if (showDetails) {
      setShowDetails(true);
    }
  };

  const closeClick = () => {
    setZoomedId(null);
    setShowDetails(false);
  };

  const handleItemClick = (
    id: number | React.SetStateAction<null>,
    name: string
  ) => {
    setSelectedId(id);
    setVariantName(name);
    setIsModalOpen(true);
  };

  const filteredCards = Cards.filter(
    (c) => c.pack === league && c.variant === "regular"
  );

  return (
    <div className="">
      <div className="grid grid-cols-3 grid-rows-1 gap-4 mb-10 align-middle justify-center items-center">
        <div
          onClick={() => setLeague("nba")}
          className="hover:scale-105 cursor-pointer transition-all"
        >
          <Image alt="skdlasf" width={50} height={50} src={NBA} />
        </div>
        <div
          onClick={() => setLeague("ncaa")}
          className="hover:scale-105 cursor-pointer transition-all"
        >
          <Image alt="skdlasf" width={50} height={50} src={NCAA} />
        </div>
        <div
          onClick={() => setLeague("euro")}
          className="hover:scale-105 cursor-pointer transition-all"
        >
          <Image alt="skdlasf" width={50} height={50} src={EuroLeague} />
        </div>
      </div>
      <div
        className={`h-dvh w-full flex flex-wrap gap-3 justify-center  ${
          zoomedId !== null ? "overflow-hidden" : ""
        } `}
      >
        {filteredCards.map((c) => (
          <div
            key={c.id}
            onClick={() => handleItemClick(c.id, c.name)}
            className={`w-36 h-fit
                cursor-pointer 
                transition-all 
                duration-300 
                ${
                  zoomedId === c.id
                    ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 scale-150"
                    : "hover:scale-105"
                }
              ${
                zoomedId !== null && zoomedId !== c.id
                  ? "opacity-0"
                  : "opacity-100"
              }
              `}
          >
            <Image
              alt="sda"
              width={500}
              height={500}
              src={c.image}
              className="rounded-md"
            />

            {zoomedId === c.id && showDetails && (
              <div
                className="
                    absolute inset-0 
                    bg-slate-500
                    rounded-lg 
                    p-6 
                    overflow-y-auto
                    shadow-xl
                  "
                onClick={() => handleBackgroundClick()}
              >
                <h2 className="text-2xl font-bold mb-4">{c.name}</h2>
                <div className="space-y-3">
                  <p className="font-semibold">
                    Location:
                    <span className="font-normal ml-2">{c.number}</span>
                  </p>
                  <p className="font-semibold">
                    Date:
                    <span className="font-normal ml-2">{c.team}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          content={Cards.find((card) => card.id === selectedId) || {}}
          variants={Cards.find((card) => variantName === card.name) || {}}
        />
      </div>
    </div>
  );
}
