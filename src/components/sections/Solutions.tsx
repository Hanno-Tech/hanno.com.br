import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const handleWhatsApp = () => {
  const message = encodeURIComponent("Olá! Vim através do site da hanno e gostaria de marcar um horário para conversarmos sobre um projeto. Podemos agendar ?");
  window.open(`https://wa.me/5548984679097?text=${message}`, '_blank');
};

export const Solutions = () => {
  return (
    <motion.section 
      id="soluções"
      className="w-full py-16 mb-16 min-h-screen"
      role="region"
      aria-label="Nossas soluções"
    >
      <motion.div 
        className="container mx-auto px-4 lg:px-8 xl:px-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-4xl font-bold text-center text-hanno-green mb-12"
          variants={fadeInUp}
        >
          Entenda o que oferecemos:
        </motion.h2>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
          {[
            { icon: "💻", title: "Soluções Web", description: "Desenvolvemos plataformas web robustas e escaláveis para sua empresa." },
            { icon: "📱", title: "Aplicativos Mobile", description: "Criamos aplicativos móveis intuitivos para conectar você com seus clientes." },
            { icon: "🏢", title: "Startups", description: "Soluções personalizadas para startups em fase de crescimento e validação." },
            { icon: "🏭", title: "Grandes Empresas", description: "Sistemas empresariais completos para otimizar processos e aumentar produtividade." }
          ].map((item, index) => (
            <motion.div
              key={`solucao-${index}`}
              className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow h-full min-h-[50vh]"
              whileHover={{ y: -5 }}
              variants={fadeInUp}
            >
              <div className="text-hanno-purple text-4xl mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-hanno-purple mb-4">
                {item.title}
              </h3>
              <p className="text-hanno-text text-sm flex-grow mb-4">
                {item.description}
              </p>
              <button 
                onClick={handleWhatsApp}
                className="text-white bg-hanno-purple border border-hanno-purple rounded-full px-2 py-2 transition-colors"
              >
                Agende uma conversa
              </button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}; 