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
  // Remove unused state variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [league, setLeague] = useState("nba");
  const [searchTerm, setSearchTerm] = useState("");

  // Animation variants remain the same
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-800 to-purple-900 p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">My Card Collection</h1>
      </div>

      {/* Sticky Filter and Search Section */}
      <div className="sticky top-0 z-40 transition-all duration-200">
        {/* Background with blur effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm border-b border-gray-700 shadow-lg"></div>

        {/* Content */}
        <div className="relative pt-3 pb-3 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-2">
              {/* League Filter Tabs */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-1 bg-gray-800/70 p-1 rounded-lg">
                  {leagues.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setLeague(item.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        league === item.id
                          ? "bg-indigo-600 text-white"
                          : "text-gray-400 hover:bg-gray-700/70 hover:text-gray-200"
                      }`}
                    >
                      <Image
                        src={item.logo}
                        alt={item.name}
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                    </button>
                  ))}
                </div>

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

              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
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
                  className="block w-full bg-gray-800/70 border border-gray-700 rounded-lg py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search by name or team..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    title="Clear search"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
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

      {/* Main Content with Cards */}
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-24">
        {/* Card Grid */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4`}
        >
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <motion.div
                key={card.id}
                onClick={() => handleItemClick(card.id)}
                className="relative aspect-[2/3] cursor-pointer bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
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
            // Empty state remains the same
            <div className="col-span-full text-center py-10">
              <p className="text-gray-400 text-lg">
                No cards found. Try changing your filters.
              </p>
            </div>
          )}
        </div>

        {/* Empty state when no cards - remains the same */}
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
              Try adjusting your search or filter criteria to find what
              you&apos;re looking for.
            </p>
          </div>
        )}
      </div>

      {/* Modal Component - remains the same */}
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
