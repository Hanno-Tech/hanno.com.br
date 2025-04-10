import Image from "next/image";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const About = () => {
  return (
    <motion.section 
      id="sobre"
      className="w-full bg-hanno-purple relative rounded-t-[80px] min-h-screen"
      role="region"
      aria-label="Sobre a Hanno"
    >
      <motion.div 
        className="container mx-auto px-4 lg:px-8 xl:px-12 py-16 flex items-center"
      >
        <div className="w-full md:w-[60%] lg:w-[50%] space-y-6">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
            variants={fadeInUp}
          >
            Adote a tecnologia<br />que transforma
          </motion.h2>
          <motion.p 
            className="text-lg text-white/90"
            variants={fadeInUp}
          >
            Unimos expertise técnica a um atendimento acolhedor, tornando a{' '}
            <strong>adoção de tecnologia algo simples</strong>, 
            seguro e sem complicações.
          </motion.p>
          <motion.p 
            className="text-lg text-white/80"
            variants={fadeInUp}
          >
            Acreditamos que cada negócio merece uma experiência transparente, 
            com foco em resultados sólidos e um suporte contínuo personalizado.
          </motion.p>

          <motion.div className="flex flex-col gap-4 mt-8">
            <div className="flex gap-4">
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-lg flex-1 flex items-center justify-center text-center"
                variants={fadeInUp}
              >
                <h2 className="text-2xl font-bold text-hanno-purple">
                  Startups em fase inicial
                </h2>
              </motion.div>
              
              <motion.div 
                className="bg-hanno-text p-6 rounded-lg shadow-lg flex-1 flex items-center justify-center text-center"
                variants={fadeInUp}
              >
                <h2 className="text-2xl font-bold text-white">
                  Indústrias
                </h2>
              </motion.div>
            </div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-lg"
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-bold text-hanno-purple">
                Pequenas e médias empresas
              </h2>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="hidden md:block absolute right-0 top-0 h-full w-[40%] overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/mask.svg"
            alt="Padrão decorativo"
            fill
            className="object-cover opacity-20"
            priority
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}; 