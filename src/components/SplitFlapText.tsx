import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface RandomCharacterRevealProps {
  text: string;
  isActive: boolean;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

export default function RandomCharacterReveal({ text, isActive }: RandomCharacterRevealProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (isActive) {
      const chars = text.split('');
      let iteration = 0;
      
      const intervalId = setInterval(() => {
        setDisplayText(
          chars.map((char, index) => {
            if (index < iteration) {
              return char;
            }
            return characters[Math.floor(Math.random() * characters.length)];
          }).join('')
        );
        
        if (iteration >= chars.length) {
          clearInterval(intervalId);
          setDisplayText(text);
        }
        
        iteration += 1/2;
      }, 25);
      
      return () => clearInterval(intervalId);
    } else {
      setDisplayText(text);
    }
  }, [isActive, text]);

  return (
    <span className="inline-flex">
      {displayText.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={{
            opacity: isActive ? [0, 1] : 1
          }}
          transition={{
            duration: 0.2,
            delay: isActive ? index * 0.02 : 0,
            ease: "easeOut"
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}
