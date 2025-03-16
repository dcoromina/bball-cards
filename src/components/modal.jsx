import React, { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import Image from "next/image";

import allstar from "/public/images/alstar.png";
import champ from "/public/images/champ.png";
import mvp from "/public/images/mvp.png";
import camera from "/public/images/camera.png";

import Cards from "@/components/data";
import { AnimatePresence, motion } from "framer-motion";

// Modal Component
const Modal = ({ isOpen, onClose, content }) => {
  const [activeVariant, setActiveVariant] = useState(content);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [variants, setVariants] = useState([]);
  const carouselRef = useRef(null);
  const [dragConstraints, setDragConstraints] = useState(0);

  // Find all variants of the selected card
  useEffect(() => {
    if (content && content.name) {
      // Find related cards with the same name (variants)
      const cardVariants = Cards.filter((card) => card.name === content.name);
      setVariants(cardVariants.length > 0 ? cardVariants : [content]);
      setActiveVariant(content);
    }
  }, [content]);

  // Set up drag constraints for the card selector
  useEffect(() => {
    if (carouselRef.current) {
      const { scrollWidth, offsetWidth } = carouselRef.current;
      setDragConstraints(-(scrollWidth - offsetWidth));
    }
  }, [variants, carouselRef]);

  // Simplified flip handler - just toggles the state
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleVariantSelect = (variant) => {
    setActiveVariant(variant);
    setIsFlipped(false); // Reset to front face when changing cards
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-50 bg-gray-800/80 rounded-full p-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            onClick={onClose}
          >
            <X size={24} />
          </button>

          {/* Main card display - now just toggling between front and back */}
          <motion.div
            className="w-72 aspect-[2/3]"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={handleFlip}
          >
            {!isFlipped ? (
              // Front Face - shown when not flipped
              <div className="w-full h-full bg-white rounded-xl shadow-2xl overflow-hidden">
                {activeVariant?.variant === "poster" ? (
                  <div
                    className="w-full h-full relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {!isHovered ? (
                      <>
                        <Image
                          className="h-full w-full object-cover"
                          alt={activeVariant.name || "Card"}
                          src={activeVariant.image}
                          priority
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5, y: -350, x: 30 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
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
                      </>
                    ) : (
                      <div className="w-full h-full bg-black rounded-2xl overflow-hidden">
                        <video
                          src={"/videos/vidja.mp4"}
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <Image
                    className="h-full w-full object-fill border-8 border-white rounded-2xl"
                    alt={activeVariant?.name || "Card"}
                    src={activeVariant?.image}
                    priority
                  />
                )}
              </div>
            ) : (
              // Back Face - shown when flipped
              <div className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="h-full bg-gradient-to-br from-gray-800 to-gray-900 p-4 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">
                      {activeVariant?.name}
                    </h2>
                    <div className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                      {activeVariant?.pack?.toUpperCase()}
                    </div>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-3 mb-4">
                    <div className="grid grid-cols-2 gap-2 text-white">
                      <div>
                        <p className="text-gray-400 text-xs">NUMBER</p>
                        <p className="font-semibold">{activeVariant?.number}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">TEAM</p>
                        <p className="font-semibold">{activeVariant?.team}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-gray-400 text-xs mb-2">ACHIEVEMENTS</p>
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
                        <p className="text-gray-400 text-xs text-center">MVP</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Card variant selector carousel */}
          {variants.length > 1 && (
            <div className="mt-8 w-full max-w-md">
              <div className="relative">
                {/* Left scroll button */}
                <button
                  className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 rounded-full p-1.5 text-white shadow-lg"
                  onClick={() => {
                    if (carouselRef.current) {
                      carouselRef.current.scrollBy({
                        left: -100,
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Scrollable cards container */}
                <div className="relative overflow-hidden mx-6">
                  <motion.div
                    ref={carouselRef}
                    className="flex gap-3 p-2 overflow-x-auto scrollbar-hide"
                    drag="x"
                    dragConstraints={{ right: 0, left: dragConstraints }}
                    style={{ cursor: "grab" }}
                  >
                    {variants.map((variant, index) => (
                      <motion.div
                        key={variant.id || index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`min-w-[5rem] aspect-[2/3] rounded-lg overflow-hidden cursor-pointer flex-shrink-0 transition-all relative
                          ${
                            activeVariant?.id === variant.id
                              ? "ring-2 ring-indigo-500 scale-105"
                              : "opacity-80"
                          }`}
                        onClick={() => handleVariantSelect(variant)}
                      >
                        <Image
                          src={variant.image}
                          alt={variant.name || `Variant ${index}`}
                          className="w-full h-full object-cover"
                          width={80}
                          height={120}
                        />
                        {variant.variant && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-0.5 px-1">
                            <p className="text-white text-[0.6rem] text-center">
                              {variant.variant}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Right scroll button */}
                <button
                  className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 rounded-full p-1.5 text-white shadow-lg"
                  onClick={() => {
                    if (carouselRef.current) {
                      carouselRef.current.scrollBy({
                        left: 100,
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
