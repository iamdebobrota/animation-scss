import React, { useState } from "react";
import { motion } from "framer-motion";

const PhotoCube: React.FC = () => {
  const [isRotating, setIsRotating] = useState(false);

  const images = [
    "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=4142&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=4142&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=4142&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=4142&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=4142&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const sides = [
    { rotateY: 0, rotateX: 0, translateZ: 150 }, // front
    { rotateY: 180, rotateX: 0, translateZ: 150 }, // back
    { rotateY: 90, rotateX: 0, translateZ: 150 }, // right
    { rotateY: -90, rotateX: 0, translateZ: 150 }, // left
    { rotateY: 0, rotateX: 90, translateZ: 150 }, // top
    { rotateY: 0, rotateX: -90, translateZ: 150 }, // bottom
  ];

  return (
    <div className="w-[300px] h-[300px] relative perspective-1000">
      <motion.div
        className="w-full h-full relative transform-style-3d cursor-pointer"
        animate={
          isRotating
            ? {
                rotateY: [0, 360],
                rotateX: [0, 360],
              }
            : {
                rotateY: 0,
                rotateX: 0,
              }
        }
        transition={
          isRotating
            ? {
                duration: 10,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }
            : {
                duration: 0.8,
                ease: "easeOut",
              }
        }
        onHoverStart={() => setIsRotating(true)}
        onHoverEnd={() => setIsRotating(false)}>
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="absolute w-full h-full backface-hidden"
            style={{
              transform: `rotateX(${sides[index].rotateX}deg) rotateY(${sides[index].rotateY}deg) translateZ(${sides[index].translateZ}px)`,
              transformOrigin: "center",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}>
            <div className="w-full h-full p-4">
              <div
                className="w-full h-full relative rounded-lg overflow-hidden"
                style={{
                  boxShadow: "0 0 30px rgba(0,0,0,0.3)",
                  transform: "translateZ(0)",
                }}>
                <img
                  src={img}
                  alt={`Side ${index + 1}`}
                  className="w-full h-full object-cover scale-150"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PhotoCube;
