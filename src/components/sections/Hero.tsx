import Image from "next/image";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const handleWhatsApp = () => {
  const message = encodeURIComponent("Olá! Vi seu site e gostaria de marcar uma call para conversarmos sobre um projeto. Podemos agendar?");
  window.open(`https://wa.me/5548984679097?text=${message}`, '_blank');
};

export const Hero = () => {
  return (
    <motion.section 
      initial="initial"
      animate="animate"
      variants={staggerChildren}
      className="w-full bg-white min-h-screen"
    >
      <motion.div className="container mx-auto px-4 lg:px-8 xl:px-12 flex flex-col md:flex-row items-center justify-between">
        <motion.div 
          variants={fadeInUp}
          className="md:w-1/2 space-y-6"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-hanno-text leading-tight"
          >
            Tecnologia sob medida para o seu crescimento.
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-hanno-text opacity-90"
          >
            Desenvolvemos o sistema perfeito para as necessidades de <strong>startups, micro e pequenas empresas!</strong>
          </motion.p>
          <motion.button
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsApp}
            className="bg-hanno-purple text-white px-8 py-3 rounded-full text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-hanno-purple/20"
          >
            Solicite uma demonstração
          </motion.button>
        </motion.div>
        <motion.div 
          variants={fadeInUp}
          className="md:w-1/2 mt-12 md:mt-0 relative z-0"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 2, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Image
              src="/hero-illustration.svg"
              alt="Interfaces do sistema"
              width={600}
              height={500}
              className="w-full h-auto drop-shadow-2xl"
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}; 