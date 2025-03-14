"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Cards from "@/components/data";
import NBA from "/public/images/nba.png";
import EuroLeague from "/public/images/euroleague.png";
import NCAA from "/public/images/ncaa.png";
import { motion } from "framer-motion";
import Modal from "@/components/modal";

export default function CardGrid() {
  const [zoomedId, setZoomedId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [variantName, setVariantName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [league, setLeague] = useState("nba");
  const [searchTerm, setSearchTerm] = useState("");

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
      transition: { duration: 0.2 },
    },
  };

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

  const leagues = [
    { id: "nba", name: "NBA", logo: NBA },
    { id: "ncaa", name: "NCAA", logo: NCAA },
    { id: "euro", name: "EuroLeague", logo: EuroLeague },
  ];

  const filteredCards = Cards.filter(
    (c) =>
      c.pack === league &&
      c.variant === "regular" &&
      (searchTerm === "" ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.team.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-800 to-purple-900 p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">My Card Collection</h1>
      </div>

      {/* Filter and Search Section */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            {/* League Selection */}
            <div className="bg-gray-800 p-3 rounded-xl shadow-md w-full sm:w-auto">
              <h2 className="text-gray-300 text-sm mb-3 font-medium">
                Select League
              </h2>
              <div className="flex items-center justify-around gap-4">
                {leagues.map((item) => (
                  <motion.div
                    key={item.id}
                    onClick={() => setLeague(item.id)}
                    className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all ${
                      league === item.id
                        ? "bg-indigo-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-10 h-10 relative">
                      <Image
                        alt={item.name}
                        src={item.logo}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-xs mt-1 font-medium">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="absolute right-3 top-2.5 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Collection Stats */}
          <div className="bg-gray-800/50 rounded-lg p-3 flex justify-between items-center mb-4">
            <div>
              <span className="text-gray-400 text-sm">Showing </span>
              <span className="font-bold text-white">
                {filteredCards.length} cards
              </span>
              <span className="text-gray-400 text-sm"> from </span>
              <span className="font-bold text-indigo-400">
                {leagues.find((l) => l.id === league)?.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs px-2 py-1 bg-indigo-600/50 rounded-full">
                {filteredCards.length}/
                {
                  Cards.filter(
                    (c) => c.pack === league && c.variant === "regular"
                  ).length
                }{" "}
                Cards
              </div>
            </div>
          </div>
        </div>

        {/* Card Grid */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 ${
            zoomedId !== null ? "relative" : ""
          }`}
        >
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <motion.div
                key={card.id}
                onClick={() => handleItemClick(card.id, card.name)}
                className="relative aspect-[2/3] cursor-pointer bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                layoutId={`card-${card.id}`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30 z-10"></div>
                <Image
                  alt={card.name}
                  src={card.image}
                  fill
                  className="object-cover transition-transform"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent z-20">
                  <p className="text-white text-xs font-medium truncate">
                    {card.name}
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-gray-300 text-xs">{card.team}</p>
                    <span className="bg-indigo-600 text-white text-xs px-1.5 py-0.5 rounded-sm">
                      #{card.number}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-400 text-lg">
                No cards found. Try changing your filters.
              </p>
            </div>
          )}
        </div>

        {/* Empty state when no cards */}
        {filteredCards.length === 0 && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">No cards found</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find what you're
              looking for.
            </p>
          </div>
        )}
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          content={Cards.find((card) => card.id === selectedId) || {}}
          // Pass only the content prop to Modal to avoid the type error
          // You'll need to update your Modal component to handle variants internally
        />
      )}
    </div>
  );
}
