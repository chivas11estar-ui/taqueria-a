import React from 'react';
import { Plus, Star } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (e: React.MouseEvent, product: Product) => void;
  onCardClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onCardClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      onClick={() => onCardClick(product)}
      className="bg-white rounded-2xl overflow-hidden soft-shadow soft-shadow-hover transition-all flex flex-col group relative border border-orange-50 cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="h-40 w-full bg-[#fdf1ec] relative overflow-hidden">
        <img
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={product.imageUrl}
          loading="lazy"
        />

        {/* Rating Badge */}
        {product.rating && (
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm text-[10px] font-bold text-charcoal-coffee z-10">
            <Star className="w-3 h-3 text-deep-orange fill-deep-orange" />
            <span>{product.rating}</span>
          </div>
        )}

        {/* Popular Tag */}
        {product.isPopular && (
          <div className="absolute top-2 right-2 bg-cilantro-green text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-sm tracking-wider z-10">
            Popular
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div className="p-3 flex flex-col flex-grow">
        <h4 className="font-sans font-bold text-sm text-charcoal-coffee leading-tight group-hover:text-deep-orange transition-colors line-clamp-1">
          {product.name}
        </h4>
        
        <p className="text-[11px] text-on-surface-variant/85 mt-1 line-clamp-2 leading-relaxed flex-grow">
          {product.description}
        </p>

        {/* Price & Add Button Row */}
        <div className="flex justify-between items-center mt-3 pt-2 border-t border-orange-50/50">
          <div className="flex flex-col">
            <span className="text-[10px] text-on-surface-variant/70 font-semibold leading-none uppercase">Precio</span>
            <span className="font-display text-base text-deep-orange font-extrabold mt-0.5 leading-none">
              ${product.price}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={(e) => onAddToCart(e, product)}
            className="bg-deep-orange text-white w-8 h-8 rounded-full hover:bg-orange-600 transition-all flex items-center justify-center shadow-sm"
            title="Agregar al carrito"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
