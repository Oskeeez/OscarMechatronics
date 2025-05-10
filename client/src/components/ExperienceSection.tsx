import { motion } from "framer-motion";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
  isRightAligned: boolean;
}

export default function ExperienceSection() {
  const experiences: ExperienceItem[] = [
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
      isRightAligned: true
    },
    {
      title: "Technical Lead",
      company: "QUT Robotics Club",
      period: "Feb 2019 - Nov 2021",
      description: "Managed a team of 15 student engineers in designing and building competitive robots for national competitions. Led the team to first place in the 2020 University Robotics Challenge.",
      bullets: [
        "Coordinated project schedules and resource allocation",
        "Mentored junior members in robotics fundamentals",
        "Developed competition strategies and technical solutions",
        "Secured sponsorship and equipment donations"
      ],
      isRightAligned: false
    },
    {
      title: "Mechatronics Intern",
      company: "TechServe Systems",
      period: "Jun 2020 - Sep 2020",
      description: "Assisted in the development of custom automation solutions for industrial clients, focusing on integration of mechanical systems with electronic controls and software.",
      bullets: [
        "Designed mechanical components in SolidWorks",
        "Supported electrical wiring and component integration",
        "Wrote Arduino and Python code for control systems",
        "Participated in client meetings and requirement gathering"
      ],
      isRightAligned: true
    }
  ];

  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.h2 
          className="font-poppins font-bold text-3xl md:text-4xl text-center mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Professional Experience
          <span className="block w-20 h-1 bg-secondary mx-auto mt-4"></span>
        </motion.h2>
        
        <div className="timeline-container relative">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              className="flex flex-col md:flex-row mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className={`md:w-1/2 ${exp.isRightAligned ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-1'} mb-8 md:mb-0 ${!exp.isRightAligned && 'md:order-0'}`}>
                <div className={exp.isRightAligned ? 'md:ml-auto' : ''}>
                  <h3 className="font-poppins font-semibold text-xl text-primary">{exp.title}</h3>
                  <h4 className="font-medium text-lg">{exp.company}</h4>
                  <p className="text-gray-600 mt-1">{exp.period}</p>
                  {exp.isRightAligned ? (
                    <div className="hidden md:block mt-4 w-4 h-4 rounded-full bg-primary border-4 border-white absolute right-0 translate-x-1/2"></div>
                  ) : (
                    <div className="hidden md:block mt-4 w-4 h-4 rounded-full bg-primary border-4 border-white absolute left-1/2 -translate-x-1/2"></div>
                  )}
                </div>
              </div>
              <div className={`md:w-1/2 ${exp.isRightAligned ? 'md:pl-12' : 'md:pr-12 md:text-right md:order-0'}`}>
                <div className="block md:hidden w-4 h-4 rounded-full bg-primary border-4 border-white absolute left-0 ml-4 -translate-x-1/2"></div>
                <div className="bg-light p-6 rounded-lg shadow-md md:mt-0">
                  <p className="text-gray-700">
                    {exp.description}
                  </p>
                  <ul className="mt-4 list-disc list-inside text-gray-700">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
