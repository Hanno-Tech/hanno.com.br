import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from 'react-hot-toast';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    whatsapp: '',
    message: ''
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emptyFields = Object.entries(formData).filter(([_, value]) => !value.trim());
    
    if (emptyFields.length > 0) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }

    const mensagemWhatsApp = `Olá! Gostaria de agendar uma consultoria.\n\nNome: ${formData.name}\nEmpresa: ${formData.company}\nE-mail: ${formData.email}\nWhatsApp: ${formData.whatsapp}\nMensagem: ${formData.message}`;
    
    window.open(`https://wa.me/5548984679097?text=${encodeURIComponent(mensagemWhatsApp)}`, '_blank');
    
    setFormData({
      name: '',
      company: '',
      email: '',
      whatsapp: '',
      message: ''
    });

    toast.success('Mensagem enviada com sucesso!');
  };

  return (
    <motion.section 
      id="contato"
      className="w-full bg-hanno-purple relative min-h-screen"
      role="region"
      aria-label="Entre em contato"
    >
      <motion.div 
        className="container mx-auto px-4 lg:px-8 xl:px-12 py-16 flex items-center"
      >
        <motion.div 
          className="absolute left-0 top-0 h-full w-[40%] overflow-hidden hidden md:block lg:w-[45%] md:w-[20%]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/mask-2.svg"
            alt="Padrão decorativo"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <div className="w-full md:w-[70%] lg:w-[50%] ml-auto space-y-6">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
            variants={fadeInUp}
          >
            Agende uma Consultoria gratuita com a Hanno
          </motion.h2>
          <motion.div className="space-y-4" variants={fadeInUp}>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Seu nome"
                  className="w-full p-3 rounded-lg bg-white text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-hanno-text"
                />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleFormChange}
                  placeholder="Nome da empresa"
                  className="w-full p-3 rounded-lg bg-white text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-hanno-text"
                />
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Seu email"
                  className="w-full p-3 rounded-lg bg-white text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-hanno-text"
                />
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleFormChange}
                  placeholder="Seu WhatsApp"
                  className="w-full p-3 rounded-lg bg-white text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-hanno-text"
                />
              </div>
              
              <textarea
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                placeholder="Descreva sua necessidade"
                className="w-full p-3 rounded-lg bg-white text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-hanno-text h-32 resize-none"
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-hanno-text text-white px-8 py-3 rounded-full text-lg hover:opacity-90 transition-all"
              >
                Enviar
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}; 