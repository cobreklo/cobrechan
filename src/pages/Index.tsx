import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import ShaderBackground from '@/components/shader-background';
import { ShaderAnimation } from '@/components/shader-lines';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import ProjectModal, { Project } from '@/components/ProjectModal';

const Index = () => {
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);
  const [isAlternateTheme, setIsAlternateTheme] = useState(false);

  return (
    <>
      <Helmet>
        <title>Claudio Salcedo | Desarrollador Web</title>
        <meta 
          name="description" 
          content="Portafolio de Claudio Salcedo - Desarrollador Web especializado en React y experiencias digitales únicas. Estudiante de Ingeniería en Informática." 
        />
        <meta name="keywords" content="desarrollador web, react, frontend, claudio salcedo, portafolio, chile" />
        <meta property="og:title" content="Claudio Salcedo | Desarrollador Web" />
        <meta property="og:description" content="Creando experiencias digitales desde cero" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="relative min-h-screen overflow-x-hidden">
        {isAlternateTheme ? (
          <div className="fixed inset-0 -z-10">
            <ShaderAnimation />
          </div>
        ) : (
          <ShaderBackground />
        )}
        <Navbar 
          onReset={() => setExpandedProject(null)} 
          onToggleTheme={() => setIsAlternateTheme(!isAlternateTheme)}
        />
        
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection onExpandProject={setExpandedProject} />
          <ContactSection />
        </main>

        <ProjectModal 
          project={expandedProject} 
          onClose={() => setExpandedProject(null)} 
        />
      </div>
    </>
  );
};

export default Index;
