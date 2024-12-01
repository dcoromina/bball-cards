import React, { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

// Modal Component
const Modal = ({ isOpen, onClose, content }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleImageClick = (id) => {
    setShowDetails(!showDetails);
  };

  const handleBackgroundClick = () => {
    if (showDetails) {
      setShowDetails(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 overscroll-contain overflow-y-scroll
          animate-[fadeIn_1s_ease-in-out]"
        onClick={onClose}
      />

      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
          w-[69%] max-w-lg z-50 animate-[scaleIn_1s_ease-in-out]"
      >
        <div className="bg-transparent rounded-lg shadow-xl animate-[scaleIn_1s_ease-in-out]">
          {/* Header */}
          {/*  <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              {content.name}
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div> */}

          {/* Content */}
          <div className="p-4">
            <div className="space-y-4 ">
              <Image
                onClick={handleImageClick}
                className="w-full h-fit object-cover rounded-lg"
                alt="alt"
                src={content.image}
              />
              {showDetails && (
                <div
                  className="
                    absolute inset-0 
                    bg-black/50
                    rounded-lg 
                    p-6 
                    overflow-y-auto
                    shadow-xl
                  "
                  onClick={() => handleBackgroundClick()}
                >
                  <h2 className="text-2xl font-bold mb-4">{content.name}</h2>
                  <div className="space-y-3">
                    <p className="font-semibold">
                      Location:
                      <span className="font-normal ml-2">{content.number}</span>
                    </p>
                    <p className="font-semibold">
                      Date:
                      <span className="font-normal ml-2">{content.team}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          {/* <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg
                hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              Close
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg
                hover:bg-blue-600 active:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Modal;
