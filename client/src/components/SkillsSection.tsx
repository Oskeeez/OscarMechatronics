import { motion } from "framer-motion";
import { useState } from "react";
import { 
  FaCompass, 
  FaCode, 
  FaCogs, 
  FaMicrochip, 
  FaRobot, 
  FaTasks 
} from "react-icons/fa";
import { Progress } from "@/components/ui/progress";

interface SkillCategory {
  icon: JSX.Element;
  title: string;
  skills: SkillItem[];
  color: string;
}

interface SkillItem {
  name: string;
  percentage: number;
}

// Interactive skill visualization component
const InteractiveSkill = ({ 
  skill, 
  delay, 
  categoryColor 
}: { 
  skill: SkillItem; 
  delay: number;
  categoryColor: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Convert hex color to rgba for glowing effect
  const getRgba = (hex: string, alpha: number) => {
    // Remove # if present
    const cleanHex = hex.charAt(0) === '#' ? hex.substring(1) : hex;
    
    // Parse the hex values
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    
    // Return rgba value
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between mb-1">
        <motion.span 
          className="font-medium"
          animate={{ 
            scale: isHovered ? 1.03 : 1,
            color: isHovered ? categoryColor : ""
          }}
          transition={{ duration: 0.2 }}
        >
          {skill.name}
        </motion.span>
        <motion.span
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {skill.percentage}%
        </motion.span>
      </div>
      
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          className="absolute left-0 top-0 bottom-0 rounded-full"
          style={{ 
            backgroundColor: categoryColor,
            boxShadow: isHovered ? `0 0 10px ${getRgba(categoryColor, 0.7)}` : 'none'
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percentage}%` }}
          viewport={{ once: true }}
          transition={{ 
            duration: 1.5, 
            delay: delay + 0.3,
            ease: "easeOut"
          }}
        />
        
        {/* Animated particles for the hovered state */}
        {isHovered && (
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white"
                style={{ 
                  left: `${Math.random() * skill.percentage}%`,
                  top: '50%'
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: Math.random() * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function SkillsSection() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  
  const skillCategories: SkillCategory[] = [
    {
      icon: <FaCompass className="text-3xl mr-4" />,
      title: "CAD & Design",
      color: "#1a5f7a", // primary color
      skills: [
        { name: "Fusion 360", percentage: 95 },
        { name: "Onshape", percentage: 90 },
        { name: "SolidWorks", percentage: 85 },
        { name: "AutoCAD", percentage: 80 }
      ]
    },
    {
      icon: <FaCode className="text-3xl mr-4" />,
      title: "Programming",
      color: "#57c5b6", // secondary color
      skills: [
        { name: "Python", percentage: 90 },
        { name: "MATLAB", percentage: 85 },
        { name: "Arduino/C++", percentage: 95 },
        { name: "ROS (Robot Operating System)", percentage: 80 }
      ]
    },
    {
      icon: <FaCogs className="text-3xl mr-4" />,
      title: "Mechanical",
      color: "#ff6b6b", // accent color
      skills: [
        { name: "Mechanical Design", percentage: 95 },
        { name: "3D Printing & Prototyping", percentage: 90 },
        { name: "FEA (Finite Element Analysis)", percentage: 85 },
        { name: "Manufacturing Processes", percentage: 80 }
      ]
    },
    {
      icon: <FaMicrochip className="text-3xl mr-4" />,
      title: "Electronics",
      color: "#3d7eaf", // chart-4 color
      skills: [
        { name: "Circuit Design", percentage: 90 },
        { name: "PCB Layout", percentage: 85 },
        { name: "Microcontrollers", percentage: 95 },
        { name: "Sensor Integration", percentage: 90 }
      ]
    },
    {
      icon: <FaRobot className="text-3xl mr-4" />,
      title: "Automation",
      color: "#dc9b33", // chart-5 color
      skills: [
        { name: "PLC Programming", percentage: 85 },
        { name: "Motion Control", percentage: 90 },
        { name: "Process Automation", percentage: 80 },
        { name: "SCADA Systems", percentage: 75 }
      ]
    },
    {
      icon: <FaTasks className="text-3xl mr-4" />,
      title: "Project Management",
      color: "#6a67ce", // unique color
      skills: [
        { name: "Project Planning", percentage: 90 },
        { name: "Resource Management", percentage: 85 },
        { name: "Technical Documentation", percentage: 95 },
        { name: "Team Leadership", percentage: 85 }
      ]
    }
  ];

  // Background network visualization
  const generateNetworkLines = () => {
    const lines = [];
    const count = 20;
    
    for (let i = 0; i < count; i++) {
      lines.push({
        id: i,
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        x2: Math.random() * 100,
        y2: Math.random() * 100,
        duration: 2 + Math.random() * 5,
        delay: Math.random() * 2,
        width: 1 + Math.random() * 2,
        opacity: 0.03 + Math.random() * 0.07
      });
    }
    
    return lines;
  };
  
  const networkLines = generateNetworkLines();

  return (
    <section id="skills" className="py-20 px-4 relative overflow-hidden">
      {/* Animated background network */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {networkLines.map(line => (
          <motion.div
            key={line.id}
            className="absolute bg-gray-500"
            style={{ 
              height: line.width,
              opacity: line.opacity,
              transformOrigin: "left center",
              left: `${line.x1}%`,
              top: `${line.y1}%`,
              width: Math.sqrt(
                Math.pow(line.x2 - line.x1, 2) + 
                Math.pow(line.y2 - line.y1, 2)
              ),
              rotate: Math.atan2(
                line.y2 - line.y1,
                line.x2 - line.x1
              ) * (180 / Math.PI)
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: line.duration,
              delay: line.delay,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.h2 
          className="font-poppins font-bold text-3xl md:text-4xl text-center mb-16 relative"
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
                "0 0 10px rgba(87,197,182,0.5)",
                "0 0 0 rgba(0,0,0,0)"
              ]
            }}
            transition={{ 
              duration: 2,
              repeat: 2,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            Technical Skills
            <motion.span 
              className="absolute -bottom-2 left-0 h-1 bg-secondary"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div 
              key={categoryIndex} 
              className="bg-light p-8 rounded-lg shadow-md relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
              onMouseEnter={() => setHoveredCategory(categoryIndex)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Background glow effect */}
              <motion.div 
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 blur-xl -mr-10 -mt-10"
                style={{ backgroundColor: category.color }}
                animate={{ 
                  scale: hoveredCategory === categoryIndex ? [1, 1.3, 1] : 1,
                  opacity: hoveredCategory === categoryIndex ? [0.1, 0.3, 0.1] : 0.1
                }}
                transition={{ 
                  duration: 3,
                  repeat: hoveredCategory === categoryIndex ? Infinity : 0,
                  ease: "easeInOut" 
                }}
              />
              
              <motion.div 
                className="flex items-center mb-6 relative z-10"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 + 0.2 }}
              >
                <motion.div 
                  className="flex items-center justify-center w-12 h-12 rounded-full mr-4"
                  style={{ 
                    color: hoveredCategory === categoryIndex ? "#fff" : category.color,
                    backgroundColor: hoveredCategory === categoryIndex ? category.color : "transparent"
                  }}
                  animate={{ 
                    rotate: hoveredCategory === categoryIndex ? 360 : 0,
                  }}
                  transition={{ 
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                >
                  {category.icon}
                </motion.div>
                <h3 className="font-poppins font-semibold text-2xl" style={{ color: category.color }}>
                  {category.title}
                </h3>
              </motion.div>
              
              <div className="space-y-0">
                {category.skills.map((skill, skillIndex) => (
                  <InteractiveSkill 
                    key={skillIndex} 
                    skill={skill} 
                    delay={categoryIndex * 0.1 + skillIndex * 0.1}
                    categoryColor={category.color}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
