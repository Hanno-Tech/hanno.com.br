import Image from "next/image";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const Process = () => {
  return (
    <motion.section 
      id="processo"
      className="w-full bg-white rounded-t-[80px] py-16 min-h-screen"
      role="region"
      aria-label="Nosso processo"
    >
      <motion.div 
        className="container mx-auto px-4 lg:px-8 xl:px-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-4xl font-bold text-center text-hanno-text mb-12"
          variants={fadeInUp}
        >
          Nosso processo
        </motion.h2>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-6 md:gap-8 gap-20 gap-y-24 md:gap-y-24 mb-16 h-full">
          {[
            {
              number: "01",
              title: "Diagnóstico",
              description: "Investigamos a fundo o seu negócio para entender suas dores, mapear processos e identificar oportunidades reais de melhoria com tecnologia."
            },
            {
              number: "02",
              title: "Onboarding",
              description: "Organizamos todas as informações, definimos escopo, prioridades e cronograma, garantindo que você se sinta seguro e no controle desde o início."
            },
            {
              number: "03",
              title: "Desenvolvimento",
              description: "Construímos seu sistema de forma ágil e colaborativa, com entregas parciais, revisões constantes e total transparência durante o processo."
            },
            {
              number: "04",
              title: "Suporte",
              description: "Depois da entrega, seguimos com você: ajustamos, orientamos e mantemos tudo funcionando para que sua experiência seja leve e contínua."
            }
          ].map((item, index) => (
            <motion.div
              key={`processo-${index}`}
              className="relative h-full min-h-[50vh]"
              whileHover={{ y: -5 }}
              variants={fadeInUp}
            >
              {/* Card de fundo */}
              <div className="bg-hanno-purple rounded-2xl p-8 -mb-6 flex justify-center">
                <Image
                  src={`/cat-${index+1}-green.svg`}
                  alt="Ícone do gato"
                  width={40}
                  height={40}
                  priority
                />
              </div>
              
              {/* Card principal */}
              <div className="bg-hanno-text p-6 rounded-2xl shadow-lg flex flex-col items-center text-center h-full">
                <h3 className="text-xl font-bold text-hanno-green mb-4">
                  {item.title}
                </h3>
                <p className="text-white text-sm flex-grow text-left">
                  {item.description}
                </p>
                <p className="text-white text-5xl font-bold">
                  {item.number}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}; 