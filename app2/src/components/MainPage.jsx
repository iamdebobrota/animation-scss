import { useState, useRef, useCallback, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Heart3D from './Heart3D';
import Scene3DBackground from './Scene3DBackground';
import { HeartIcon, CheckHeartIcon, XMarkIcon, SparkleIcon } from './Icons';

const MainPage = () => {
  const [noPos, setNoPos] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const noBtnRef = useRef(null);
  const navigate = useNavigate();

  const handleNoHover = useCallback(() => {
    const btn = noBtnRef.current;
    if (!btn) return;
    const btnW = btn.offsetWidth;
    const btnH = btn.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const zoneW = vw * 0.7;
    const zoneH = vh * 0.7;
    const offsetX = (vw - zoneW) / 2;
    const offsetY = (vh - zoneH) / 2;
    setNoPos({
      left: offsetX + Math.random() * (zoneW - btnW),
      top: offsetY + Math.random() * (zoneH - btnH),
    });
    setNoAttempts((prev) => prev + 1);
  }, []);

  const handleYesClick = () => {
    setShowCelebration(true);
    setTimeout(() => navigate('/thanks'), 1800);
  };

  const teaseMessages = [
    '',
    'Nice try...',
    'You sure about that?',
    "The button says no, but your heart says yes",
    "It's running away from you too!",
    'Okay, clearly you want to say YES',
  ];

  return (
    <div className="min-h-screen mesh-gradient-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Full-page 3D background */}
      <Scene3DBackground />

      <div className="z-10 flex flex-col items-center max-w-2xl mx-auto">
        {/* 3D Heart — the hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-72 h-72 md:w-96 md:h-96 -mb-8"
        >
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <HeartIcon className="w-24 h-24 text-rose-500 animate-pulse" />
              </div>
            }
          >
            <Heart3D className="w-full h-full" heartScale={1.3} />
          </Suspense>
        </motion.div>

        {/* Glass card with text */}
        <motion.div
          className="glass-card-solid px-8 py-10 md:px-12 md:py-12 text-center w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <motion.h1
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-gradient leading-tight mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Will You Be My
          </motion.h1>

          <motion.p
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-rose-800 italic mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Valentine?
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <SparkleIcon className="w-5 h-5 text-gold-500" />
            <span className="text-rose-600/60 font-body text-sm tracking-widest uppercase">
              A question from the heart
            </span>
            <SparkleIcon className="w-5 h-5 text-gold-500" />
          </motion.div>

          {/* Tease message */}
          <AnimatePresence mode="wait">
            {noAttempts > 0 && noAttempts <= 5 && (
              <motion.p
                key={noAttempts}
                className="text-rose-500 font-body text-sm mb-4 h-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {teaseMessages[Math.min(noAttempts, teaseMessages.length - 1)]}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <motion.button
              onClick={handleYesClick}
              className="btn-primary-glass flex items-center gap-2.5 text-lg"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <CheckHeartIcon className="w-5 h-5" fill="white" />
              Yes, I Do
            </motion.button>

            {!noPos && (
              <button
                ref={noBtnRef}
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoHover}
                className="btn-secondary-glass flex items-center gap-2 text-lg cursor-pointer"
              >
                <XMarkIcon className="w-5 h-5" />
                No
              </button>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* No button — portaled to body so no parent transform can trap it */}
      {noPos &&
        createPortal(
          <button
            ref={noBtnRef}
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            className="btn-secondary-glass flex items-center gap-2 text-lg cursor-pointer"
            style={{
              position: 'fixed',
              left: noPos.left,
              top: noPos.top,
              zIndex: 9999,
            }}
          >
            <XMarkIcon className="w-5 h-5" />
            No
          </button>,
          document.body
        )}

      {/* Celebration burst */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-white/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i / 24) * Math.PI * 2;
              const radius = 120 + Math.random() * 200;
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    scale: [0, 1.2, 0.8],
                    opacity: [1, 1, 0],
                    rotate: Math.random() * 360,
                  }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                >
                  <HeartIcon
                    className="w-6 h-6"
                    fill={['#DB2777', '#F472B6', '#FBBF24', '#FDA4AF'][i % 4]}
                  />
                </motion.div>
              );
            })}

            <motion.p
              className="font-display text-4xl md:text-6xl font-bold text-gradient z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              Yay!
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainPage;
