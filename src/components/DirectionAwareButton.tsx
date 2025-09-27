'use client';
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DirectionAwareButtonProps {
  text: string;
  className?: string;
}

const DirectionAwareButton: React.FC<DirectionAwareButtonProps> = ({ text, className = '' }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [direction, setDirection] = useState<'top' | 'right' | 'bottom' | 'left' | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const edgeDistances = {
      top: y,
      right: rect.width - x,
      bottom: rect.height - y,
      left: x,
    };

    const minDistance = Math.min(...Object.values(edgeDistances));
    const entryDirection = Object.keys(edgeDistances).find(
      (key) => edgeDistances[key as keyof typeof edgeDistances] === minDistance
    ) as 'top' | 'right' | 'bottom' | 'left';

    setDirection(entryDirection);
  };

  const handleMouseLeave = () => {
    setDirection(null);
  };

  const variants = {
    top: { 
      backgroundPosition: ['0% 100%', '0% 0%'],
      scale: [0, 1],
      opacity: [0, 1]
    },
    right: { 
      backgroundPosition: ['0% 0%', '100% 0%'],
      scale: [0, 1],
      opacity: [0, 1]
    },
    bottom: { 
      backgroundPosition: ['0% 0%', '0% 100%'],
      scale: [0, 1],
      opacity: [0, 1]
    },
    left: { 
      backgroundPosition: ['100% 0%', '0% 0%'],
      scale: [0, 1],
      opacity: [0, 1]
    },
    exit: { 
      scale: 0,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-lg px-6 py-3 text-black font-semibold bg-gray-800 transition-colors duration-300 ${className}`}
    >
      <span className="relative z-10">{text}</span>
      <AnimatePresence>
        {direction && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-500 to-yellow-500"
            initial={{ scale: 0, opacity: 0 }}
            animate={direction}
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </button>
  );
};

export default DirectionAwareButton;