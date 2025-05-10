import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

// Typing animation component
const TypedText = ({ text, speed = 75 }: { text: string, speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else {
      setIsDone(true);
    }
  }, [currentIndex, text, speed]);

  return (
    <span>
      {displayedText}
      {!isDone && <span className="animate-pulse">|</span>}
    </span>
  );
};

// Floating gear animation component
const FloatingGear = ({ size, delay, x, y, speed }: { size: number, delay: number, x: number, y: number, speed: number }) => {
  return (
    <motion.div 
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: [0.2, 0.4, 0.2], 
        y: [y, y - 15, y],
        rotate: [0, 360 * speed]
      }}
      transition={{ 
        duration: 8 * (1/speed), 
        repeat: Infinity, 
        delay: delay, 
        ease: "easeInOut" 
      }}
    >
      <svg viewBox="0 0 512 512" className="w-full h-full text-primary opacity-20">
        <path fill="currentColor" d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-16 160H320v-38.6c.9-.3 1.8-.5 2.7-.8 9.9-2.5 19.2-6.1 27.9-10.6 11.7 10.4 23.4 20.9 35.1 31.3-3.3 3.8-6.2 7.8-8.5 12.3-3.1 5.8-5.3 12.1-6.7 18.5h77.5v-12zm-126.6-39.9c24.5-10.8 35-39.4 24.2-63.9s-39.4-35-63.9-24.2c-11.8 5.2-20.4 15.2-24.2 27.3-5.6 18.2-1.4 38.2 11.7 52.1l-15.5 15.5c-39-22.4-87.4-17.8-121.6 11.3C117.8 171.7 112 159.3 112 146.7V112H64v34.7c0 53.5 43.2 96.7 96.6 97h.2c.7 0 1.4 0 2.1-.1 40.3 29.4 93.5 34.3 138.4 14.3l12.4 12.4c-.5.3-.9.6-1.4 1-9.8 7.5-17.8 16.8-23.6 27.5-3.9 7.1-6.9 14.6-8.9 22.5.7-.4 1.4-.8 2.1-1.1 10.5-5.9 22.2-9.6 34.5-11v-31.6zm-252.3 91v16H112v-16c0-13.3-10.7-24-24-24s-24 10.7-24 24v17.3c0 47.1 36.4 85.7 82.5 89.4 13.3 1.1 25.6-9.2 26.6-22.5.4-4.5-.4-9-2.1-13.2 12.9-15.6 20.6-35.2 20.6-56.7 0-22.1-8.1-42.3-21.6-57.8-6.8 8.7-17.3 14.5-29.3 14.5zm332.2 79.9c3.2-14.4 17.5-23.3 31.9-20.1 14.4 3.2 23.3 17.5 20.1 31.9-2.6 11.5-12.2 19.9-23.9 20.8-18.6 1.5-36.7-8.9-44.1-25.7l40-6.9zm-108.8 9.3c-12.5-14.3-15.4-35.2-6-52.5 0 0-7.3-16-18.3-23.5 6.8-4.1 11.5-11.3 11.5-19.8 0-12.8-10.4-23.1-23.1-23.1-12.8 0-23.1 10.4-23.1 23.1 0 9 5.1 16.7 12.6 20.7-9.7 5.6-17.7 22.0-17.7 22.0 10.2 16.6 8.3 38.3-4.8 52.9-7.1 7.9-16.6 13.3-27.2 15.2 3.3-7.1 5.1-15.1 5.1-23.4 0-32.1-26-58.1-58.1-58.1S248 307.9 248 340c0 7.3 1.3 14.3 3.8 20.7-16.4-4.4-30.4-14.6-39.6-28.8-15.9 3.2-25.4 18.9-21.3 34.8 3.5 13.5 16.1 22.4 29.8 22.1 30.8-.7 57.5-20.0 69.4-47.8l30.8-5.3c6.7 10.7 16.9 19.1 29.1 23.6 3.3 11.3 13.7 19.5 26 19.5 15 0 27.2-12.2 27.2-27.2-.1-12.6-8.5-23.1-19.9-26.4z"/>
      </svg>
    </motion.div>
  );
};

