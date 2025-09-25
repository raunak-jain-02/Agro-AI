import React from 'react';
import { motion } from 'framer-motion';

export const FloatingParticles: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
};

export const FloatingShapes: React.FC = () => {
  const shapes = [
    { size: 'w-8 h-8', color: 'bg-primary/10', duration: 15 },
    { size: 'w-6 h-6', color: 'bg-accent/10', duration: 18 },
    { size: 'w-4 h-4', color: 'bg-success/10', duration: 12 },
    { size: 'w-10 h-10', color: 'bg-primary/5', duration: 22 },
    { size: 'w-5 h-5', color: 'bg-accent/15', duration: 16 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.size} ${shape.color} rounded-full`}
          initial={{
            x: Math.random() * 100 + "%",
            y: "100%",
          }}
          animate={{
            y: "-10%",
            x: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%"
            ]
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export const AnimatedGradient: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      animate={{
        background: [
          "radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)",
          "radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)",
          "radial-gradient(circle at 40% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)",
          "radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)"
        ]
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "loop"
      }}
    />
  );
};

export const GeometricShapes: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Triangle */}
      <motion.div
        className="absolute top-1/4 left-1/4"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-primary/10" />
      </motion.div>

      {/* Square */}
      <motion.div
        className="absolute top-3/4 right-1/4 w-3 h-3 bg-accent/10 rounded-sm"
        animate={{
          rotate: -360,
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Circle */}
      <motion.div
        className="absolute top-1/2 right-1/3 w-4 h-4 bg-success/10 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Hexagon */}
      <motion.div
        className="absolute bottom-1/4 left-1/3"
        animate={{
          rotate: 360,
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-4 h-4 bg-primary/10 transform rotate-45" 
             style={{
               clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
             }}
        />
      </motion.div>
    </div>
  );
};

export const MouseFollower: React.FC = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      animate={{
        x: mousePosition.x - 10,
        y: mousePosition.y - 10,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
        mass: 0.8
      }}
    >
      <div className="w-5 h-5 bg-primary/20 rounded-full blur-sm" />
    </motion.div>
  );
};

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary/30 origin-left z-50"
      style={{ scaleX: scrollProgress }}
    />
  );
};
