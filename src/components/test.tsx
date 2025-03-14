"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Image from "next/image";
import NBA from "/public/images/nba.png";
import EuroLeague from "/public/images/euroleague.png";
import NCAA from "/public/images/ncaa.png";
import packNcaa from "/public/trading-ncaa.png";
import packNba from "/public/trading-nba.png";
import allstar from "/public/images/alstar.png";
import champ from "/public/images/champ.png";
import mvp from "/public/images/mvp.png";
import camera from "/public/images/camera.png";
import packEuro from "/public/trading-euro.png";
import clipJa from "/videos/vidja.mp4";
import Cards from "@/components/data";
import { supabase } from "../app/supabaseClient";
import { useRouter } from "next/navigation";
import withAuth from "./hoc";

const CardOpeningPage = () => {
  const router = useRouter();

  const [chosenPack, setChosenPack] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [finalResults, setFinalResults] = useState({});

  const [selectedPack, setSelectedPack] = useState(null);
  const [isRipping, setIsRipping] = useState(false);
  const [revealCards, setRevealCards] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [isFlipped, setIsFlipped] = useState(false);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/signin");
  };

  const cardVariants = {
    initial: {
      y: -100,
      opacity: 0,
      scale: 0.8,
      rotate: -10,
    },
    animate: {
      y: -20,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: -200,
      transition: { duration: 0.5 },
    },
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const packs = [
    {
      id: 1,
      category: "nba",
      logo: NBA,
      bg: packNba,
      name: "NBA Premium",
      cardCount: 5,
    },
    {
      id: 2,
      category: "euro",
      logo: EuroLeague,
      bg: packEuro,
      name: "EuroLeague Elite",
      cardCount: 5,
    },
    {
      id: 3,
      category: "ncaa",
      logo: NCAA,
      bg: packNcaa,
      name: "NCAA Stars",
      cardCount: 5,
    },
  ];

  const handlePackSelect = (pack) => {
    setSelectedPack(pack);
    setIsRipping(false);
    setRevealCards(false);
    const filtered = Cards.filter((card) => card.pack === pack);
    const randomIndex = Math.floor(Math.random() * filtered.length);
    const selectedCard = filtered[randomIndex];
    setFinalResults(selectedCard);
  };

  const handleRipStart = () => setIsRipping(true);

  const handleRipEnd = () => {
    setIsRipping(false);
    setRevealCards(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex flex-col">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-800 to-purple-900 p-4 shadow-md flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Card Collection</h1>
        <button
          onClick={handleLogout}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center space-x-1 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        {!selectedPack ? (
          <div className="flex flex-col items-center">
            <h2 className="text-white text-2xl font-bold mb-8">
              Choose a Pack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packs.map((pack) => (
                <div
                  key={pack.id}
                  className="group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-2xl"
                  onClick={() => handlePackSelect(pack.category)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
                  <Image
                    className="w-full h-auto rounded-xl"
                    alt={pack.name}
                    width={300}
                    height={420}
                    src={pack.bg}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                    <div className="flex items-center mb-2">
                      <Image
                        src={pack.logo}
                        alt="logo"
                        width={30}
                        height={30}
                        className="mr-2"
                      />
                      <h3 className="font-bold text-xl">{pack.name}</h3>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>{pack.cardCount} cards per pack</span>
                      <span className="bg-indigo-600 py-1 px-2 rounded group-hover:bg-indigo-500 transition-colors">
                        Select
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative flex flex-col items-center max-w-md mx-auto">
            <AnimatePresence>
              {/* Card Opening */}
              {!revealCards ? (
                <motion.div
                  key={"pack"}
                  className="relative w-72 h-[27rem] bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg shadow-2xl flex items-center justify-center overflow-hidden"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{
                    position: "absolute",
                    y: 300,
                    transition: { duration: 0.5 },
                    rotate: 5,
                    x: -50,
                    opacity: 0,
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40 z-10"></div>
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full z-20"
                    style={{
                      backgroundImage: `url(${
                        packs.find((p) => p.category === selectedPack)?.bg.src
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    animate={isRipping ? { scale: 1.05, opacity: 0.9 } : {}}
                  >
                    <motion.div
                      className="h-3 bg-white/10 w-full"
                      style={{ originY: 1 }}
                      animate={
                        isRipping
                          ? {
                              x: "93%",
                              transition: { duration: 1, ease: "easeInOut" },
                            }
                          : { rotateX: 0 }
                      }
                    />
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-white text-center p-4"
                    >
                      <h3 className="font-bold text-xl mb-2">
                        {packs.find((p) => p.category === selectedPack)?.name}
                      </h3>
                      <p className="text-sm text-white/80">
                        Tap and hold to rip open
                      </p>
                    </motion.div>
                  </div>
                  <div
                    className="absolute inset-0 z-40 cursor-pointer"
                    onTouchStart={handleRipStart}
                    onTouchEnd={handleRipEnd}
                    onMouseDown={handleRipStart}
                    onMouseUp={handleRipEnd}
                    onMouseLeave={() => setIsRipping(false)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  id="card"
                  className="w-72 h-[420px]"
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 1 }}
                  onClick={handleFlip}
                  whileHover={{ scale: 1.03 }}
                >
                  {!isFlipped ? (
                    <div className="w-full h-fit bg-white rounded-xl shadow-2xl overflow-hidden">
                      {finalResults.variant === "poster" ? (
                        <div
                          className="w-full h-full relative"
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        >
                          {!isHovered && (
                            <div className="w-full h-full relative">
                              <Image
                                className="h-full w-full rounded-xl object-cover"
                                alt="Card Front"
                                src={finalResults.image}
                              />
                              <motion.div
                                initial={{
                                  opacity: 0,
                                  scale: 0.5,
                                  y: -350,
                                  x: 30,
                                }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 200,
                                  damping: 20,
                                  duration: 0.9,
                                  delay: 0.3,
                                }}
                                className="absolute z-10"
                              >
                                <Image
                                  alt="Camera"
                                  src={camera}
                                  className="absolute -top-7 -right-3 w-24 rotate-12"
                                />
                              </motion.div>
                              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                                <p className="text-white text-sm">
                                  Tap to see card details
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Video on Hover */}
                          {isHovered && (
                            <div className="absolute inset-0 bg-black rounded-xl overflow-hidden">
                              <video
                                src={"/videos/vidja.mp4"}
                                className="absolute inset-0 w-full h-full object-cover rounded-xl"
                                autoPlay
                                muted
                                loop
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="relative w-full h-full">
                          <Image
                            className="h-full w-full rounded-xl object-cover"
                            alt="Card Front"
                            src={finalResults.image}
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                            <p className="text-white text-sm">
                              Tap to see card details
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full bg-white rounded-xl shadow-2xl overflow-hidden">
                      <div className="h-full bg-gradient-to-br from-gray-800 to-gray-900 p-4 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-2xl font-bold text-white">
                            {finalResults.name}
                          </h2>
                          <div className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                            {finalResults.pack?.toUpperCase()}
                          </div>
                        </div>

                        <div className="bg-gray-700/50 rounded-lg p-3 mb-4">
                          <div className="grid grid-cols-2 gap-2 text-white">
                            <div>
                              <p className="text-gray-400 text-xs">NUMBER</p>
                              <p className="font-semibold">
                                {finalResults.number}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-xs">TEAM</p>
                              <p className="font-semibold">
                                {finalResults.team}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1">
                          <p className="text-gray-400 text-xs mb-2">
                            ACHIEVEMENTS
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-gray-800 rounded-lg p-2 flex flex-col items-center justify-center">
                              <div className="relative h-12 w-12 mb-1">
                                <Image
                                  className="object-contain"
                                  alt="All Star"
                                  src={allstar}
                                  fill
                                />
                              </div>
                              <p className="text-indigo-400 font-bold text-center">
                                18
                              </p>
                              <p className="text-gray-400 text-xs text-center">
                                All Star
                              </p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-2 flex flex-col items-center justify-center">
                              <div className="relative h-12 w-12 mb-1">
                                <Image
                                  className="object-contain"
                                  alt="Championships"
                                  src={champ}
                                  fill
                                />
                              </div>
                              <p className="text-indigo-400 font-bold text-center">
                                4
                              </p>
                              <p className="text-gray-400 text-xs text-center">
                                Champ
                              </p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-2 flex flex-col items-center justify-center">
                              <div className="relative h-12 w-12 mb-1">
                                <Image
                                  className="object-contain"
                                  alt="MVP"
                                  src={mvp}
                                  fill
                                />
                              </div>
                              <p className="text-indigo-400 font-bold text-center">
                                3
                              </p>
                              <p className="text-gray-400 text-xs text-center">
                                MVP
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-auto text-center">
                          <p className="text-gray-400 text-xs">
                            Tap to see card front
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              className="mt-8 py-2 px-6 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-lg flex items-center"
              onClick={() => setSelectedPack(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Packs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardOpeningPage;
