import React from 'react';
import { Utensils, Flame, Layers, ChefHat, GlassWater } from 'lucide-react';
import { motion } from 'motion/react';

interface CategoryCarouselProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories = [
    { id: 'all', label: 'Todos', icon: Utensils, color: 'text-deep-orange' },
    { id: 'tacos', label: 'Tacos', icon: Flame, color: 'text-primary' },
    { id: 'sincronizadas', label: 'Sincronizadas', icon: Layers, color: 'text-amber-600' },
    { id: 'burritos', label: 'Burritos', icon: ChefHat, color: 'text-orange-700' },
    { id: 'bebidas', label: 'Bebidas', icon: GlassWater, color: 'text-teal-600' },
  ];

  return (
    <section className="mb-4 mt-1 relative w-full overflow-hidden">
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 px-4 -mx-4 scroll-smooth">
        {categories.map((cat, idx) => {
          const isSelected = selectedCategory === cat.id;
          const Icon = cat.icon;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="shrink-0 flex flex-col items-center group focus:outline-none"
            >
              <motion.div
                whileTap={{ scale: 0.92 }}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-deep-orange/15 border-2 border-deep-orange text-deep-orange shadow-sm'
                    : 'bg-white border border-orange-100 text-on-surface-variant hover:border-deep-orange/40 group-hover:text-deep-orange hover:shadow-sm'
                }`}
              >
                <Icon className="w-6 h-6" />
              </motion.div>
              <span
                className={`text-[10px] font-bold mt-1.5 transition-colors ${
                  isSelected ? 'text-deep-orange' : 'text-on-surface-variant/80'
                }`}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Decorative gradient Fades on scroll ends (for mobile display) */}
      <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-warm-cream to-transparent pointer-events-none md:hidden z-10"></div>
      <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-warm-cream to-transparent pointer-events-none md:hidden z-10"></div>
    </section>
  );
};
