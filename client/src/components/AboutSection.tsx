import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase, FaUsers, FaHeartbeat } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection() {
  const educationItems = [
    {
      icon: <FaGraduationCap className="text-secondary mr-3 text-xl" />,
      title: "Bachelor of Engineering (Mechatronics & Medical Engineering)",
      institution: "Queensland University of Technology",
      period: "2018 - 2022"
    },
    {
      icon: <FaBriefcase className="text-secondary mr-3 text-xl" />,
      title: "Undergraduate Engineer",
      institution: "Multicom Resources",
      period: "Current Position"
    },
    {
      icon: <FaUsers className="text-secondary mr-3 text-xl" />,
      title: "Industry Lead",
      institution: "QUT Robotics Club",
      period: "Current Position"
    },
    {
      icon: <FaHeartbeat className="text-secondary mr-3 text-xl" />,
      title: "Electrical & Control System Design",
      institution: "QUT HeartBeats",
      period: "Nov 2023 - Current"
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
              ease: "easeInOut"
            }}
          >
            About Me
            <motion.span 
              className="absolute -bottom-2 left-0 h-1 bg-secondary"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.span>
        </motion.h2>
        
        <div className="flex flex-col md:flex-row gap-12">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-poppins font-semibold text-2xl mb-6 text-primary">
              <span className="relative">
                Who I Am
                <motion.span 
                  className="absolute -bottom-2 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
              </span>
            </h3>
            <div className="space-y-4">
              <motion.p 
                className="text-lg leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                I'm an undergraduate mechatronics engineer at Multicom Resources and the Industry Lead at QUT Robotics Club. My passion lies in designing innovative solutions, particularly in the fields of medical devices and prosthetics.
              </motion.p>
              
              <motion.p 
                className="text-lg leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Through my role at Multicom, I gain valuable hands-on experience in real-world engineering projects. As Industry Lead at the Robotics Club, I focus on fostering industry connections, organizing events, and creating opportunities for students to engage with the industry and grow professionally.
              </motion.p>
              
              <motion.p 
                className="text-lg leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                I'm driven to learn, collaborate, and push the boundaries of technology. With a background in both mechanical engineering and computer science, I bring a unique interdisciplinary approach to my work, allowing me to design comprehensive solutions that integrate hardware and software seamlessly.
              </motion.p>
              
              <motion.p 
                className="text-lg leading-relaxed font-medium text-primary"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                If you're working on an exciting project, I'd love to connect.
              </motion.p>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-poppins font-semibold text-2xl mb-6 text-primary">
              <span className="relative">
                Current Positions & Education
                <motion.span 
                  className="absolute -bottom-2 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
              </span>
            </h3>
            <div className="space-y-6">
              {educationItems.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-2">
                        <motion.div
                          className="mr-3 text-secondary"
                          whileHover={{ rotate: 10, scale: 1.1 }}
                        >
                          {item.icon}
                        </motion.div>
                        <h4 className="font-semibold text-xl">{item.title}</h4>
                      </div>
                      <p className="text-lg font-medium">{item.institution}</p>
                      <p className="text-primary">{item.period}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-8 p-5 bg-primary bg-opacity-5 rounded-lg border border-primary border-opacity-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h4 className="font-semibold text-primary mb-2">Professional Focus</h4>
              <p className="text-gray-800">
                Specializing in medical engineering and robotics with a focus on creating innovative solutions for real-world challenges.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
