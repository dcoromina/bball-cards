"use client";
import Image from "next/image";
import React, { useState } from "react";
import Cards from "@/components/data";
import NBA from "/public/images/nba.png";
import EuroLeague from "/public/images/euroleague.png";
import NCAA from "/public/images/ncaa.png";
import { motion } from "framer-motion";
import Modal from "@/components/modal";

export default function CardGrid() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
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
      boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
      transition: { duration: 0.2 },
    },
  };

  const handleItemClick = (id: number) => {
    setSelectedId(id);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
      {/* Enhanced Header with TopStack Branding */}
      <div className="bg-gradient-to-r from-indigo-800 via-purple-700 to-indigo-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col items-center">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            TopStack
          </motion.h1>
          <motion.p
            className="text-indigo-200 mt-1 text-sm font-medium"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Premium Digital Card Collection
          </motion.p>
        </div>
      </div>

      {/* Improved Sticky Filter and Search Section */}
      <div className="sticky top-0 z-40 transition-all duration-300">
        {/* Background with enhanced blur effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 to-indigo-950/95 backdrop-blur-md border-b border-indigo-900/50 shadow-lg"></div>

        {/* Content */}
        <div className="relative pt-4 pb-4 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-2">
              {/* Enhanced League Filter Tabs */}
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div className="flex space-x-2 bg-slate-800/70 p-1.5 rounded-xl shadow-inner border border-indigo-950/50">
                  {leagues.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => setLeague(item.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        league === item.id
                          ? "bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-md"
                          : "text-gray-300 hover:bg-slate-700/70 hover:text-white"
                      }`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Image
                        src={item.logo}
                        alt={item.name}
                        width={22}
                        height={22}
                        className="w-5 h-5 object-contain"
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                    </motion.button>
                  ))}
                </div>

                <div className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-md text-white font-medium text-sm">
                  {filteredCards.length}/
                  {
                    Cards.filter(
                      (c) => c.pack === league && c.variant === "regular"
                    ).length
                  }{" "}
                  Cards
                </div>
              </div>

              {/* Improved Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-300"
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
                <input
                  type="text"
                  className="block w-full bg-slate-800/80 border border-indigo-900/50 rounded-xl py-2.5 pl-10 pr-10 text-sm placeholder-indigo-300/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-inner"
                  placeholder="Search by player name or team..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    title="Clear search"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-indigo-300 hover:text-white transition-colors"
                    onClick={() => setSearchTerm("")}
                  >
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Card Grid Section */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-24">
        {/* Card Grid with improved spacing */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <motion.div
                key={card.id}
                onClick={() => handleItemClick(card.id)}
                className="relative aspect-[2/3] cursor-pointer bg-gradient-to-br from-slate-800 to-indigo-900 rounded-xl overflow-hidden shadow-xl border border-indigo-800/30"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40 z-10"></div>
                <Image
                  alt={card.name}
                  src={card.image}
                  fill
                  className="object-cover transition-all hover:scale-105 duration-700"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent z-20">
                  <p className="text-white text-sm font-medium truncate">
                    {card.name}
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-indigo-200 text-xs">{card.team}</p>
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs px-2 py-0.5 rounded-md shadow-sm">
                      #{card.number}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-indigo-200 text-lg">
                No cards found. Try changing your filters.
              </p>
            </div>
          )}
        </div>

        {/* Enhanced empty state */}
        {filteredCards.length === 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-900/50 mb-4 border border-indigo-700/30 shadow-inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-indigo-400"
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
            <h3 className="text-xl font-medium mb-2 text-white">
              No cards found
            </h3>
            <p className="text-indigo-200 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find what
              you&apos;re looking for.
            </p>
          </motion.div>
        )}
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          content={Cards.find((card) => card.id === selectedId) || {}}
        />
      )}
    </div>
  );
}
