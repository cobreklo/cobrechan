import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Rocket, Heart, Code } from 'lucide-react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: GraduationCap,
      title: "Estudiante",
      description: "2° año de Ingeniería en Informática",
      color: "primary"
    },
    {
      icon: Code,
      title: "Desarrollador",
      description: "Enfocado en desarrollo web moderno",
      color: "secondary"
    },
    {
      icon: Rocket,
      title: "Creador",
      description: "Proyectos desde cero a producción",
      color: "accent"
    },
    {
      icon: Heart,
      title: "Apasionado",
      description: "Por lo visual y lo técnico",
      color: "primary"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { text: string; bg: string; border: string }> = {
      primary: { text: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/30' },
      secondary: { text: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/30' },
      accent: { text: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/30' },
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <section id="about" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Sobre Mí</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Soy <span className="text-primary font-semibold">Claudio Salcedo</span>, 
              estudiante de segundo año de Ingeniería en Informática con una pasión 
              genuina por el desarrollo web y la creación de experiencias digitales 
              que impactan.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Me especializo en construir aplicaciones web modernas desde cero, 
              combinando lo mejor del diseño visual con arquitecturas técnicas sólidas. 
              Cada proyecto es una oportunidad para aprender y crear algo único.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Trabajo tanto con clientes que buscan soluciones personalizadas como 
              en proyectos propios que me permiten experimentar con nuevas tecnologías 
              y tendencias del desarrollo frontend.
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-8 pt-6"
            >
              <div className="text-center">
                <span className="block text-4xl font-display font-bold text-primary">3+</span>
                <span className="text-sm text-muted-foreground">Proyectos Cliente</span>
              </div>
              <div className="text-center">
                <span className="block text-4xl font-display font-bold text-secondary">2°</span>
                <span className="text-sm text-muted-foreground">Año Universitario</span>
              </div>
              <div className="text-center">
                <span className="block text-4xl font-display font-bold text-accent">∞</span>
                <span className="text-sm text-muted-foreground">Ganas de Aprender</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Highlight Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => {
              const colors = getColorClasses(item.color);
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`p-6 rounded-xl border ${colors.border} ${colors.bg} backdrop-blur-sm card-hover cursor-default`}
                >
                  <item.icon className={`w-8 h-8 ${colors.text} mb-4`} />
                  <h3 className="font-display font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
