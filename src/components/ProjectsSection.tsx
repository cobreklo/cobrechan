import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Maximize2, X } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  url: string;
  tags: string[];
  color: string;
}

const projects: Project[] = [
  {
    title: "Mota de Bujos",
    description: "Galería digital y tienda de comisiones artísticas. Coverarts, dibujos y portadas para álbumes y canciones. Proyecto para cliente con diseño inmersivo.",
    url: "https://motadebujos.vercel.app/",
    tags: ["React", "Galería", "E-commerce", "Arte Digital"],
    color: "primary"
  },
  {
    title: "PPC Cotapos",
    description: "Single Page Application para venta de cerveza artesanal. Diseño moderno y atractivo con experiencia de usuario fluida. Proyecto para cliente.",
    url: "https://ppcotapos.vercel.app/",
    tags: ["React", "SPA", "E-commerce", "Diseño Moderno"],
    color: "secondary"
  },
  {
    title: "Portafolio Aero",
    description: "Portfolio audiovisual profesional con experiencia inmersiva. Showcase de trabajos creativos con animaciones y transiciones elegantes. Proyecto para cliente.",
    url: "https://portafoliodegollenme.vercel.app/",
    tags: ["React", "Portfolio", "Audiovisual", "Animaciones"],
    color: "accent"
  }
];

const getColorClasses = (color: string) => {
  const colorMap: Record<string, { text: string; border: string; glow: string }> = {
    primary: { 
      text: 'text-primary', 
      border: 'border-primary/40',
      glow: 'hover:shadow-[0_0_40px_rgba(255,107,0,0.3)]'
    },
    secondary: { 
      text: 'text-secondary', 
      border: 'border-secondary/40',
      glow: 'hover:shadow-[0_0_40px_rgba(147,51,234,0.3)]'
    },
    accent: { 
      text: 'text-accent', 
      border: 'border-accent/40',
      glow: 'hover:shadow-[0_0_40px_rgba(34,197,94,0.3)]'
    },
  };
  return colorMap[color] || colorMap.primary;
};

const ProjectCard = ({ project, index, isInView }: { project: Project; index: number; isInView: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = getColorClasses(project.color);

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
          <iframe
            src={project.url}
            title={project.title}
            loading="lazy"
            className="w-full h-full border-0 pointer-events-none"
            tabIndex={-1}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsExpanded(true)}
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

      {/* Expanded Modal */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl"
          onClick={() => setIsExpanded(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden border border-primary/30"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={project.url}
              title={project.title}
              className="w-full h-full border-0"
            />
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-foreground/10 text-foreground hover:text-primary transition-colors"
            >
              <X size={24} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

const ProjectsSection = () => {
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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
