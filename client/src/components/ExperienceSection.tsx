import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { FaBriefcase, FaBuilding, FaCalendarAlt, FaAward } from "react-icons/fa";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
  isRightAligned: boolean;
  achievement?: string;
}

// Custom component for connecting dots with animated lines
const TimelineConnector = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="absolute w-0.5 bg-gray-200 h-full left-4 md:left-1/2 top-0 -translate-x-1/2 z-0">
      <motion.div 
        className="absolute w-full bg-primary h-0"
        initial={{ height: 0 }}
        animate={{ height: isActive ? "100%" : 0 }}
        transition={{ duration: 1.5 }}
      />
    </div>
  );
};

// Animated timeline dot
const TimelineDot = ({ active, onClick, isRight }: { active: boolean, onClick: () => void, isRight: boolean }) => {
  return (
    <motion.div 
      className={`w-7 h-7 rounded-full bg-white border-2 border-primary flex items-center justify-center absolute z-10 cursor-pointer
                 ${isRight ? 'right-0 translate-x-1/2' : 'left-1/2 -translate-x-1/2'}`}
      initial={{ scale: 0.8 }}
      animate={{ 
        scale: active ? [1, 1.2, 1] : 1,
        backgroundColor: active ? "#1a5f7a" : "#ffffff",
        borderColor: active ? "#ffffff" : "#1a5f7a"
      }}
      transition={{ 
        duration: 0.5,
        repeat: active ? Infinity : 0,
        repeatType: "reverse",
        repeatDelay: 1
      }}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
    >
      <FaBriefcase className={`text-xs ${active ? 'text-white' : 'text-primary'}`} />
    </motion.div>
  );
};

