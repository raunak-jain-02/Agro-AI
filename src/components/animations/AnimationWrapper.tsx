import React from 'react';
import { motion } from 'framer-motion';

interface AnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  type?: 'spring' | 'tween';
  once?: boolean;
}

export const FadeInUp: React.FC<AnimationWrapperProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  duration = 0.6,
  type = "spring",
  once = true
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration,
        delay,
        type,
        ...(type === 'spring' && {
          damping: 25,
          stiffness: 100
        })
      }}
    >
      {children}
    </motion.div>
  );
};

export const FadeInDown: React.FC<AnimationWrapperProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  duration = 0.6,
  type = "spring",
  once = true
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: -60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration,
        delay,
        type,
        ...(type === 'spring' && {
          damping: 25,
          stiffness: 100
        })
      }}
    >
      {children}
    </motion.div>
  );
};

export const FadeInLeft: React.FC<AnimationWrapperProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  duration = 0.6,
  type = "spring",
  once = true
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration,
        delay,
        type,
        ...(type === 'spring' && {
          damping: 25,
          stiffness: 100
        })
      }}
    >
      {children}
    </motion.div>
  );
};

export const FadeInRight: React.FC<AnimationWrapperProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  duration = 0.6,
  type = "spring",
  once = true
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration,
        delay,
        type,
        ...(type === 'spring' && {
          damping: 25,
          stiffness: 100
        })
      }}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn: React.FC<AnimationWrapperProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  duration = 0.5,
  type = "spring",
  once = true
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration,
        delay,
        type,
        ...(type === 'spring' && {
          damping: 25,
          stiffness: 100
        })
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
}> = ({ 
  children, 
  className = "",
  staggerChildren = 0.1,
  delayChildren = 0
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren,
            delayChildren
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}> = ({ 
  children, 
  className = "",
  direction = 'up'
}) => {
  const directionVariants = {
    up: { y: 60 },
    down: { y: -60 },
    left: { x: -60 },
    right: { x: 60 }
  };

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { 
          opacity: 0, 
          ...directionVariants[direction]
        },
        show: { 
          opacity: 1, 
          x: 0,
          y: 0,
          transition: {
            type: "spring",
            damping: 25,
            stiffness: 100
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};
