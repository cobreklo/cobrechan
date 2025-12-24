import { Helmet } from 'react-helmet-async';
import ShaderBackground from '@/components/shader-background';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
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
        <ShaderBackground />
        <Navbar />
        
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
};

export default Index;
