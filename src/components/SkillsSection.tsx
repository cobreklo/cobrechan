import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Code2, 
  Server, 
  Wrench, 
  BookOpen,
  FileCode,
  Palette,
  Database,
  GitBranch,
  Figma,
  Globe,
  Terminal,
  Cpu
} from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ElementType;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  color: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: Code2,
    color: "primary",
    skills: [
      { name: "HTML5", icon: FileCode, level: 90 },
      { name: "CSS3", icon: Palette, level: 85 },
      { name: "JavaScript", icon: Code2, level: 80 },
      { name: "React", icon: Globe, level: 75 },
      { name: "Tailwind CSS", icon: Palette, level: 85 },
    ]
  },
  {
    title: "Backend Básico",
    icon: Server,
    color: "secondary",
    skills: [
      { name: "Node.js", icon: Server, level: 60 },
      { name: "Express", icon: Terminal, level: 55 },
      { name: "SQL Básico", icon: Database, level: 50 },
      { name: "REST APIs", icon: Globe, level: 65 },
    ]
  },
  {
    title: "Herramientas",
    icon: Wrench,
    color: "accent",
    skills: [
      { name: "Git", icon: GitBranch, level: 75 },
      { name: "VS Code", icon: Code2, level: 90 },
      { name: "Figma", icon: Figma, level: 70 },
      { name: "Vercel", icon: Globe, level: 80 },
      { name: "GitHub", icon: GitBranch, level: 75 },
    ]
  },
  {
    title: "En Aprendizaje",
    icon: BookOpen,
    color: "primary",
    skills: [
      { name: "TypeScript", icon: FileCode, level: 45 },
      { name: "Next.js", icon: Globe, level: 40 },
      { name: "PostgreSQL", icon: Database, level: 35 },
      { name: "Docker", icon: Cpu, level: 30 },
    ]
  }
];

const getColorClasses = (color: string) => {
  const colorMap: Record<string, { text: string; bg: string; border: string; fill: string }> = {
    primary: { 
      text: 'text-primary', 
      bg: 'bg-primary', 
      border: 'border-primary/30',
      fill: 'from-primary to-primary/50'
    },
    secondary: { 
      text: 'text-secondary', 
      bg: 'bg-secondary', 
      border: 'border-secondary/30',
      fill: 'from-secondary to-secondary/50'
    },
    accent: { 
      text: 'text-accent', 
      bg: 'bg-accent', 
      border: 'border-accent/30',
      fill: 'from-accent to-accent/50'
    },
  };
  return colorMap[color] || colorMap.primary;
};

const SkillCard = ({ category, index, isInView }: { category: SkillCategory; index: number; isInView: boolean }) => {
  const colors = getColorClasses(category.color);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -10 }}
      className={`p-6 rounded-2xl border ${colors.border} bg-card/50 backdrop-blur-sm card-hover`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-xl ${colors.bg}/10`}>
          <category.icon className={`w-6 h-6 ${colors.text}`} />
        </div>
        <h3 className="font-display text-xl font-bold text-foreground">
          {category.title}
        </h3>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        {category.skills.map((skill, skillIndex) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.15 + skillIndex * 0.1 + 0.3 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <skill.icon className={`w-4 h-4 ${colors.text}`} />
                <span className="text-sm font-medium text-foreground/90">
                  {skill.name}
                </span>
              </div>
              <span className={`text-xs font-bold ${colors.text}`}>
                {skill.level}%
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.level}%` } : {}}
                transition={{ duration: 1, delay: index * 0.15 + skillIndex * 0.1 + 0.5, ease: "easeOut" }}
                className={`h-full rounded-full bg-gradient-to-r ${colors.fill}`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Habilidades</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tecnologías y herramientas con las que trabajo para crear experiencias web increíbles
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard 
              key={category.title} 
              category={category} 
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
