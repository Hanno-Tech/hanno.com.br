import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
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
  );
}; 