// Animated content card for experience details
const ExperienceCard = ({ 
  experience, 
  active, 
  index 
}: { 
  experience: ExperienceItem; 
  active: boolean;
  index: number;
}) => {
  const isRight = experience.isRightAligned;
  
  return (
    <motion.div 
      className={`bg-light p-4 md:p-6 rounded-lg shadow-md relative
                  ${isRight ? 'ml-6 md:ml-0' : 'ml-6 md:mr-0'} w-full`}
      initial={{ 
        opacity: 0,
        x: isRight ? 50 : -50,
      }}
      animate={{ 
        opacity: active ? 1 : 0.7,
        x: 0,
        boxShadow: active ? "0 10px 25px rgba(0,0,0,0.1)" : "0 4px 6px rgba(0,0,0,0.1)" 
      }}
      transition={{ 
        duration: 0.5,
        delay: active ? 0 : 0
      }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center mb-3">
        <FaBuilding className="text-teal-500 mr-2" />
        <h4 className="font-poppins font-semibold text-lg text-left text-teal-700">{experience.company}</h4>
      </div>
      
      <div className="flex items-center mb-4">
        <FaCalendarAlt className="text-teal-400 mr-2 text-sm" />
        <p className="font-poppins text-teal-600 text-xs md:text-sm text-left">{experience.period}</p>
      </div>
      
      <p className="font-poppins text-gray-800 mb-4 text-left text-sm md:text-base">
        {experience.description}
      </p>
      
      <div className="space-y-2">
        {experience.bullets.map((bullet, i) => (
          <motion.div 
            key={i}
            className="flex items-start"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: active ? 1 : 0.7, x: 0 }}
            transition={{ duration: 0.3, delay: active ? 0.1 + (i * 0.1) : 0 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 mt-2 mr-2 flex-shrink-0" />
            <p className="font-poppins text-gray-800 text-left text-sm md:text-base">{bullet}</p>
          </motion.div>
        ))}
      </div>
      
      {experience.achievement && (
        <div className="mt-4 p-3 bg-teal-50 rounded-md flex items-start border border-teal-200">
          <FaAward className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
          <p className="font-poppins text-teal-700 font-medium text-left text-sm md:text-base">{experience.achievement}</p>
        </div>
      )}
    </motion.div>
  );
};

export default function ExperienceSection() {
  const [activeExperience, setActiveExperience] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  const experiences: ExperienceItem[] = [
    {
      title: "Electrical & Control System Design",
      company: "QUT HeartBeats",
      period: "Nov 2023 - Current",
      description: "I'm part of the QUT HeartBeats team competing in the Heart Hackathon, where we're in the early stages of developing a concept for a totally artificial heart (TAH). Our goal is to design a mechanical replacement for the human heart that can support patients with end-stage heart failure.",
      bullets: [
        "Working within the electrical sub-team, focusing on the early development of the control system",
        "Designing control algorithms and hardware systems that will regulate pressure, flow, and timing to mimic the natural heart",
        "Exploring integration of sensors and actuators to build a responsive and adaptive system",
        "Collaborating closely with the mechanical and biomedical teams to ensure a cohesive and clinically relevant design"
      ],
      achievement: "Early-stage development of control systems for a medical-grade artificial heart project",
      isRightAligned: true
    },
    {
      title: "Industry Lead",
      company: "QUT Robotics Club",
      period: "Feb 2024 - Current",
      description: "Managed a team of 15 student engineers in designing and building competitive robots for national competitions. Led the team to first place in the 2020 University Robotics Challenge.",
      bullets: [
        "Coordinated project schedules and resource allocation",
        "Mentored junior members in robotics fundamentals",
        "Developed competition strategies and technical solutions",
        "Secured sponsorship and equipment donations"
      ],
      achievement: "First place in the 2020 University Robotics Challenge",
      isRightAligned: false
    },
    {
      title: "Undergraduate Engineer",
      company: "Multicom Resources",
      period: "Jan 2021 - Dec 2022",
      description: "Led the design and implementation of automated testing equipment for quality control processes, resulting in a 40% reduction in testing time and improved accuracy.",
      bullets: [
        "Developed CAD models for custom equipment components",
        "Programmed PLC systems for process automation",
        "Implemented sensor arrays for real-time data collection",
        "Created technical documentation and user manuals"
      ],
      achievement: "Received Innovation Award for developing an automated quality control system",
      isRightAligned: false
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 relative overflow-hidden" ref={containerRef}>
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{ y: backgroundY }}
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary"
            style={{
              width: Math.random() * 50 + 10,
              height: Math.random() * 50 + 10,
              borderRadius: Math.random() * 50 + '%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1 + (Math.random() * 0.1)
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1 + Math.random() * 2, 
              delay: Math.random() * 0.5 
            }}
          />
        ))}
      </motion.div>
      
      <div className="container mx-auto relative z-10">
        <motion.h2 
          className="font-poppins font-bold text-3xl md:text-4xl text-center mb-6 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="relative inline-block"
            whileInView={{
              textShadow: [
                "0 0 0 rgba(0,0,0,0)",
                "0 0 10px rgba(26,95,122,0.4)",
                "0 0 0 rgba(0,0,0,0)"
              ]
            }}
            transition={{ 
              duration: 2,
              ease: "easeInOut",
              delay: 0.3
            }}
          >
            Professional Experience
            <motion.span 
              className="absolute -bottom-2 left-0 h-1 bg-secondary"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.span>
        </motion.h2>
        
        <motion.div
          className="text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl font-medium text-primary mb-2">
            Undergraduate Engineer (Mechatronics & Medical Engineering)
          </h3>
          <p className="text-gray-700">
            Industry Lead @ QUT Robotics Club | Undergraduate Engineer @ Multicom Resources
          </p>
        </motion.div>
        
        <div className="timeline-container relative pb-10">
          {/* Main timeline line */}
          <div className="absolute w-0.5 bg-gray-200 h-full left-4 md:left-1/2 top-0 -translate-x-1/2 z-0"></div>
          
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              className="relative mb-16 last:mb-0"
            >
              {/* Timeline connector */}
              {index < experiences.length - 1 && (
                <TimelineConnector isActive={index < activeExperience} />
              )}
              
              {/* Timeline date marker */}
              <motion.div 
                className="text-center absolute w-full md:w-auto md:left-1/2 md:-translate-x-1/2 top-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className="inline-block bg-secondary text-white px-4 py-1 rounded-full text-sm font-medium shadow-md"
                  whileHover={{ y: -2 }}
                  animate={{ backgroundColor: activeExperience === index ? "#ff6b6b" : "#57c5b6" }}
                >
                  {exp.period.split(' - ')[0]}
                </motion.div>
              </motion.div>
              
              <div className="flex flex-col md:flex-row mt-8">
                <div className={`relative md:w-1/2 ${exp.isRightAligned ? 'md:pr-20 md:text-right' : 'md:pl-20 md:order-1'} mb-8 md:mb-0 pl-10 md:pl-0 ${exp.isRightAligned ? 'md:text-right' : 'md:text-left'} ${!exp.isRightAligned && 'md:order-0'}`}>
                  <div className={exp.isRightAligned ? 'md:ml-auto' : ''}>
                    <motion.h3 
                      className="font-poppins font-semibold text-xl text-teal-600 mb-1"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      {exp.title}
                    </motion.h3>
                    
                    {/* Timeline dot - mobile only */}
                    <div className="md:hidden absolute left-0 top-0 mt-1">
                      <TimelineDot 
                        active={activeExperience === index}
                        onClick={() => setActiveExperience(index)}
                        isRight={false}
                      />
                    </div>
                    
                    {/* Timeline dot - desktop */}
                    <div className="hidden md:block">
                      <TimelineDot 
                        active={activeExperience === index}
                        onClick={() => setActiveExperience(index)}
                        isRight={exp.isRightAligned}
                      />
                    </div>
                  </div>
                </div>
                
                <div className={`md:w-1/2 ${exp.isRightAligned ? 'md:pl-12' : 'md:pr-12 md:order-0'} w-full`}>
                  <ExperienceCard 
                    experience={exp} 
                    active={activeExperience === index}
                    index={index}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
