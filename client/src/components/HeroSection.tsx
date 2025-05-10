import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section id="home" className="pt-28 pb-20 md:pt-32 md:pb-24 px-4">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center">
        <motion.div 
          className="md:w-1/2 mt-8 md:mt-0 md:pr-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-dark">
            <span className="text-primary">Mechatronics</span> Design Engineer
          </h1>
          <h2 className="font-poppins text-2xl md:text-3xl mt-3 text-secondary">Oscar Jones</h2>
          <p className="mt-6 text-lg md:text-xl leading-relaxed">
            Specializing in robotics and automation systems with a passion for creating intelligent mechanical solutions that solve complex engineering challenges.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button 
              asChild
              variant="default" 
              className="bg-primary hover:bg-opacity-90 text-white py-3 px-6"
            >
              <a href="#projects">View My Work</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white py-3 px-6"
            >
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>
          <div className="mt-8 flex space-x-4">
            <a href="https://linkedin.com" className="text-dark hover:text-primary transition-colors" aria-label="LinkedIn">
              <FaLinkedin className="text-2xl" />
            </a>
            <a href="https://github.com" className="text-dark hover:text-primary transition-colors" aria-label="GitHub">
              <FaGithub className="text-2xl" />
            </a>
            <a href="https://twitter.com" className="text-dark hover:text-primary transition-colors" aria-label="Twitter">
              <FaTwitter className="text-2xl" />
            </a>
          </div>
        </motion.div>
        <motion.div 
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-secondary rounded-full opacity-20 blur-xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=600&h=600" 
              alt="Oscar Jones, Mechatronics Engineer" 
              className="w-64 h-64 object-cover rounded-full border-4 border-white shadow-lg relative z-10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
