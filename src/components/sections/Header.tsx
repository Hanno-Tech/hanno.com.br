import Image from "next/image";
import Link from "next/link";
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

const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
  e.preventDefault();
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const Header = () => {
  return (
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
          className="md:block flex-1 flex justify-center md:justify-start"
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
  );
}; 