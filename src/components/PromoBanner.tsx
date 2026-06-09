import React from 'react';
import { Truck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface PromoBannerProps {
  onApplyCode?: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onApplyCode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="p-4"
    >
      <div className="bg-cilantro-green rounded-2xl p-4 flex items-center justify-between text-white soft-shadow overflow-hidden relative">
        {/* Subtle decorative vector bubbles */}
        <div className="absolute -right-8 -top-8 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute -left-6 -bottom-6 w-20 h-20 bg-white/5 rounded-full blur-lg pointer-events-none"></div>

        <div className="z-15 flex items-start gap-3">
          <div className="p-2 bg-white/15 rounded-xl mt-0.5 flex items-center justify-center">
            <Truck className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-display font-extrabold text-[#fce8a1] text-base leading-none">¡Envío GRATIS hoy!</h2>
              <Sparkles className="w-3.5 h-3.5 text-[#fce8a1]" />
            </div>
            <p className="text-xs text-white/90 font-medium mt-1">
              En pedidos mayores a <span className="font-extrabold text-[#fce8a1]">$250 MXN</span>. Usando el código <span className="bg-white/25 px-1.5 py-0.5 rounded font-black tracking-wider text-white">TACOGRATIS</span>.
            </p>
          </div>
        </div>

        {onApplyCode && (
          <div className="z-10 ml-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onApplyCode}
              className="bg-[#fce8a1] text-brand-secondary font-display font-black text-xs px-3.5 py-2 rounded-xl transition-all hover:bg-white active:scale-95 shadow-sm whitespace-nowrap"
            >
              Pedir
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
