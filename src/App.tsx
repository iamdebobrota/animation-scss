import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import Confetti from "react-confetti";
import PhotoCube from "./components/PhotoCube";
import ProposalButton from "./components/ProposalButton";
import BlossomingFlowers from "./components/NightAnimation";

function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleYesClick = () => {
    setShowConfetti(true);
    setShowSuccess(true);
  };

  const flowers = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    scale: 0.5 + Math.random() * 0.5,
    rotate: Math.random() * 360,
  }));

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.body.classList.remove("not-loaded");
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const images = [
    "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=4142&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1515890435782-59a5bb6ec191?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=4293&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1503135935062-b7d1f5a0690f?q=80&w=4287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1517330283827-2527c57981ad?q=80&w=4138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1516646085441-e1719f13aa3e?q=80&w=3356&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-pink-200 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <BlossomingFlowers />
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}

      <AnimatePresence mode="wait">
        {!showSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-12">
            <motion.div
              className="relative"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}>
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-pink-600 text-center"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}>
                Are you interested to became a member of our community?
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="inline-block ml-2">
                  <Heart
                    className="inline-block text-red-500"
                    fill="currentColor"
                  />
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
              className="my-12 relative">
              <PhotoCube />
            </motion.div>

            <div className="flex items-center justify-center gap-24 w-full mt-8 relative">
              <motion.div className="relative">
                <motion.button
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 bg-pink-500 text-white rounded-full font-bold text-xl shadow-lg hover:bg-pink-600 transition-colors relative z-10"
                  onClick={handleYesClick}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.6,
                    bounce: 0.2,
                  }}>
                  Yes! 💝
                </motion.button>
                <motion.div
                  variants={{
                    hover: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                  className="absolute inset-0 -z-10">
                  {flowers.map((flower) => (
                    <motion.div
                      key={flower.id}
                      className="absolute left-1/2 top-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2"
                      initial={{ opacity: 0, scale: 0 }}
                      variants={{
                        hover: {
                          opacity: [0, 1, 0],
                          scale: [0, flower.scale, 0],
                          x: [0, (Math.random() - 0.5) * 100],
                          y: [0, (Math.random() - 0.5) * 100],
                          rotate: [0, flower.rotate],
                          transition: {
                            duration: 2,
                            repeat: Infinity,
                            delay: flower.delay,
                          },
                        },
                      }}>
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-300 to-red-300 shadow-lg" />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <ProposalButton />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            whileHover={{ rotateX: 10, rotateY: 10, scale: 1.05 }}
            transition={{ duration: 1 }}
            className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-lg relative overflow-hidden"
            style={{
              boxShadow:
                "0 10px 30px rgba(255, 105, 180, 0.5), 0 5px 15px rgba(173, 216, 230, 0.5)",
            }}>
            <motion.h2
              className="text-3xl font-bold text-pink-600 mb-4"
              animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}>
              Congratulations! 🎉
            </motion.h2>

            {/* Description */}
            <p className="text-gray-700 mb-6">
              You've made me the happiest person alive! Our love story begins
              now... ❤️
            </p>

            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-4">
              {images.map((el, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.1, rotateY: 10 }}
                  className="relative overflow-hidden rounded-lg shadow-lg"
                  style={{
                    boxShadow:
                      "0 5px 15px rgba(255, 182, 193, 0.5), 0 3px 10px rgba(100, 149, 237, 0.5)",
                  }}>
                  <motion.img
                    src={el}
                    alt="Celebration flower"
                    className="w-full h-32 object-cover"
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 to-transparent" />
                </motion.div>
              ))}
            </div>

            {/* Floating 3D Shadow Effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                boxShadow: [
                  "0 0 30px rgba(255, 105, 180, 0.4)",
                  "0 0 40px rgba(100, 149, 237, 0.5)",
                  "0 0 30px rgba(255, 182, 193, 0.4)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
