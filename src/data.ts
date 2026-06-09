import { Product } from './types';

export const MENU_PRODUCTS: Product[] = [
  {
    id: 'tacos_bistec',
    name: 'Tacos de Bistec (Orden de 3)',
    description: 'Jugoso bistec a la plancha picado fino, cebolla fresca, cilantro y tu elección de salsa verde o roja. Servidos en tortillas de maíz amarillo recién hechas.',
    price: 95,
    category: 'tacos',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUmhM23muLP__USZFKjkdI2fF_IPOI5iZQ3GrEFxERN3QFJnU-fcVY2Q41dq05730UeIslDajJTT3JSBejtZ4WzFiw6XDPfbgUc0DM1dXBOZa2tWzqUpBRH_qU5f91T_u5QFIXzu4cS2D-vaRJvsQ_lE9ZbtpYkCykPaHrffPov-yInQtyDgnm2JIaT0DgiJBChFOOrwkmNZpuyj1eeA0H6pPv0mtO7TqQgJ2eTNRuwSsJkGUoWDie6UbVs0D0SNEnNgxtw8zZa1Be',
    rating: 4.9,
    isPopular: true,
    ingredients: ['Bistec premium', 'Cebolla', 'Cilantro', 'Tortilla de maíz recién hecha']
  },
  {
    id: 'tacos_pastor',
    name: 'Tacos al Pastor (Orden de 3)',
    description: 'Deliciosa carne de cerdo marinada al pastor con piña asada, cebolla fresca y cilantro sobre tortilla de maíz recién hecha.',
    price: 90,
    category: 'tacos',
    imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    isPopular: true,
    ingredients: ['Cerdo al pastor', 'Piña asada', 'Cebolla', 'Cilantro']
  },
  {
    id: 'tacos_campechanos',
    name: 'Tacos Campechanos (Orden de 3)',
    description: 'La combinación perfecta de bistec premium de res y longaniza artesanal dorada con trocitos de chicharrón crujiente.',
    price: 98,
    category: 'tacos',
    imageUrl: 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    ingredients: ['Bistec de res', 'Longaniza', 'Chicharrón', 'Cebolla', 'Cilantro']
  },
  {
    id: 'sincronizada_original',
    name: 'Sincronizada Tradicional',
    description: 'Dos tortillas de harina rellenas de jamón de pierna seleccionado y abundante queso Oaxaca de hebra derretido. Servido con guacamole.',
    price: 70,
    category: 'sincronizadas',
    imageUrl: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    isPopular: false,
    ingredients: ['Tortilla de harina grande', 'Jamón de pierna', 'Queso Oaxaca', 'Guacamole']
  },
  {
    id: 'sincronizada_campera',
    name: 'Sincronizada Campera',
    description: 'Dos tortillas de harina tostadas rellenas de fajitas de bistec de res a la plancha, cebollitas asadas y abundante queso mixto gratinado.',
    price: 85,
    category: 'sincronizadas',
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    ingredients: ['Fajitas de bistec', 'Queso asadero', 'Tortilla de harina', 'Cebolla asada']
  },
  {
    id: 'burrito_clasico',
    name: 'Burrito Clásico',
    description: 'Gourmet burrito cortado a la mitad, con capas de arroz sazonado, frijoles negros, jugoso pollo a la plancha, queso derretido y pico de gallo fresco sobre tortilla de harina gigante.',
    price: 110,
    category: 'burritos',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj6WFmkv7cSmUJvupWXjUgxgeMQSYi2Z5KxSfmRKyhJxybODBUBMIJOEv1Pn4N5FdT1KspXMsmBaVwWpe06XHCsi-jWwqKDwh0UUw4A2u5UFHzMISsPWW7wZHyBzFtakEjUzzgdsXpNceEOztEZ0EkiW_oRTplsUBmajSY6fvFKqFI7jT7SImpaK4Jtee0Cf97ALgAQfHeIVHbVqTX_j2Sq2RM3fQejzndmq6jllh69u5IftpQNiA0Y8YT_m5a4IzXAYqmL5CdgHvp',
    rating: 4.8,
    isPopular: true,
    ingredients: ['Tortilla de harina gigante', 'Pollo a la parrilla', 'Arroz sazonado', 'Frijoles negros', 'Queso fundido', 'Pico de gallo']
  },
  {
    id: 'burrito_pastor',
    name: 'Burrito al Pastor',
    description: 'Exquisita tortilla gigante rellena de carne de cerdo al pastor, piña dorada, arroz, frijoles refritos, cilantro, cebolla y aderezo especial de la casa.',
    price: 115,
    category: 'burritos',
    imageUrl: 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    ingredients: ['Cerdo al pastor', 'Piña asada', 'Arroz', 'Frijoles', 'Salsa secreta', 'Queso Gouda']
  },
  {
    id: 'agua_horchata',
    name: 'Agua Fresca Horchata',
    description: 'Artesanal y cremosa bebida tradicional a base de arroz pulido y canela de Ceilán molida con un toque final de vainilla dulce de Papantla. Servido en vaso escarchado y frío.',
    price: 35,
    category: 'bebidas',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIOxXEcpwr4OPTay-cYcbwTHO42Y86aQX9MrfriJ8UFREbpjcTX_gpFcypVspq7uEoc820UMltjtmwT74CO36IJKlDl-opaAnYOyCMDkWbLLgL7NhFvwU7zP09w-adqdFgQ6Yd7R363-bcn4ZgKVoNYYbrwY1Jz8uGXaFdfd9JYtaZNRcVsBTNEJkIDIEeU4rA7qV9Mdg984YmI31Z4srcZOw_jZKN4jt4cD7HUdZtcwH49LtGJZsN4tJsLxbJmuQ51lZLz5rp_nHq',
    rating: 4.9,
    isPopular: true,
    ingredients: ['Arroz seleccionado', 'Canela premium', 'Vainilla natural', 'Leche condensada']
  },
  {
    id: 'agua_jamaica',
    name: 'Agua de Jamaica Orgánica',
    description: 'Concentrado fresco obtenido de flores deshidratadas de Jamaica seleccionada a mano, ligeramente endulzado con azúcar de caña virgen. Súper y refrescante fría.',
    price: 35,
    category: 'bebidas',
    imageUrl: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    ingredients: ['Flores de Jamaica', 'Agua purificada', 'Azúcar de caña', 'Hielo abundante']
  },
  {
    id: 'mexican_coke',
    name: 'Coca-Cola de Vidrio Original',
    description: 'La clásica Coca-Cola Mexicana embotellada en envase de vidrio tradicional y endulzada con caña de azúcar real. Se sirve bien fría.',
    price: 38,
    category: 'bebidas',
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    ingredients: ['Refresco carbonatado']
  }
];

