import React from 'react';
import { ShoppingCart, UtensilsCrossed } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onProfileClick: () => void;
  currentScreen: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onCartClick,
  onProfileClick,
  currentScreen
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-100/60 px-4 py-3 flex items-center justify-between max-w-lg mx-auto w-full transition-all duration-300">
      <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.location.reload()}>
        <img
          alt="A&L Taquería Logo"
          className="h-9 w-9 object-contain rounded-xl border border-orange-100 shadow-sm"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8IRXSzRkq1fgltQOrNs_fEGw2Ph2aTNL07_Qk57qD877tFkAH-wI2nuv9yIlse8-V4zOBwqHp9cFrsvoUD9uyX4X73ZF5zn_U6ivHis_GE0fc8gVPuGwxQ-sSCJ_oZ2qVO9wZxBbaXfNVaXu_FvUocCveNFyZouSXA46Wdsim5oU_6pWlQa07vcNgDF_xmSJHTOtTEsgoGsau0mZM48BswwZyEYjLiY50IcOD71ANJC3JMLjjagSSbZuiwKu-iCz0ckKThvx2zFh4"
        />
        <div className="flex flex-col">
          <span className="font-display font-black text-lg text-deep-orange leading-none tracking-tight">A&L Taquería</span>
          <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Haz Tu Pedido</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onProfileClick}
          className={`p-2 rounded-full transition-colors flex items-center justify-center ${
            currentScreen === 'profile'
              ? 'bg-deep-orange/10 text-deep-orange'
              : 'text-on-surface-variant hover:bg-orange-50'
          }`}
          title="Ver mi perfil"
        >
          <div className="w-5 h-5 rounded-full bg-orange-100 text-deep-orange text-xs font-bold flex items-center justify-center ring-2 ring-white">
            👤
          </div>
        </button>

        <motion.button
          onClick={onCartClick}
          className={`relative p-2 rounded-full flex items-center justify-center transition-colors ${
            currentScreen === 'cart'
              ? 'bg-deep-orange text-white'
              : 'text-deep-orange bg-deep-orange/10 hover:bg-deep-orange/20'
          }`}
          whileTap={{ scale: 0.92 }}
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <motion.span
              key={cartCount}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-1.5 -right-1.5 bg-cilantro-green text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
            >
              {cartCount}
            </motion.span>
          )}
        </motion.button>
      </div>
    </header>
  );
};
