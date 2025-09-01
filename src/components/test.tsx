"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
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
import Cards from "@/components/data";

interface Card {
  id?: number;
  name: string;
  team: string;
  number: string | number;
  pack: string;
  image: StaticImageData | string;
  variant: string;
}

const CardOpeningPage = () => {
  const [finalResults, setFinalResults] = useState<Card>({} as Card);
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [isRipping, setIsRipping] = useState(false);
  const [revealCards, setRevealCards] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
      color: "from-nba-blue to-nba-red",
    },
    {
      id: 2,
      category: "euro",
      logo: EuroLeague,
      bg: packEuro,
      name: "EuroLeague Elite",
      cardCount: 5,
      color: "from-blue-600 to-indigo-700",
    },
    {
      id: 3,
      category: "ncaa",
      logo: NCAA,
      bg: packNcaa,
      name: "NCAA Stars",
      cardCount: 5,
      color: "from-green-600 to-emerald-700",
    },
  ];

  const handlePackSelect = (pack: string) => {
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
    <div className="flex-1 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        {!selectedPack ? (
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-white text-4xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Choose Your Pack
            </motion.h2>
            <motion.p
              className="text-indigo-200 text-lg mb-12 text-center max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Select from our premium collection packs and discover legendary
              players
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
              {packs.map((pack, index) => (
                <motion.div
                  key={pack.id}
                  className="group relative aspect-[2/3] overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-105 shadow-2xl"
                  onClick={() => handlePackSelect(pack.category)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 z-10"></div>
                  <Image
                    className="w-full h-full object-cover rounded-2xl"
                    alt={pack.name}
                    width={300}
                    height={420}
                    src={pack.bg}
                  />

                  {/* Pack Logo */}
                  <motion.div
                    className="absolute top-4 left-4 z-20"
                    whileHover={{ scale: 1.1 }}
                  ></motion.div>

                  {/* Pack Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                    <h3 className="font-bold text-2xl mb-3">{pack.name}</h3>
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-15"
                    initial={false}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="relative flex flex-col items-center max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {/* Card Opening */}
              {!revealCards ? (
                <motion.div
                  key={"pack"}
                  className="relative w-80 aspect-[2/3] bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden border-2 border-white/20"
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
                      className="h-3 bg-white/20 w-full rounded-full"
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
                      className="text-white text-center p-6"
                    >
                      <h3 className="font-bold text-2xl mb-3">
                        {packs.find((p) => p.category === selectedPack)?.name}
                      </h3>
                      <p className="text-white/80 text-sm mb-4">
                        Tap and hold to rip open your pack
                      </p>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                        <div
                          className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
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
                  className="w-80 aspect-[2/3]"
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 1 }}
                  onClick={handleFlip}
                  whileHover={{ scale: 1.03 }}
                >
                  {!isFlipped ? (
                    <div className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white">
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
                              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white text-sm font-medium">
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
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-white text-sm font-medium">
                              Tap to see card details
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden border-4 border-white">
                      <div className="h-full p-6 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-3xl font-bold text-white">
                            {finalResults.name}
                          </h2>
                          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs px-3 py-2 rounded-lg font-semibold">
                            {finalResults.pack?.toUpperCase()}
                          </div>
                        </div>

                        <div className="bg-gray-700/50 rounded-xl p-4 mb-6 backdrop-blur-sm">
                          <div className="grid grid-cols-2 gap-4 text-white">
                            <div>
                              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                                NUMBER
                              </p>
                              <p className="font-bold text-xl">
                                {finalResults.number}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                                TEAM
                              </p>
                              <p className="font-bold text-xl">
                                {finalResults.team}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1">
                          <p className="text-gray-400 text-xs mb-4 font-medium uppercase tracking-wider">
                            ACHIEVEMENTS
                          </p>
                          <div className="grid grid-cols-3 gap-3">
                            <div className="bg-gray-800/80 rounded-xl p-3 flex flex-col items-center justify-center backdrop-blur-sm border border-gray-700/50">
                              <div className="relative h-12 w-12 mb-2">
                                <Image
                                  className="object-contain"
                                  alt="All Star"
                                  src={allstar}
                                  fill
                                />
                              </div>
                              <p className="text-championship-gold font-bold text-center text-lg">
                                18
                              </p>
                              <p className="text-gray-400 text-xs text-center">
                                All Star
                              </p>
                            </div>
                            <div className="bg-gray-800/80 rounded-xl p-3 flex flex-col items-center justify-center backdrop-blur-sm border border-gray-700/50">
                              <div className="relative h-12 w-12 mb-2">
                                <Image
                                  className="object-contain"
                                  alt="Championships"
                                  src={champ}
                                  fill
                                />
                              </div>
                              <p className="text-championship-gold font-bold text-center text-lg">
                                4
                              </p>
                              <p className="text-gray-400 text-xs text-center">
                                Champ
                              </p>
                            </div>
                            <div className="bg-gray-800/80 rounded-xl p-3 flex flex-col items-center justify-center backdrop-blur-sm border border-gray-700/50">
                              <div className="relative h-12 w-12 mb-2">
                                <Image
                                  className="object-contain"
                                  alt="MVP"
                                  src={mvp}
                                  fill
                                />
                              </div>
                              <p className="text-mvp-purple font-bold text-center text-lg">
                                3
                              </p>
                              <p className="text-gray-400 text-xs text-center">
                                MVP
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 text-center">
                          <p className="text-gray-400 text-xs font-medium">
                            Tap to see card front
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              className="mt-10 py-3 px-8 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-glow flex items-center font-semibold"
              onClick={() => setSelectedPack(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CardOpeningPage;