export const LOYALTY_LEVELS = [
  { level: 1, min: 0, max: 499, name: "Novato", emoji: "🌱", bonusRate: 1.0 },
  { level: 2, min: 500, max: 1999, name: "Regular", emoji: "🔥", bonusRate: 1.1 },
  { level: 3, min: 2000, max: 4999, name: "Asiduo", emoji: "⭐", bonusRate: 1.2 },
  { level: 4, min: 5000, max: 7999, name: "Inseparable", emoji: "👑", bonusRate: 1.3 },
  { level: 5, min: 8000, max: Infinity, name: "Leyenda A&L", emoji: "🏆", bonusRate: 1.5 }
];

export const REWARDS = [
  { id: 'rew_taco', name: 'Orden de 3 Tacos Gratis', pointsRequired: 250, desc: 'Puedes canjearlo por cualquier orden de tacos (Bistec, Pastor, Campechanos).' },
  { id: 'rew_sincro', name: 'Sincronizada Original Gratis', pointsRequired: 180, desc: 'Canjeable por una Sincronizada tradicional con doble jamón y guacamole.' },
  { id: 'rew_burrito', name: 'Burrito Clásico Gratis', pointsRequired: 300, desc: 'Canjeable por nuestro Burrito Clásico con pollo o res a tu elección.' },
  { id: 'rew_bebida', name: 'Agua Fresca Gratis Grande', pointsRequired: 90, desc: 'Cualquier agua fresca tamaño grande (Horchata artesanal o Jamaica).' }
];
