'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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

const catImages = [1, 2, 3, 4];

const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
  e.preventDefault();
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const handleWhatsApp = () => {
  const message = encodeURIComponent("Olá! Vi seu site e gostaria de marcar uma call para conversarmos sobre um projeto. Podemos agendar?");
  window.open(`https://wa.me/5548984679097?text=${message}`, '_blank');
};

export default function Home() {
  const [cats, setCats] = useState([1, 2, 3, 4]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCats(prevCats => {
        return prevCats.map((cat, index) => {
          // Incrementa o número do gato, voltando para 1 se passar de 4
          return cat === 4 ? 1 : cat + 1;
        });
      });
    }, 1000); // Mudando a cada 1 segundo

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-hanno-text overflow-hidden">
      {/* Header */}
      <motion.header 
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full flex items-center justify-between relative z-10 bg-white"
      >
        <motion.div 
          className="container mx-auto px-4 lg:px-8 xl:px-12 py-6 flex items-center justify-between relative z-10"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image
              src="/hanno-logo.svg"
              alt="Hanno"
              width={120}
              height={40}
              priority
            />
          </motion.div>
          <nav className="hidden md:flex items-center gap-8">
            <motion.div variants={staggerChildren} initial="initial" animate="animate" className="flex items-center gap-8">
              {["Sobre", "Soluções", "Processo"].map((item) => (
                <motion.div
                  key={item}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <Link 
                    href={`#${item.toLowerCase()}`} 
                    onClick={(e) => handleScroll(e, item.toLowerCase())}
                    className="text-hanno-text hover:text-hanno-purple transition-colors"
                  >
                    {item}
                  </Link>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-hanno-purple transition-all duration-300 group-hover:w-full" />
                </motion.div>
              ))}
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="#contato" 
                  onClick={(e) => handleScroll(e, 'contato')}
                  className="bg-hanno-purple text-white px-6 py-2 rounded-full hover:opacity-90 transition-all shadow-lg hover:shadow-hanno-purple/20"
                >
                  Consultoria
                </Link>
              </motion.div>
            </motion.div>
          </nav>
        </motion.div>
      </motion.header>

      {/* Hero Section */}
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

      {/* Divisor com os gatinhos */}
      <motion.div className="w-full py-8 flex items-center justify-center bg-hanno-text">
        <div className="flex gap-[10vw]">
          {cats.map((catNumber, index) => (
            <motion.div
              key={`cat-${index}-${catNumber}`}
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 1, 1] }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={`/cat-${catNumber}.svg`}
                alt={`Gatinho ${catNumber}`}
                width={80}
                height={80}
                priority
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Sobre a Hanno */}
      <motion.section 
        id="sobre"
        className="w-full bg-hanno-purple relative rounded-t-[80px] min-h-screen"
        role="region"
        aria-label="Sobre a Hanno"
      >
        <motion.div 
          className="container mx-auto px-4 lg:px-8 xl:px-12 py-16 flex items-center"
        >
          <div className="w-[50%] space-y-6">
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
            className="absolute right-0 top-0 h-full w-[40%] overflow-hidden"
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

      {/* Seção de Soluções */}
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

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "💻", title: "Soluções Web", description: "Desenvolvemos plataformas web robustas e escaláveis para sua empresa." },
              { icon: "📱", title: "Aplicativos Mobile", description: "Criamos aplicativos móveis intuitivos para conectar você com seus clientes." },
              { icon: "🏢", title: "Startups", description: "Soluções personalizadas para startups em fase de crescimento e validação." },
              { icon: "🏭", title: "Grandes Empresas", description: "Sistemas empresariais completos para otimizar processos e aumentar produtividade." }
            ].map((item, index) => (
              <motion.div
                key={`solucao-${index}`}
                className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow h-full"
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
                  className="text-white bg-hanno-purple border border-hanno-purple rounded-full px-4 py-2 transition-colors"
                >
                  Agende uma call
                </button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Nosso processo */}
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

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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
                className="relative"
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

      
      {/* Entre em contato */}
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
            className="absolute left-0 top-0 h-full w-[40%] overflow-hidden"
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

          <div className="w-[50%] ml-auto space-y-6">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
              variants={fadeInUp}
            >
              Agende uma Consultoria gratuita com a Hanno
            </motion.h2>
            <motion.div className="space-y-4" variants={fadeInUp}>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full p-3 rounded-lg bg-white text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-hanno-green"
                />
                <input
                  type="text"
                  placeholder="Nome da empresa"
                  className="w-full p-3 rounded-lg bg-white text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-hanno-green"
                />
              </div>
              
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="w-full p-3 rounded-lg bg-white text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-hanno-green"
                />
                <input
                  type="tel"
                  placeholder="Seu WhatsApp"
                  className="w-full p-3 rounded-lg bg-white text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-hanno-green"
                />
              </div>
              
              <textarea
                placeholder="Descreva sua necessidade"
                className="w-full p-3 rounded-lg bg-white text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-hanno-green h-32 resize-none"
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="w-full bg-hanno-text pt-16 pb-4">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo e Slogan */}
            <div className="space-y-6">
              <Image
                src="/hanno-logo.svg"
                alt="Hanno"
                width={300}
                height={60}
                priority
              />
              <p className="text-hanno-purple text-xl font-medium">
                Adote a tecnologia
              </p>
            </div>

            {/* Contatos e Redes Sociais */}
            <div className="mt-8 md:mt-0 md:ml-8 space-y-4">
              <h3 className="text-white font-bold text-xl mb-6">
                Conecte-se conosco
              </h3>
              <div className="space-y-3">
                <p className="text-white">
                  <span className="font-medium">E-mail:</span> contato@hanno.com.br
                </p>
                <p className="text-white">
                  <span className="font-medium">Telefone:</span> (48) 98467-9097
                </p>
                <div className="flex gap-4 items-center">
                  <Link
                    href="https://www.instagram.com/hanno.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-hanno-purple transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/hanno-tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-hanno-purple transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-6 pt-8">
            <p className="text-white text-center text-sm">
              © {new Date().getFullYear()} Hanno Tecnologia. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
