import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, X, Maximize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

interface Project {
  image: string;
  title: string;
  tags: string[];
  description: string;
  fullDescription?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isHovering, setIsHovering] = useState<number | null>(null);

  const projects: Project[] = [
    {
      image: "https://pixabay.com/get/gf1d7d1164c59534069ce5fbbd16226b73c77913ec158ae99a43ea9315ffce834786c14ca48bb0fde898f52c5bb02a316993ece46f8f7d57d27f4434c641e4951_1280.png",
      title: "2D Robotic Arm",
      tags: ["Robotics", "Arduino", "CAD"],
      description: "Designed and built a precision-controlled 2D robotic arm with 4 degrees of freedom using custom-designed components and Arduino-based control system.",
      fullDescription: "This 2D robotic arm was designed as a flexible platform for exploring control algorithms and mechanical design principles. The arm features a modular design that allows for easy reconfiguration and testing of different components.",
      challenge: "Creating a lightweight yet sturdy robotic arm that could offer precision movement while remaining cost-effective and adaptable for various use cases.",
      solution: "I designed custom 3D-printed components and integrated them with precision servo motors controlled by an Arduino microcontroller. The software was written to enable inverse kinematics calculations for accurate positioning.",
      outcome: "The resulting robotic arm achieved positioning accuracy within 0.5mm and became a valuable educational tool for demonstrating mechatronics principles."
    },
    {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      title: "Automation Software Integration",
      tags: ["Python", "APIs", "SCADA"],
      description: "Developed a custom software interface to integrate multiple automation systems, improving production efficiency by 35% at a manufacturing facility.",
      fullDescription: "This project involved creating a unified interface to connect disparate automation systems used across different production lines at a manufacturing facility. The goal was to enable seamless data flow and centralized control.",
      challenge: "The facility used equipment from five different manufacturers, each with proprietary software and communication protocols that weren't designed to interact with each other.",
      solution: "I developed a middleware solution using Python that abstracted the underlying communication protocols, creating a standardized API that allowed all systems to communicate through a central SCADA interface.",
      outcome: "The solution reduced manual data entry by 90%, cut production changeover time by 35%, and provided real-time visibility into operations across the entire factory floor."
    },
    {
      image: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      title: "Advanced Mechatronics System",
      tags: ["Fusion 360", "Electronics", "Control Systems"],
      description: "Created a compact mechatronic system for precise material handling with integrated sensors, actuators, and feedback control loops.",
      fullDescription: "This advanced mechatronics system was designed for a specialized manufacturing process requiring ultra-precise material handling in a confined space. The system needed to maintain accuracy while operating at high speeds.",
      challenge: "Balancing the need for speed, precision, and reliability in a compact form factor while working within strict power and spatial constraints.",
      solution: "I designed the entire system in Fusion 360, incorporating custom-designed PCBs with embedded microcontrollers and a network of specialized sensors. The control system uses a cascaded PID implementation with feed-forward compensation.",
      outcome: "The final system achieved positioning accuracy of ±0.02mm while operating at twice the speed of the previous solution, leading to significant productivity gains."
    },
    {
      image: "https://pixabay.com/get/gdaf533865e5504c9f2cbfd67e70f6fb123f870996cc28f34e5c12e49d10edf8e37a9a9faeb36aa1fb9cac9a46bfd17b018971826153eb3332387e9ed593bc981_1280.jpg",
      title: "Smart Home Automation System",
      tags: ["IoT", "Raspberry Pi", "Sensors"],
      description: "Designed and implemented a comprehensive smart home system with custom sensors, central control hub, and mobile application interface.",
      fullDescription: "This smart home system was built from the ground up to be modular, secure, and user-friendly. Unlike off-the-shelf solutions, this system offers greater flexibility, privacy, and customization options.",
      challenge: "Creating a cohesive system that integrates seamlessly with various home systems while ensuring reliability, security, and an intuitive user experience.",
      solution: "I built a Raspberry Pi-based central hub running custom software that interfaces with wireless sensor nodes throughout the home. The system includes machine learning algorithms for predictive automation based on usage patterns.",
      outcome: "The system reduced energy consumption by 28% while providing enhanced convenience through automated routines tailored to the inhabitants' preferences and schedules."
    },
    {
      image: "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      title: "Autonomous Navigation Rover",
      tags: ["Robotics", "Computer Vision", "Python"],
      description: "Built an autonomous rover capable of navigating complex environments using computer vision, environmental sensors, and machine learning algorithms.",
      fullDescription: "This autonomous rover was designed to navigate and map unknown environments with minimal human intervention. Using a combination of sensors and computer vision algorithms, the rover can identify obstacles, plan paths, and adapt to changing conditions.",
      challenge: "Developing robust navigation algorithms that could function reliably in variable lighting conditions and unstructured environments while running on limited onboard computing resources.",
      solution: "I implemented a multi-layered approach combining SLAM (Simultaneous Localization and Mapping) with a custom computer vision system for obstacle detection. The system uses efficient machine learning models optimized for edge computing.",
      outcome: "The rover successfully demonstrated autonomous navigation through complex obstacle courses with 95% reliability and has been adapted for educational demonstrations in robotics workshops."
    },
    {
      image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      title: "Industrial Control System",
      tags: ["PLC", "Electrical", "HMI"],
      description: "Designed and implemented an industrial control system with PLC programming, custom HMI interface, and safety protocols for manufacturing equipment.",
      fullDescription: "This industrial control system was developed for a production line that processes sensitive materials requiring precise environmental controls and strict safety measures. The system integrates all aspects of the production process into a unified control interface.",
      challenge: "Ensuring operator safety while maximizing production efficiency, with redundancy systems to prevent failures and emergency protocols to handle unexpected situations.",
      solution: "I designed a comprehensive system using redundant PLCs with safety-rated components, along with a custom HMI interface that presents critical information intuitively. The system includes multi-layered safety protocols and detailed logging for compliance purposes.",
      outcome: "The implementation reduced safety incidents to zero while improving production throughput by 22%. The system has been in continuous operation for over two years with 99.97% uptime."
    }
  ];

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="py-20 bg-light px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary rounded-full opacity-5"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 30 - 15],
              scale: [1, Math.random() * 0.3 + 0.9]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
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
          <span className="relative inline-block">
            Featured Projects
            <motion.span 
              className="absolute -bottom-2 left-0 h-1 bg-secondary"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onMouseEnter={() => setIsHovering(index)}
              onMouseLeave={() => setIsHovering(null)}
            >
              <Card className="h-full bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:shadow-xl">
                <div className="relative overflow-hidden group">
                  <img 
                    src={project.image} 
                    alt={`${project.title} Project`} 
                    className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay with expand button on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovering === index ? 1 : 0 }}
                  >
                    <Button 
                      onClick={() => openProjectDetails(project)}
                      className="bg-white text-primary hover:bg-secondary hover:text-white transition-colors"
                      size="sm"
                    >
                      <Maximize2 className="h-4 w-4 mr-2" />
                      Expand
                    </Button>
                  </motion.div>
                </div>
                
                <CardContent className="p-6">
                  <motion.h3 
                    className="font-poppins font-semibold text-xl mb-2"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-4"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  >
                    {project.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        variant="outline"
                        className="bg-primary bg-opacity-10 text-primary text-sm px-3 py-1 rounded-full"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </motion.div>
                  
                  <motion.p 
                    className="text-gray-700 mb-4"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                  >
                    {project.description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  >
                    <button 
                      onClick={() => openProjectDetails(project)}
                      className="inline-flex items-center text-primary font-medium hover:underline"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Project details dialog */}
      <Dialog open={!!selectedProject} onOpenChange={open => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-poppins font-bold flex items-center justify-between">
              {selectedProject?.title}
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
                  <X className="h-4 w-4" />
                </button>
              </DialogClose>
            </DialogTitle>
          </DialogHeader>
          
          {selectedProject && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="outline"
                      className="bg-primary bg-opacity-10 text-primary text-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <DialogDescription className="text-lg">
                  {selectedProject.fullDescription || selectedProject.description}
                </DialogDescription>
                
                {selectedProject.challenge && (
                  <div>
                    <h4 className="text-lg font-medium text-primary mb-1">Challenge</h4>
                    <p>{selectedProject.challenge}</p>
                  </div>
                )}
                
                {selectedProject.solution && (
                  <div>
                    <h4 className="text-lg font-medium text-primary mb-1">Solution</h4>
                    <p>{selectedProject.solution}</p>
                  </div>
                )}
                
                {selectedProject.outcome && (
                  <div>
                    <h4 className="text-lg font-medium text-primary mb-1">Outcome</h4>
                    <p>{selectedProject.outcome}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
