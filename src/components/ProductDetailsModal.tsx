import React, { useState } from 'react';
import { X, Star, Plus, Minus, ClipboardList } from 'lucide-react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, notes: string) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity, notes);
    setQuantity(1);
    setNotes('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
        {/* Backdrop Link Click */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Sheet */}
        <motion.div
          initial={{ y: '100%', opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 230 }}
          className="bg-white rounded-t-3xl sm:rounded-2xl max-w-md w-full overflow-hidden relative shadow-2xl z-10 flex flex-col max-h-[85vh]"
        >
          {/* Close Floating Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-md text-charcoal-coffee hover:bg-white transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Image */}
          <div className="h-52 w-full relative">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            
            {/* Title overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              <h3 className="font-display font-black text-xl leading-tight drop-shadow-md">
                {product.name}
              </h3>
            </div>
          </div>

          {/* Modal scroll body */}
          <div className="p-5 overflow-y-auto no-scrollbar space-y-5 flex-grow">
            {/* Rating and Price Row */}
            <div className="flex justify-between items-center">
              {product.rating ? (
                <div className="flex items-center gap-1 bg-orange-50 px-2.5 py-1 rounded-full text-xs font-bold text-deep-orange">
                  <Star className="w-4 h-4 fill-deep-orange" />
                  <span>{product.rating} (Excelente)</span>
                </div>
              ) : (
                <div />
              )}
              <span className="font-display font-black text-2xl text-deep-orange">
                ${product.price} <span className="text-xs text-on-surface-variant font-bold font-sans">MXN</span>
              </span>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h5 className="font-sans font-bold text-xs text-on-surface-variant uppercase tracking-wider">Descripción</h5>
              <p className="text-xs text-charcoal-coffee/85 leading-relaxed bg-orange-50/30 p-3 rounded-xl border border-orange-100/40">
                {product.description}
              </p>
            </div>

            {/* Ingredients (if declared) */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="space-y-1.5">
                <h5 className="font-sans font-bold text-xs text-on-surface-variant uppercase tracking-wider">Ingredientes Clave</h5>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map((ing, i) => (
                    <span key={i} className="text-[10px] font-bold bg-[#fdf1ec] px-2.5 py-1 rounded-lg text-brand-primary">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Notes Input */}
            <div className="space-y-1.5">
              <label className="font-sans font-bold text-xs text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                <ClipboardList className="w-4 h-4 text-deep-orange" />
                Notas de preparación
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej. Sin cebolla, con limón extra, salsa verde aparte..."
                rows={2}
                className="w-full text-xs p-3 rounded-xl bg-orange-50/15 border border-orange-100 focus:outline-none focus:ring-1.5 focus:ring-deep-orange transition-all placeholder:text-on-surface-variant/50"
              />
            </div>
          </div>

          {/* Action Row at Bottom */}
          <div className="p-4 border-t border-orange-50/60 bg-white flex items-center justify-between gap-4">
            {/* Custom Quantities Selector */}
            <div className="flex items-center gap-3 bg-[#fdf1ec] px-3 py-1.5 rounded-xl border border-orange-100/40">
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold text-brand-primary text-lg"
              >
                <Minus className="w-4 h-4" />
              </motion.button>
              <span className="font-display font-extrabold text-base text-brand-primary w-5 text-center">
                {quantity}
              </span>
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => setQuantity(prev => prev + 1)}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold text-brand-primary text-lg"
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Add Action Button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleAdd}
              className="flex-grow bg-deep-orange hover:bg-orange-600 font-display font-black text-white text-xs tracking-wider uppercase py-3.5 rounded-xl text-center shadow-md shadow-orange-100 transition-all cursor-pointer"
            >
              Agregar • ${(product.price * quantity).toFixed(2)}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
