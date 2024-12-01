"use client";
import Image from "next/image";
import React, { useState } from "react";
import Cards from "@/components/data";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { X, Info } from "lucide-react";
import Modal from "@/components/modal";

{
  /* <div
key={i}
className="border-white border-solid border-[1px] w-[45%] h-40"
>
<p>{i}</p>
</div> */
}

export default function CardGrid() {
  const [zoomedId, setZoomedId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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

  const handleItemClick = (id: number | React.SetStateAction<null>) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  return (
    <div
      className={`h-dvh w-full flex flex-wrap gap-3 justify-center  ${
        zoomedId !== null ? "overflow-hidden" : ""
      } `}
    >
      {Cards.map((c) => (
        <div
          key={c.id}
          onClick={() => handleItemClick(c.id)}
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
          {zoomedId === c.id && (
            <button
              onClick={closeClick}
              className="
                  absolute -top-2 -right-2
                  bg-white text-gray-800 
                  rounded-full p-1 
                  shadow-lg 
                  hover:bg-gray-100 
                  transition-colors
                  z-50
                "
              aria-label="Close"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      ))}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={Cards.find((card) => card.id === selectedId) || {}}
      />
    </div>
  );
}