// Circuit line animation
const CircuitLine = ({ startX, startY, length, angle, delay, duration }: 
                      { startX: number, startY: number, length: number, angle: number, delay: number, duration: number }) => {
  return (
    <motion.div 
      className="absolute bg-secondary h-0.5 opacity-30 origin-left"
      style={{ 
        left: `${startX}%`, 
        top: `${startY}%`,
        width: length,
        transform: `rotate(${angle}deg)` 
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ 
        duration: duration,
        delay: delay,
        ease: "easeInOut" 
      }}
    >
      <motion.div 
        className="absolute right-0 w-1.5 h-1.5 bg-secondary rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.3,
          delay: delay + duration - 0.3
        }}
      />
    </motion.div>
  );
};

export default function HeroSection() {
  // Word cycling animation
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ["Robotics", "Automation", "Mechatronics", "Innovation"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="pt-28 pb-20 md:pt-32 md:pb-24 px-4 overflow-hidden relative">
      {/* Background circuit elements */}
      <CircuitLine startX={-5} startY={30} length={120} angle={20} delay={0.5} duration={1.5} />
      <CircuitLine startX={80} startY={80} length={150} angle={160} delay={1.2} duration={1.3} />
      <CircuitLine startX={90} startY={20} length={100} angle={100} delay={0.8} duration={1} />
      <CircuitLine startX={5} startY={70} length={80} angle={-10} delay={1.5} duration={1.2} />
      
      {/* Floating gears */}
      <FloatingGear size={60} delay={0.5} x={85} y={25} speed={0.5} />
      <FloatingGear size={40} delay={1.2} x={15} y={60} speed={0.7} />
      <FloatingGear size={50} delay={0.8} x={75} y={75} speed={0.6} />
      
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center relative z-10">
        <motion.div 
          className="md:w-1/2 mt-8 md:mt-0 md:pr-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-dark">
            <motion.span 
              className="text-primary inline-block"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {words[currentWordIndex]}
            </motion.span>
            <br />Design Engineer
          </h1>
          
          <h2 className="font-poppins text-2xl md:text-3xl mt-3 text-secondary">
            <TypedText text="Oscar Jones" speed={100} />
          </h2>
          
          <p className="text-xl font-medium text-primary mt-2">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              Undergraduate Engineer (Mechatronics & Medical Engineering)
            </motion.span>
          </p>
          <p className="text-lg text-gray-700">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.8 }}
            >
              Industry Lead @ QUT Robotics Club | Undergraduate Engineer @ Multicom Resources
            </motion.span>
          </p>
          
          <motion.p 
            className="mt-6 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Specializing in robotics and automation systems with a passion for creating intelligent mechanical solutions that solve complex engineering challenges.
          </motion.p>
          
          <motion.div 
            className="mt-8 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <Button 
              asChild
              variant="default" 
              className="relative overflow-hidden group bg-primary hover:bg-opacity-90 text-white py-3 px-6"
            >
              <a href="#projects">
                <span className="relative z-10">View My Work</span>
                <span className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            </Button>
            
            <Button
              asChild
              variant="outline"
              className="relative overflow-hidden group border-2 border-primary text-primary hover:text-white py-3 px-6"
            >
              <a href="#contact">
                <span className="relative z-10">Get In Touch</span>
                <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            </Button>
          </motion.div>
          
          <motion.div 
            className="mt-8 flex space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            {[
              { href: "https://linkedin.com", icon: <FaLinkedin className="text-2xl" />, label: "LinkedIn" },
              { href: "https://github.com", icon: <FaGithub className="text-2xl" />, label: "GitHub" },
              { href: "https://twitter.com", icon: <FaTwitter className="text-2xl" />, label: "Twitter" }
            ].map((social, index) => (
              <motion.a 
                key={social.label}
                href={social.href} 
                className="text-dark hover:text-primary transition-all hover:scale-110" 
                aria-label={social.label}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + (index * 0.1), duration: 0.3 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            {/* Animated glowing effect behind image */}
            <motion.div 
              className="absolute -inset-2 bg-secondary rounded-full opacity-30 blur-xl"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Rotating circles around image */}
            <motion.div 
              className="absolute inset-0 border-4 border-dashed border-primary rounded-full -m-6 opacity-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            
            <motion.div 
              className="absolute inset-0 border-4 border-dotted border-secondary rounded-full -m-12 opacity-10"
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            
            <motion.img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=600&h=600" 
              alt="Oscar Jones, Mechatronics Engineer" 
              className="w-64 h-64 object-cover rounded-full border-4 border-white shadow-lg relative z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
