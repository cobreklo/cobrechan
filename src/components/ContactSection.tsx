import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MessageCircle, Instagram, Send, Sparkles } from 'lucide-react';
import ContactModal from './ContactModal';

const contactMethods = [
  {
    name: "Email",
    value: "lethermand123@gmail.com",
    href: "mailto:lethermand123@gmail.com",
    icon: Mail,
    color: "primary",
    description: "Para consultas profesionales"
  },
  {
    name: "Discord",
    value: "cobreklo",
    href: "https://discord.com/users/cobreklo",
    icon: MessageCircle,
    color: "secondary",
    description: "Chat directo y rápido"
  },
  {
    name: "Instagram",
    value: "@cobrechan",
    href: "https://instagram.com/cobrechan",
    icon: Instagram,
    color: "accent",
    description: "Sígueme para actualizaciones"
  }
];

const getColorClasses = (color: string) => {
  const colorMap: Record<string, { text: string; bg: string; border: string; hover: string }> = {
    primary: { 
      text: 'text-primary', 
      bg: 'bg-primary/10', 
      border: 'border-primary/30',
      hover: 'hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,107,0,0.3)]'
    },
    secondary: { 
      text: 'text-secondary', 
      bg: 'bg-secondary/10', 
      border: 'border-secondary/30',
      hover: 'hover:bg-secondary/20 hover:border-secondary/50 hover:shadow-[0_0_30px_rgba(147,51,234,0.3)]'
    },
    accent: { 
      text: 'text-accent', 
      bg: 'bg-accent/10', 
      border: 'border-accent/30',
      hover: 'hover:bg-accent/20 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]'
    },
  };
  return colorMap[color] || colorMap.primary;
};

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="contact" className="relative py-32 overflow-hidden" ref={ref}>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Disponible para proyectos</span>
          </motion.div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">¿Tienes un proyecto</span>
            <br />
            <span className="text-foreground">en mente?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Estoy listo para ayudarte a convertir tu idea en una experiencia digital 
            increíble. ¡Hablemos!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {contactMethods.map((method, index) => {
            const colors = getColorClasses(method.color);
            return (
              <motion.a
                key={method.name}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={(e) => {
                  if (method.name === 'Email') {
                    e.preventDefault();
                    setIsModalOpen(true);
                  }
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group p-6 rounded-2xl border ${colors.border} ${colors.bg} backdrop-blur-sm transition-all duration-500 ${colors.hover}`}
              >
                <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <method.icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">
                  {method.name}
                </h3>
                <p className={`font-medium ${colors.text} mb-2`}>
                  {method.value}
                </p>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
              </motion.a>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl glow-orange hover:bg-primary/90 transition-all duration-300"
          >
            <Send className="w-5 h-5" />
            Enviar Mensaje
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-32 pt-8 border-t border-border/50"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 Claudio Salcedo. Todos los derechos reservados.
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              Hecho con <span className="text-primary">♥</span> y mucho sos.
            </p>
          </div>
        </div>
      </motion.footer>
    </section>
  );
};

export default ContactSection;
