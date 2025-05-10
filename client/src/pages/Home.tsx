import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  // Update page title and meta description for SEO
  useEffect(() => {
    document.title = "Oscar Jones | Mechatronics Design Engineer";
    
    // Create meta description if it doesn't exist
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    
    // Set meta description content
    metaDescription.setAttribute('content', 'Portfolio of Oscar Jones, a Mechatronics Design Engineer specializing in robotics and automation systems. View projects, skills, and experience.');
    
    // Add Open Graph tags
    const metaTags = [
      {name: 'og:title', content: 'Oscar Jones | Mechatronics Design Engineer'},
      {name: 'og:description', content: 'Portfolio of Oscar Jones, a Mechatronics Design Engineer specializing in robotics and automation systems.'},
      {name: 'og:type', content: 'website'},
      {name: 'og:url', content: window.location.href},
    ];
    
    metaTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[property="${tag.name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', tag.name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });
    
    // Add Google Fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=Roboto+Mono&display=swap';
    document.head.appendChild(fontLink);
    
  }, []);

  return (
    <div className="font-inter text-dark bg-white">
      <Header />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
