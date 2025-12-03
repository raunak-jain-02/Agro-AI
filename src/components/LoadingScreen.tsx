import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  minLoadTime?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onLoadingComplete, 
  minLoadTime = 2000 
}) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  // Add reduced motion detection
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const elapsed = Date.now() - startTime;
        const targetProgress = Math.min((elapsed / minLoadTime) * 100, 100);
        const increment = (targetProgress - prev) * 0.1;
        return prev + increment;
      });
    }, 16);

    // Complete loading after minimum time
    const completeTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(onLoadingComplete, 500);
      }, 300);
    }, minLoadTime);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [minLoadTime, onLoadingComplete]);

  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const logoVariants = {
    initial: { 
      scale: 0.8, 
      opacity: 0,
      rotate: -180
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    initial: { 
      opacity: 0, 
      y: 20 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const progressBarVariants = {
    initial: { width: 0 },
    animate: { 
      width: `${progress}%`,
      transition: {
        duration: 0.1,
        ease: "easeOut"
      }
    }
  };

  const particleVariants = {
    animate: {
      y: [0, -20, 0],
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center"
        >
          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated Gradient Background */}
            <motion.div
              className="absolute inset-0"
              animate={prefersReducedMotion ? {} : {
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 70%)",
                  "radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 70%)",
                  "radial-gradient(circle at 40% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 70%)",
                  "radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 70%)"
                ]
              }}
              transition={prefersReducedMotion ? { duration: 0 } : {
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Floating Particles */}
            {!prefersReducedMotion && Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/20 rounded-full"
                variants={particleVariants}
                animate="animate"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center">
            {/* Animated Logo */}
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate={prefersReducedMotion ? undefined : (progress < 90 ? "animate" : "pulse")}
              className="mb-8"
            >
              <div className="relative">
                {/* Logo Container */}
                <motion.div
                  className="w-20 h-20 mx-auto rounded-full bg-gradient-primary flex items-center justify-center shadow-2xl"
                  animate={prefersReducedMotion ? {} : {
                    boxShadow: [
                      "0 0 20px rgba(34, 197, 94, 0.3)",
                      "0 0 40px rgba(34, 197, 94, 0.5)",
                      "0 0 20px rgba(34, 197, 94, 0.3)"
                    ]
                  }}
                  transition={prefersReducedMotion ? { duration: 0 } : {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    animate={prefersReducedMotion ? {} : { rotate: 360 }}
                    transition={prefersReducedMotion ? { duration: 0 } : {
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Leaf className="h-10 w-10 text-primary-foreground" />
                  </motion.div>
                </motion.div>

                {/* Orbiting Elements */}
                <motion.div
                  className="absolute inset-0"
                  animate={prefersReducedMotion ? {} : { rotate: -360 }}
                  transition={prefersReducedMotion ? { duration: 0 } : {
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="relative w-full h-full">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
                      <div className="w-3 h-3 bg-accent rounded-full" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1">
                      <div className="w-2 h-2 bg-success rounded-full" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Title & Subtitle */}
            <motion.div
              variants={textVariants}
              initial="initial"
              animate="animate"
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-gradient mb-2">
                AgroAI
              </h1>
              <p className="text-muted-foreground text-lg">
                Your Agricultural Intelligence Platform
              </p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="w-64 mx-auto mb-6"
            >
              <div className="relative">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    variants={progressBarVariants}
                    initial="initial"
                    animate="animate"
                    className="h-full bg-gradient-primary rounded-full relative"
                  >
                    {/* Shimmer Effect */}
                    {!prefersReducedMotion && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ["-100%", "100%"]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    )}
                  </motion.div>
                </div>
                {!prefersReducedMotion && (
                  <motion.p
                    className="text-sm text-muted-foreground mt-2 text-center"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {Math.round(progress)}% Loading...
                  </motion.p>
                )}
                {prefersReducedMotion && (
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    {Math.round(progress)}% Loading...
                  </p>
                )}
              </div>
            </motion.div>

            {/* Loading Messages */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="text-center"
            >
              {!prefersReducedMotion ? (
                <motion.p
                  className="text-sm text-muted-foreground"
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {progress < 30 && "Initializing agricultural intelligence..."}
                  {progress >= 30 && progress < 60 && "Loading crop analysis models..."}
                  {progress >= 60 && progress < 90 && "Connecting to market data..."}
                  {progress >= 90 && "Almost ready! 🌱"}
                </motion.p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {progress < 30 && "Initializing agricultural intelligence..."}
                  {progress >= 30 && progress < 60 && "Loading crop analysis models..."}
                  {progress >= 60 && progress < 90 && "Connecting to market data..."}
                  {progress >= 90 && "Almost ready! 🌱"}
                </p>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
