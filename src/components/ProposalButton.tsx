import React, { useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const ProposalButton: React.FC = () => {
  const controls = useAnimation();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(1);

  const positions = [
    { x: -200, y: 0 }, // left
    { x: 200, y: 0 }, // right
    { x: 0, y: -200 }, // top
    { x: 0, y: 200 }, // bottom
    { x: -150, y: -150 }, // top-left
    { x: 150, y: -150 }, // top-right
    { x: -150, y: 150 }, // bottom-left
    { x: 150, y: 150 }, // bottom-right
  ];

  const moveButton = async () => {
    if (!buttonRef.current) return;

    setPosition((prev) => (prev + 1) % positions.length);

    await controls.start({
      scale: 0.5,
      opacity: 0,
      transition: { duration: 0.2 },
    });

    await controls.start({
      ...positions[position],
      transition: { duration: 0 },
    });

    await controls.start({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    });
  };

  return (
    <motion.div
      ref={buttonRef}
      className="absolute"
      initial={{ ...positions[0], scale: 1 }}
      animate={controls}>
      <div className="">
        <motion.button
          className="h-32 w-48"
          onHoverStart={moveButton}
          onClick={moveButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}>
          <button className="flex items-center gap-2 h-8 px-6 py-4 bg-gray-500 text-white rounded-full font-bold text-4xl shadow-lg hover:bg-gray-600 transition-colors">
            <span className="text-gray-400 text-xs"> No</span> 💔
          </button>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProposalButton;
