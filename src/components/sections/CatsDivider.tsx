import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const CatsDivider = () => {
  const [cats, setCats] = useState([1, 2, 3, 4]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCats(prevCats => {
        return prevCats.map((cat, index) => {
          return cat === 4 ? 1 : cat + 1;
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
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
  );
}; 