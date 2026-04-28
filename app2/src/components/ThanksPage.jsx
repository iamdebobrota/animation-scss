import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Heart3D from './Heart3D';
import Scene3DBackground from './Scene3DBackground';
import { HeartIcon, SparkleIcon, CalendarIcon, ArrowLeftIcon } from './Icons';

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const ThanksPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen mesh-gradient-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Full-page 3D background */}
      <Scene3DBackground />

      <motion.div
        className="z-10 flex flex-col items-center max-w-2xl mx-auto w-full"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* 3D Heart */}
        <motion.div
          className="w-60 h-60 md:w-80 md:h-80 -mb-6"
          variants={fadeUp}
        >
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <HeartIcon className="w-20 h-20 text-rose-500 animate-pulse" />
              </div>
            }
          >
            <Heart3D className="w-full h-full" heartScale={1.1} heartColor="#BE185D" />
          </Suspense>
        </motion.div>

        {/* Glass card */}
        <motion.div
          className="glass-card-solid px-8 py-10 md:px-12 md:py-12 text-center w-full"
          variants={fadeUp}
        >
          {/* Sparkle decoration */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            variants={fadeUp}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
              >
                <SparkleIcon className="w-5 h-5 text-gold-500" />
              </motion.div>
            ))}
          </motion.div>

          <motion.h1
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-gradient leading-tight mb-4"
            variants={fadeUp}
          >
            You Said Yes!
          </motion.h1>

          <motion.p
            className="font-body text-lg md:text-xl text-rose-800/70 mb-3 max-w-md mx-auto leading-relaxed"
            variants={fadeUp}
          >
            Thank you for making this moment unforgettable.
          </motion.p>

          <motion.p
            className="font-display text-2xl md:text-3xl text-rose-700 italic mb-8"
            variants={fadeUp}
          >
            You make my heart complete
          </motion.p>

          {/* Decorative hearts row */}
          <motion.div
            className="flex justify-center gap-3 mb-10"
            variants={fadeUp}
          >
            {[
              { color: '#DB2777', size: 'w-6 h-6', delay: 0 },
              { color: '#F472B6', size: 'w-8 h-8', delay: 0.2 },
              { color: '#BE185D', size: 'w-10 h-10', delay: 0.4 },
              { color: '#F472B6', size: 'w-8 h-8', delay: 0.6 },
              { color: '#DB2777', size: 'w-6 h-6', delay: 0.8 },
            ].map((heart, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: heart.delay }}
              >
                <HeartIcon className={heart.size} fill={heart.color} />
              </motion.div>
            ))}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeUp}
          >
            <motion.button
              onClick={() => navigate('/')}
              className="btn-secondary-glass flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Start Over
            </motion.button>

            <motion.button
              onClick={() =>
                window.open(
                  'https://calendar.google.com/calendar/u/0/r/eventedit/new',
                  '_blank'
                )
              }
              className="btn-primary-glass flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <CalendarIcon className="w-5 h-5" />
              Save the Date
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Footer message */}
        <motion.p
          className="font-body text-sm text-rose-600/40 mt-8 tracking-wide"
          variants={fadeUp}
        >
          Looking forward to spending this special day with you
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ThanksPage;
