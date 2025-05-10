import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa";
import { SendIcon, Sparkles, CheckCircle2 } from "lucide-react";

// Define contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Animated form input
const AnimatedInput = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

// Custom button with spark effect
const SubmitButton = ({ isSubmitting, isSuccess }: { isSubmitting: boolean; isSuccess: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="relative"
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button 
        type="submit" 
        className="relative overflow-hidden bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-all inline-flex items-center w-full justify-center"
        disabled={isSubmitting || isSuccess}
      >
        {isSubmitting ? (
          <>
            <motion.div 
              className="absolute inset-0 bg-secondary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <span className="relative z-10 flex items-center">
              Sending...
              <motion.div
                className="ml-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </span>
          </>
        ) : isSuccess ? (
          <span className="flex items-center">
            Sent Successfully
            <CheckCircle2 className="ml-2 h-4 w-4" />
          </span>
        ) : (
          <span className="flex items-center relative z-10">
            Send Message
            <SendIcon className="ml-2 h-4 w-4" />
          </span>
        )}
        
        {/* Spark particles */}
        {isHovered && !isSubmitting && !isSuccess && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{ 
                  x: "50%", 
                  y: "50%",
                  opacity: 1,
                  scale: 0
                }}
                animate={{ 
                  x: `${50 + (Math.random() * 100 - 50)}%`,
                  y: `${50 + (Math.random() * 100 - 50)}%`,
                  opacity: [1, 0],
                  scale: [0, 2]
                }}
                transition={{ 
                  duration: 0.6 + Math.random() * 0.5,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 0.2
                }}
              />
            ))}
          </div>
        )}
      </Button>
    </motion.div>
  );
};

// Animated social media button
const SocialButton = ({ 
  href, 
  icon, 
  label, 
  delay 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string;
  delay: number;
}) => {
  return (
    <motion.a 
      href={href} 
      className="relative overflow-hidden bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center transition-transform group"
      aria-label={label}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        delay: delay
      }}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div 
        className="absolute inset-0 bg-secondary rounded-full"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">{icon}</span>
    </motion.a>
  );
};

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  const isFormInView = useInView(formRef, { once: false, amount: 0.3 });
  
  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  // Handle form submission
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message! I will get back to you soon.",
        variant: "default"
      });
      
      form.reset();
      setIsSuccess(true);
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate particle elements for background
  const generateParticles = (count: number) => {
    return [...Array(count)].map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 15 + Math.random() * 30,
      delay: Math.random() * 2
    }));
  };

  const particles = generateParticles(20);

  return (
    <section id="contact" className="py-20 bg-light px-4 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary opacity-10"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
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
              ease: "easeInOut",
              delay: 0.3
            }}
          >
            Get In Touch
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
            className="md:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white p-8 rounded-lg shadow-md h-full relative overflow-hidden group">
              {/* Decorative gradient */}
              <motion.div 
                className="absolute -top-20 -right-20 w-40 h-40 bg-primary rounded-full opacity-5 blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.05, 0.1, 0.05]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              <motion.h3 
                className="font-poppins font-semibold text-2xl mb-6 text-primary relative"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center">
                  <span>Contact Information</span>
                  <motion.div 
                    className="ml-2"
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      repeatDelay: 5
                    }}
                  >
                    <Sparkles className="h-5 w-5 text-secondary" />
                  </motion.div>
                </div>
              </motion.h3>
              
              <div className="space-y-8 relative z-10">
                {[
                  { 
                    icon: <FaEnvelope className="text-secondary text-xl" />, 
                    title: "Email", 
                    content: <a href="mailto:oscar.jones@example.com" className="text-primary hover:underline group-hover:text-secondary transition-colors">oscar.jones@example.com</a>,
                    delay: 0.3
                  },
                  { 
                    icon: <FaPhoneAlt className="text-secondary text-xl" />, 
                    title: "Phone", 
                    content: <a href="tel:+61412345678" className="text-primary hover:underline group-hover:text-secondary transition-colors">+61 412 345 678</a>,
                    delay: 0.4
                  },
                  { 
                    icon: <FaMapMarkerAlt className="text-secondary text-xl" />, 
                    title: "Location", 
                    content: <p>Brisbane, QLD, Australia</p>,
                    delay: 0.5
                  },
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: item.delay }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="mr-4 mt-1 p-2 rounded-full bg-primary bg-opacity-10"
                      whileHover={{ 
                        backgroundColor: "rgba(26,95,122,0.2)",
                        rotate: 10
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h4 className="font-medium text-lg">{item.title}</h4>
                      {item.content}
                    </div>
                  </motion.div>
                ))}
                
                <motion.div 
                  className="pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <h4 className="font-medium text-lg mb-4">Connect With Me</h4>
                  <div className="flex space-x-4">
                    <SocialButton
                      href="https://linkedin.com"
                      icon={<FaLinkedinIn />}
                      label="LinkedIn"
                      delay={0.7}
                    />
                    <SocialButton
                      href="https://github.com"
                      icon={<FaGithub />}
                      label="GitHub"
                      delay={0.8}
                    />
                    <SocialButton
                      href="https://twitter.com"
                      icon={<FaTwitter />}
                      label="Twitter"
                      delay={0.9}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-2/3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            ref={formRef}
          >
            <div className="bg-white p-8 rounded-lg shadow-md relative overflow-hidden">
              {/* Animated gradient background */}
              <motion.div
                className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary opacity-5 rounded-full blur-xl"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { 
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              />
              
              <motion.h3 
                className="font-poppins font-semibold text-2xl mb-8 text-primary relative"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Send Me a Message
              </motion.h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatedInput delay={0.3}>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="relative">
                            <FormLabel className="text-gray-700 font-medium">Your Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John Doe" 
                                className={`w-full px-4 py-3 border transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${isFormInView ? 'border-primary/50' : 'border-gray-300'}`}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </AnimatedInput>
                    
                    <AnimatedInput delay={0.4}>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">Your Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="john@example.com" 
                                className={`w-full px-4 py-3 border transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${isFormInView ? 'border-primary/50' : 'border-gray-300'}`}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </AnimatedInput>
                  </div>
                  
                  <AnimatedInput delay={0.5}>
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Subject</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Project Inquiry" 
                              className={`w-full px-4 py-3 border transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${isFormInView ? 'border-primary/50' : 'border-gray-300'}`}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AnimatedInput>
                  
                  <AnimatedInput delay={0.6}>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message here..." 
                              className={`w-full px-4 py-3 border transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${isFormInView ? 'border-primary/50' : 'border-gray-300'}`}
                              rows={5}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AnimatedInput>
                  
                  <AnimatedInput delay={0.7}>
                    <SubmitButton isSubmitting={isSubmitting} isSuccess={isSuccess} />
                  </AnimatedInput>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
