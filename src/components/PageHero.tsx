import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="w-full bg-gradient-primary text-white pt-48 md:pt-52 pb-12 md:pb-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p 
            className="text-base md:text-lg text-white/85 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
