import { motion } from "framer-motion";
import { FaGraduationCap, FaCertificate, FaCode } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection() {
  const educationItems = [
    {
      icon: <FaGraduationCap className="text-secondary mr-3 text-xl" />,
      title: "Bachelor of Engineering (Mechatronics)",
      institution: "Queensland University of Technology",
      period: "2018 - 2022"
    },
    {
      icon: <FaCertificate className="text-secondary mr-3 text-xl" />,
      title: "Advanced Robotics Certification",
      institution: "Australian Robotics Institute",
      period: "2021"
    },
    {
      icon: <FaCode className="text-secondary mr-3 text-xl" />,
      title: "Programming for Automation",
      institution: "Tech Innovations Academy",
      period: "2020"
    }
  ];

  return (
    <section id="about" className="py-20 bg-light px-4">
      <div className="container mx-auto">
        <motion.h2 
          className="font-poppins font-bold text-3xl md:text-4xl text-center mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
          <span className="block w-20 h-1 bg-secondary mx-auto mt-4"></span>
        </motion.h2>
        
        <div className="flex flex-col md:flex-row gap-12">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-poppins font-semibold text-2xl mb-4 text-primary">Who I Am</h3>
            <p className="text-lg leading-relaxed mb-6">
              I'm a passionate Mechatronics Design Engineer with expertise in robotics and automation. My journey in engineering started with a fascination for how mechanical and electronic systems work together to create intelligent machines.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              With a background in both mechanical engineering and computer science, I bring a unique interdisciplinary approach to my work, allowing me to design comprehensive solutions that integrate hardware and software seamlessly.
            </p>
            <p className="text-lg leading-relaxed">
              I thrive on challenges that require innovative thinking and precision engineering, always aiming to create systems that are not only functional but also elegant and efficient.
            </p>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-poppins font-semibold text-2xl mb-4 text-primary">Education & Background</h3>
            <div className="space-y-6">
              {educationItems.map((item, index) => (
                <Card key={index} className="bg-white shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-2">
                      {item.icon}
                      <h4 className="font-semibold text-xl">{item.title}</h4>
                    </div>
                    <p className="text-lg">{item.institution}</p>
                    <p className="text-gray-600">{item.period}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
