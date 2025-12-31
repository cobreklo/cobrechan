import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Maximize2, X, PlayCircle } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  url: string;
  tags: string[];
  color: string;
}

const projects: Project[] = [
  {
    title: "Motadebujos",
    description: "Galería digital y tienda de comisiones artísticas. Coverarts, dibujos y portadas para álbumes y canciones. Proyecto para cliente con diseño inmersivo.",
    url: "https://motadebujos.vercel.app/",
    tags: ["React", "Galería", "E-commerce", "Arte Digital"],
    color: "primary"
  },
  {
    title: "PPC Cotapos - E-commerce",
    description: "Single Page Application para venta de cerveza artesanal. Diseño moderno y atractivo con experiencia de usuario fluida. Proyecto para cliente.",
    url: "https://ppcotapos.vercel.app/",
    tags: ["React", "SPA", "E-commerce", "Diseño Moderno"],
    color: "secondary"
  },
  {
    title: "Portafolio Audiovisual",
    description: "Portfolio audiovisual profesional con experiencia inmersiva. Showcase de trabajos creativos con animaciones y transiciones elegantes. Proyecto para cliente.",
    url: "https://portafoliodegollenme.vercel.app/",
    tags: ["React", "Portfolio", "Audiovisual", "Animaciones"],
    color: "accent"
  },
  {
    title: "Sinakawanpuntocom",
    description: "Plataforma web interactiva con diseño personalizado. Experiencia de usuario optimizada y navegación fluida.",
    url: "https://sinakawanpuntocom.vercel.app/",
    tags: ["React", "Web App", "Frontend", "UI/UX"],
    color: "primary"
  }
];

const getColorClasses = (color: string) => {
  const colorMap: Record<string, { text: string; border: string; glow: string; bg: string }> = {
    primary: { 
      text: 'text-primary', 
      border: 'border-primary/40',
      glow: 'hover:shadow-[0_0_40px_rgba(255,107,0,0.3)]',
      bg: 'bg-primary/5'
    },
    secondary: { 
      text: 'text-secondary', 
      border: 'border-secondary/40',
      glow: 'hover:shadow-[0_0_40px_rgba(147,51,234,0.3)]',
      bg: 'bg-secondary/5'
    },
    accent: { 
      text: 'text-accent', 
      border: 'border-accent/40',
      glow: 'hover:shadow-[0_0_40px_rgba(34,197,94,0.3)]',
      bg: 'bg-accent/5'
    },
  };
  return colorMap[color] || colorMap.primary;
};

const ProjectCard = ({ project, index, isInView, onExpand }: { project: Project; index: number; isInView: boolean; onExpand: (project: Project) => void }) => {
  const colors = getColorClasses(project.color);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        whileHover={{ y: -10 }}
        className={`group relative rounded-2xl border ${colors.border} bg-card/30 backdrop-blur-sm overflow-hidden transition-all duration-500 ${colors.glow}`}
      >
        {/* Project Preview */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          {showPreview ? (
            <iframe
              src={project.url}
              title={project.title}
              loading="lazy"
              className="w-full h-full border-0"
              tabIndex={-1}
            />
          ) : (
            <div className={`w-full h-full flex flex-col items-center justify-center ${colors.bg} relative`}>
              <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-background/50`} />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowPreview(true)}
                className={`relative z-10 flex flex-col items-center gap-2 p-4 rounded-xl border ${colors.border} bg-background/50 backdrop-blur-md transition-colors hover:bg-background/80`}
              >
                <PlayCircle className={`w-12 h-12 ${colors.text}`} />
                <span className="text-sm font-medium">Cargar Vista Previa</span>
              </motion.button>
              <div className="absolute bottom-4 left-4 text-xs text-muted-foreground/60">
                Click para interactuar
              </div>
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onExpand(project)}
              className="p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-foreground/10 text-foreground hover:text-primary transition-colors"
            >
              <Maximize2 size={18} />
            </motion.button>
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-foreground/10 text-foreground hover:text-primary transition-colors"
            >
              <ExternalLink size={18} />
            </motion.a>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6">
          <h3 className={`font-display text-2xl font-bold mb-3 ${colors.text}`}>
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 text-xs font-medium rounded-full border ${colors.border} ${colors.text} bg-background/50`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

const ProjectsSection = ({ onExpandProject }: { onExpandProject: (project: Project) => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Proyectos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trabajos realizados para clientes reales. Cada proyecto es único y 
            refleja atención al detalle y pasión por el desarrollo web.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
              onExpand={onExpandProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
