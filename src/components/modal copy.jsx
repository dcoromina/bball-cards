import React, { useState } from "react";
import { X } from "lucide-react";
import CurryBrand from "/public/images/curry-logo.png";
import Cavs1 from "/public/teams/cavs-2010-2017.png";
import Cavs2 from "/public/teams/cavs-present.png";
import Heat from "/public/teams/heat-logo.png";
import Lakers from "/public/teams/lakers-logo.png";
import Image from "next/image";
import NBA from "/public/images/nba.png";
import EuroLeague from "/public/images/euroleague.png";
import NCAA from "/public/images/ncaa.png";
import packNcaa from "/public/trading-ncaa.png";
import packNba from "/public/trading-nba.png";
import allstar from "/public/images/alstar.png";
import champ from "/public/images/champ.png";
import mvp from "/public/images/mvp.png";
import card1 from "/public/cards/roy.png";
import card2 from "/public/cards/international.png";
import packEuro from "/public/trading-euro.png";
import Cards from "@/components/data";
import {
  AnimatePresence,
  delay,
  motion,
  stagger,
  useAnimation,
} from "framer-motion";

// Modal Component
const Modal = ({ isOpen, onClose, content }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [activeVariant, setActiveVariant] = useState();
  const [isFlipped, setIsFlipped] = useState(false);
  const controls = useAnimation();

  const cardVariants = {
    initial: {
      opacity: 0, // Hidden initially
      scale: 0.8, // Smaller initially
      rotate: -10, // Slight rotation
    },
    animate: {
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
      transition: { duration: 0.7 },
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed w-full h-full inset-0 bg-black/50 backdrop-blur-sm z-10 overscroll-contain overflow-y-hidden
          "
        onClick={onClose}
      />
      <div className="">
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 space-y-3">
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
              className="w-full h-full p-2 bg-white rounded-lg shadow-md"
              style={{ transformStyle: "preserve-3d" }}
              animate={controls}
            >
              {/* Front Face */}
              {content.variant === "poster" ? (
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
                        src={content.image}
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
                  src={content.image}
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
                        {content.name}
                      </h2>
                    </div>

                    <div className="space-y-3">
                      <p className="font-semibold">
                        Num:
                        <span className="font-normal ml-2">
                          {content.number}
                        </span>
                      </p>
                      <p className="font-semibold">
                        Team:
                        <span className="font-normal ml-2">{content.team}</span>
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
          {/* Card Selectior */}
          <div className="flex fixed gap-3 items-center justify-center overflow-x-auto  z-50">
            <div className="w-24 h-fit  rounded-md">
              <Image alt="" src={card1} className="rounded-md" />
            </div>
            <div className="w-24 h-fit  rounded-md">
              <Image alt="" src={card2} className="rounded-md" />
            </div>{" "}
            <div className="w-24 h-fit  rounded-md">
              <Image alt="" src={card1} className="rounded-md" />
            </div>{" "}
            <div className="w-24 h-fit  rounded-md">
              <Image alt="" src={card2} className="rounded-md" />
            </div>{" "}
            <div className="w-24 h-fit  rounded-md">
              <Image alt="" src={card1} className="rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
