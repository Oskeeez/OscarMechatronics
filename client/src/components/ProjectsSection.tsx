import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Project {
  image: string;
  title: string;
  tags: string[];
  description: string;
}

export default function ProjectsSection() {
  const projects: Project[] = [
    {
      image: "https://pixabay.com/get/gf1d7d1164c59534069ce5fbbd16226b73c77913ec158ae99a43ea9315ffce834786c14ca48bb0fde898f52c5bb02a316993ece46f8f7d57d27f4434c641e4951_1280.png",
      title: "2D Robotic Arm",
      tags: ["Robotics", "Arduino", "CAD"],
      description: "Designed and built a precision-controlled 2D robotic arm with 4 degrees of freedom using custom-designed components and Arduino-based control system."
    },
    {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      title: "Automation Software Integration",
      tags: ["Python", "APIs", "SCADA"],
      description: "Developed a custom software interface to integrate multiple automation systems, improving production efficiency by 35% at a manufacturing facility."
    },
    {
      image: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      title: "Advanced Mechatronics System",
      tags: ["Fusion 360", "Electronics", "Control Systems"],
      description: "Created a compact mechatronic system for precise material handling with integrated sensors, actuators, and feedback control loops."
    },
    {
      image: "https://pixabay.com/get/gdaf533865e5504c9f2cbfd67e70f6fb123f870996cc28f34e5c12e49d10edf8e37a9a9faeb36aa1fb9cac9a46bfd17b018971826153eb3332387e9ed593bc981_1280.jpg",
      title: "Smart Home Automation System",
      tags: ["IoT", "Raspberry Pi", "Sensors"],
      description: "Designed and implemented a comprehensive smart home system with custom sensors, central control hub, and mobile application interface."
    },
    {
      image: "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      title: "Autonomous Navigation Rover",
      tags: ["Robotics", "Computer Vision", "Python"],
      description: "Built an autonomous rover capable of navigating complex environments using computer vision, environmental sensors, and machine learning algorithms."
    },
    {
      image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      title: "Industrial Control System",
      tags: ["PLC", "Electrical", "HMI"],
      description: "Designed and implemented an industrial control system with PLC programming, custom HMI interface, and safety protocols for manufacturing equipment."
    }
  ];

  return (
    <section id="projects" className="py-20 bg-light px-4">
      <div className="container mx-auto">
        <motion.h2 
          className="font-poppins font-bold text-3xl md:text-4xl text-center mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
          <span className="block w-20 h-1 bg-secondary mx-auto mt-4"></span>
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
            >
              <Card className="h-full bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:shadow-xl hover:-translate-y-1">
                <img 
                  src={project.image} 
                  alt={`${project.title} Project`} 
                  className="w-full h-52 object-cover"
                />
                
                <CardContent className="p-6">
                  <h3 className="font-poppins font-semibold text-xl mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        variant="outline"
                        className="bg-primary bg-opacity-10 text-primary text-sm px-3 py-1 rounded-full"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    {project.description}
                  </p>
                  <a href="#" className="inline-flex items-center text-primary font-medium hover:underline">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
