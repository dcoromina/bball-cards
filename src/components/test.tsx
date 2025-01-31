"use client";
import React, { useState } from "react";
import {
  AnimatePresence,
  delay,
  motion,
  stagger,
  useAnimation,
} from "framer-motion";
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
    // Sign out the user using Supabase
    await supabase.auth.signOut();

    // Optionally redirect to the login page after logout
    router.push("/signin");
  };

  const cardVariants = {
    initial: {
      y: -100, // Start below the pack
      opacity: 0, // Hidden initially
      scale: 0.8, // Smaller initially
      rotate: -10, // Slight rotation
    },
    animate: {
      y: -20, // Slide up
      opacity: 1, // Fully visible
      scale: 1, // Normal size
      rotate: 0, // Straight orientation
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: -200, // Moves up and fades away
      transition: { duration: 0.5 },
    },
  };

  const handleFlip = async () => {
    setIsFlipped((prev) => !prev);
    // Animation sequence
    await controls.start({ rotateY: 90, transition: { duration: 0.3 } });
    controls.start({
      rotateY: isFlipped ? 0 : 180,
      transition: { duration: 0.3 },
    });
  };

  const packs = [
    { id: 1, category: "nba", logo: NBA, bg: packNba },
    { id: 2, category: "euro", logo: EuroLeague, bg: packEuro },
    { id: 3, category: "ncaa", logo: NCAA, bg: packNcaa },
  ];

  const handlePackSelect = (pack) => {
    setSelectedPack(pack);
    setIsRipping(false);
    setRevealCards(false);
    const filtered = Cards.filter((card) => card.pack === pack);
    const randomIndex = Math.floor(Math.random() * filtered.length);
    const selectedCard = filtered[randomIndex]; // Get the actual card
    setFinalResults(selectedCard); // Store the entire card object
  };

  const handleRipStart = () => setIsRipping(true);

  const handleRipEnd = () => {
    setIsRipping(false);
    setRevealCards(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
      {!selectedPack ? (
        <div className="grid grid-cols-3 gap-4">
          {packs.map((pack) => (
            <div
              style={{ backgroundImage: `url(${pack.bg})` }}
              key={pack.id}
              className="  w-72  h-[420px] rounded-md  hover:scale-110 transition-all shadow-lg "
              onClick={() => handlePackSelect(pack.category)}
            >
              <Image
                className="w-fit h-auto rotate-1 rounded-md"
                alt="s"
                width={500}
                height={500}
                src={pack.bg}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="relative flex flex-col items-center">
          <AnimatePresence>
            {!revealCards ? (
              <motion.div
                key={"pack"}
                className=" relative w-72 h-96 bg-red-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-xl  overflow-hidden"
                initial={{ scale: 1 }}
                animate={isRipping ? { scale: 1.05 } : {}}
                onPanStart={handleRipStart}
                onPanEnd={handleRipEnd}
                exit={{
                  position: "absolute",
                  y: 300,
                  transition: { duration: 0.5 },
                  rotate: 5,
                  x: -50,
                  opacity: 1,
                  duration: 0,
                }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-red-700 to-red-500 z-20"
                  style={{
                    backgroundImage: `url("/public/pack-ncaa.png")`, // Correctly set the background image
                    backgroundSize: "cover", // Ensures the image covers the div
                    backgroundPosition: "center", // Centers the image
                  }}
                  animate={isRipping ? { rotate: 0 } : { rotate: 0 }}
                >
                  <motion.div
                    className="h-3 bg-red-700 w-full"
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
              </motion.div>
            ) : (
              <motion.div
                id="card"
                className=" w-72  h-[420px] "
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 1 }}
                onClick={handleFlip}
              >
                <motion.div
                  className="w-full h-full p-2 bg-white rounded-lg shadow-md z-10"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={controls}
                >
                  {/* Front Face */}
                  {finalResults.variant === "poster" ? (
                    <div
                      className=""
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      {!isHovered && (
                        <div className="">
                          <Image
                            className="h-full w-full  rounded-md relative top-0 left-0"
                            alt="alt"
                            src={finalResults.image}
                            style={{ backfaceVisibility: "hidden" }}
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
                          >
                            <Image
                              alt=""
                              src={camera}
                              className="absolute z-50 -top-7 -right-3 w-24 rotate-12"
                            />
                          </motion.div>
                        </div>
                      )}

                      {/* Video on Hover */}
                      {isHovered && (
                        <div className="bg-white">
                          <video
                            src={"/videos/vidja.mp4"}
                            className="absolute inset-0 w-full h-full object-cover z-20 rounded-lg p-1"
                            autoPlay
                            muted
                            loop
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <Image
                      className="h-full w-full  rounded-md relative top-0 left-0"
                      alt="alt"
                      src={finalResults.image}
                      style={{ backfaceVisibility: "hidden" }}
                    />
                  )}

                  {/* Back Face */}

                  <motion.div
                    className="absolute w-full h-full top-0 rounded-lg  left-0 flex items-center justify-center text-white font-bold text-xl"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div
                      className="
                      overflow-y-hidden
                    bg-white
                    rounded-lg 
                    p-2
                    shadow-xl
                    w-full
                    h-full
                  "
                    >
                      <div className="bg-gray-600 w-full h-full rounded-md p-2">
                        <div className="flex flex-row">
                          {" "}
                          <h2 className="text-2xl font-bold mb-4">
                            {finalResults.name}
                          </h2>
                        </div>

                        <div className="space-y-3">
                          <p className="font-semibold">
                            Num:
                            <span className="font-normal ml-2">
                              {finalResults.number}
                            </span>
                          </p>
                          <p className="font-semibold">
                            Team:
                            <span className="font-normal ml-2">
                              {finalResults.team}
                            </span>
                          </p>
                        </div>
                        <div className="inline-grid grid-rows-6 grid-cols-3 place-items-center w-full  ">
                          {" "}
                          <div className="h-20 w-20 relative" id="allstar">
                            <Image
                              className="relative w-fit h-fit"
                              alt=""
                              src={allstar}
                              height={500}
                              width={500}
                            />
                            <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-black ">
                              18
                            </p>
                          </div>
                          <div className="h-20 w-20  relative" id="champ">
                            <Image
                              className="relative w-fit h-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                              alt=""
                              src={champ}
                              height={500}
                              width={500}
                            />
                            <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-black ">
                              4
                            </p>
                          </div>
                          <div className="h-20 w-20 relative" id="mvp">
                            <Image
                              className="relative h-full w-fit top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                              alt=""
                              src={mvp}
                            />
                            <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-black ">
                              3
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            className="mt-4 p-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-400"
            onClick={() => setSelectedPack(null)}
          >
            Back to Packs
          </button>
        </div>
      )}
    </div>
  );
};

export default CardOpeningPage;
