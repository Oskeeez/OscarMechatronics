import { motion } from "framer-motion";
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
}

interface SkillItem {
  name: string;
  percentage: number;
}

export default function SkillsSection() {
  const skillCategories: SkillCategory[] = [
    {
      icon: <FaCompass className="text-primary text-3xl mr-4" />,
      title: "CAD & Design",
      skills: [
        { name: "Fusion 360", percentage: 95 },
        { name: "Onshape", percentage: 90 },
        { name: "SolidWorks", percentage: 85 },
        { name: "AutoCAD", percentage: 80 }
      ]
    },
    {
      icon: <FaCode className="text-primary text-3xl mr-4" />,
      title: "Programming",
      skills: [
        { name: "Python", percentage: 90 },
        { name: "MATLAB", percentage: 85 },
        { name: "Arduino/C++", percentage: 95 },
        { name: "ROS (Robot Operating System)", percentage: 80 }
      ]
    },
    {
      icon: <FaCogs className="text-primary text-3xl mr-4" />,
      title: "Mechanical",
      skills: [
        { name: "Mechanical Design", percentage: 95 },
        { name: "3D Printing & Prototyping", percentage: 90 },
        { name: "FEA (Finite Element Analysis)", percentage: 85 },
        { name: "Manufacturing Processes", percentage: 80 }
      ]
    },
    {
      icon: <FaMicrochip className="text-primary text-3xl mr-4" />,
      title: "Electronics",
      skills: [
        { name: "Circuit Design", percentage: 90 },
        { name: "PCB Layout", percentage: 85 },
        { name: "Microcontrollers", percentage: 95 },
        { name: "Sensor Integration", percentage: 90 }
      ]
    },
    {
      icon: <FaRobot className="text-primary text-3xl mr-4" />,
      title: "Automation",
      skills: [
        { name: "PLC Programming", percentage: 85 },
        { name: "Motion Control", percentage: 90 },
        { name: "Process Automation", percentage: 80 },
        { name: "SCADA Systems", percentage: 75 }
      ]
    },
    {
      icon: <FaTasks className="text-primary text-3xl mr-4" />,
      title: "Project Management",
      skills: [
        { name: "Project Planning", percentage: 90 },
        { name: "Resource Management", percentage: 85 },
        { name: "Technical Documentation", percentage: 95 },
        { name: "Team Leadership", percentage: 85 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.h2 
          className="font-poppins font-bold text-3xl md:text-4xl text-center mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Technical Skills
          <span className="block w-20 h-1 bg-secondary mx-auto mt-4"></span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div 
              key={categoryIndex} 
              className="bg-light p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center mb-6">
                {category.icon}
                <h3 className="font-poppins font-semibold text-2xl">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span>{skill.percentage}%</span>
                    </div>
                    <Progress value={skill.percentage} className="h-2 bg-gray-200" />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
