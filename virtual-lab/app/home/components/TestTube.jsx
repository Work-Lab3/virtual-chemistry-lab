import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useColor } from '@/context/contextProvider';

export default function TestTube({ chemicals, reactionResult }) {
  const { color } = useColor();
  const canvasRef = useRef(null);
  const controls = useAnimation();
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawBubbles(ctx);
      }
    }
  }, [chemicals, reactionResult]);

  useEffect(() => {
    if (reactionResult) {
      controls.start({
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
        transition: { duration: 0.5, repeat: Infinity }
      });
    } else {
      controls.stop();
    }
  }, [reactionResult, controls]);

  const drawBubbles = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const bubbleCount = 20;
    for (let i = 0; i < bubbleCount; i++) {
      const x = Math.random() * ctx.canvas.width;
      const y = Math.random() * ctx.canvas.height;
      const radius = Math.random() * 4 + 1;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fill();
    }
  };

  const getLiquidStyle = () => {
    if (reactionResult) {
      return { backgroundColor: color };
    } else if (chemicals.length === 2) {
      return {
        background: `linear-gradient(to top, ${chemicals[0].color} 50%, ${chemicals[1].color} 50%)`,
      };
    } else if (chemicals.length === 1) {
      return { backgroundColor: chemicals[0].color };
    }
    return { backgroundColor: color };
  };

  const handleShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 1000);
  };

  return (
    <motion.div
      className="relative w-32 h-80 perspective-1000 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      onClick={handleShake}
    >
      <motion.div
        className="absolute w-full h-full"
        animate={controls}
        style={{ rotate: isShaking ? [0, -5, 5, -5, 5, 0] : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full h-full transform-style-3d rotate-x-5">
          <div className="absolute w-full h-full bg-gradient-to-br from-gray-300 to-gray-100 rounded-b-full overflow-hidden shadow-lg">
            <div className="absolute inset-x-0 top-0 h-4 bg-gray-400 rounded-t-full"></div>
            <motion.div
              className="absolute bottom-0 left-0 right-0"
              initial={{ height: 0 }}
              animate={{ 
                height: chemicals.length > 0 ? (chemicals.length === 1 ? '50%' : '100%') : '0%'
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={getLiquidStyle()}
            >
              <canvas
                ref={canvasRef}
                width="128"
                height="320"
                className="absolute inset-0 w-full h-full"
              />
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 rounded-b-full"></div>
        </div>
      </motion.div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-gray-800 text-opacity-20 rotate-90">
        Test Tube
      </div>
    </motion.div>
  );
}

