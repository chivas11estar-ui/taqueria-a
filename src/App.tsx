import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PromoBanner } from './components/PromoBanner';
import { CategoryCarousel } from './components/CategoryCarousel';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartScreen } from './components/CartScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ActiveOrderTracker } from './components/ActiveOrderTracker';
import { MENU_PRODUCTS } from './data';
import { Product, CartItem, UserProfile, Order } from './types';
import { Utensils, ShoppingCart, User, Search, Sparkles, MapPin, CheckCircle, Cross } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [screen, setScreen] = useState<'menu' | 'cart' | 'profile'>('menu');
  const [products] = useState<Product[]>(MENU_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Shopping Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // High-fidelity profile state initialized with client details
  const [profile, setProfile] = useState<UserProfile>({
    name: 'José Betancourt',
    email: 'jose.betancourt@ejemplo.com',
    phone: '33-1224-5678',
    address: 'Av. Chapultepec 415, Col. Americana, Guadalajara, Jalisco.',
    paymentMethod: 'cash',
    loyaltyPoints: 120,
    level: 1,
    levelName: 'Novato'
  });

  // Details Modal selected item
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Active status tracker state
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [trackerOpen, setTrackerOpen] = useState<boolean>(false);

  // Toast notification system
  const [toastMessage, setToastMessage] = useState<string>('');

  // Auto trigger for active order status advancement simulator
  useEffect(() => {
    if (!activeOrder || activeOrder.status === 'delivered') return;

    const timer = setTimeout(() => {
      let nextStatus: 'pending' | 'preparing' | 'on_way' | 'delivered' = 'preparing';
      if (activeOrder.status === 'pending') nextStatus = 'preparing';
      else if (activeOrder.status === 'preparing') nextStatus = 'on_way';
      else if (activeOrder.status === 'on_way') {
        nextStatus = 'delivered';
        // Add points on delivery!
        setProfile(prev => {
          const totalPoints = prev.loyaltyPoints + activeOrder.pointsEarned;
          // Determine new level specs based on points
          let newLevel = 1;
          let newLevelName = 'Novato';
          if (totalPoints >= 8000) {
            newLevel = 5;
            newLevelName = 'Leyenda A&L';
          } else if (totalPoints >= 5000) {
            newLevel = 4;
            newLevelName = 'Inseparable';
          } else if (totalPoints >= 2000) {
            newLevel = 3;
            newLevelName = 'Asiduo';
          } else if (totalPoints >= 500) {
            newLevel = 2;
            newLevelName = 'Regular';
          }

          return {
            ...prev,
            loyaltyPoints: totalPoints,
            level: newLevel,
            levelName: newLevelName
          };
        });
        showToast(`🎉 ¡Repartidor llegó! Has acumulado +${activeOrder.pointsEarned} puntos.`);
      }

      setActiveOrder(prev => prev ? { ...prev, status: nextStatus } : null);
    }, 15000); // automatic progression every 15 seconds!

    return () => clearTimeout(timer);
  }, [activeOrder]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Cart operations
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`✓ Se agregó ${product.name} al plato.`);
  };

  const handleDetailedAdd = (product: Product, quantity: number, notes: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.notes === notes);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.notes === notes
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, notes }];
    });
    showToast(`✓ Se agregaron ${quantity} ${product.name} al carro.`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Platillo removido de tu carro.');
  };

  const handleRedeemRewardPoints = (
    rewardName: string,
    pointsRequired: number,
    category: 'tacos' | 'sincronizadas' | 'burritos' | 'bebidas',
    price: number
  ) => {
    // Deduct points
    setProfile(prev => ({
      ...prev,
      loyaltyPoints: Math.max(0, prev.loyaltyPoints - pointsRequired)
    }));

    // Find a matching product in data to add, or mock standard free gift
    const matchingProd = products.find(p => p.category === category) || products[0];
    
    // Add custom gift item to cart for $0!
    const promoGiftProduct: Product = {
      ...matchingProd,
      id: `${matchingProd.id}_free_redeemed`,
      name: `${matchingProd.name} 🎁 (Regalo Club)`,
      price: 0,
      description: `Recompensa gratis canjeada con tus puntos de lealtad.`
    };

    setCart(prev => [...prev, { product: promoGiftProduct, quantity: 1, notes: `Canjeado: ${rewardName}` }]);
    showToast(`🎁 ¡Canjeado! El cupón "${rewardName}" se agregó gratis a tu carro.`);
    setScreen('cart');
  };

  // Complete Simulated Checkout placement
  const handlePlaceOrder = (address: string, paymentMethod: 'cash' | 'transfer', couponAppliedCode: string) => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const shippingFee = subtotal >= 250 ? 0 : 25;
    const appFee = 5;
    const discount = couponAppliedCode === 'TACOGRATIS' ? 25 : 0;
    const totalCost = subtotal + shippingFee + appFee - discount;
    const pointsToEarn = Math.floor(subtotal / 10);
    const orderId = Math.floor(1000 + Math.random() * 9000).toString();

    const placedOrder: Order = {
      id: orderId,
      items: [...cart],
      subtotal,
      shippingFee,
      appFee,
      discount,
      total: totalCost,
      paymentMethod,
      address,
      status: 'pending',
      createdAt: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
      pointsEarned: pointsToEarn,
      tacoGratisApplied: couponAppliedCode === 'TACOGRATIS'
    };

    // Update address in profile for subsequent orders
    setProfile(prev => ({ ...prev, address, paymentMethod }));

    // Wipe cart
    setCart([]);
    
    // Launch tracker
    setActiveOrder(placedOrder);
    setTrackerOpen(true);
    showToast('🎉 ¡Pedido colocado con Éxito!');
  };

  // Sandbox active order force advancement
  const handleAdvanceOrderStatusExplicitly = () => {
    if (!activeOrder) return;
    let nextStatus: 'pending' | 'preparing' | 'on_way' | 'delivered' = 'preparing';
    if (activeOrder.status === 'pending') nextStatus = 'preparing';
    else if (activeOrder.status === 'preparing') nextStatus = 'on_way';
    else if (activeOrder.status === 'on_way') {
      nextStatus = 'delivered';
      // Add points on manual delivery
      setProfile(prev => {
        const totalPoints = prev.loyaltyPoints + activeOrder.pointsEarned;
        let newLevel = 1;
        let newLevelName = 'Novato';
        if (totalPoints >= 8000) {
          newLevel = 5;
          newLevelName = 'Leyenda A&L';
        } else if (totalPoints >= 5000) {
          newLevel = 4;
          newLevelName = 'Inseparable';
        } else if (totalPoints >= 2000) {
          newLevel = 3;
          newLevelName = 'Asiduo';
        } else if (totalPoints >= 500) {
          newLevel = 2;
          newLevelName = 'Regular';
        }

        return {
          ...prev,
          loyaltyPoints: totalPoints,
          level: newLevel,
          levelName: newLevelName
        };
      });
      showToast(`🎉 ¡Entrega manual simulada exitosa! Puntos cargados.`);
    }

    setActiveOrder({ ...activeOrder, status: nextStatus });
  };

  // Search Filter products
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-lg mx-auto bg-brand-background min-h-screen shadow-2xl relative border-x border-orange-100/40 flex flex-col pb-16">
      
      {/* Top corporate branding header banner */}
      {screen !== 'cart' && screen !== 'profile' && (
        <Header
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          onCartClick={() => setScreen('cart')}
          onProfileClick={() => setScreen('profile')}
          currentScreen={screen}
        />
      )}

      {/* Primary Contents layout screen switcher */}
      <div className="flex-grow flex flex-col">
        {screen === 'menu' && (
          <div className="flex-grow flex flex-col">
            {/* Promo Banner */}
            <PromoBanner onApplyCode={() => setScreen('cart')} />

            {/* Sticky Search bar row */}
            <div className="px-4 pb-2">
              <div className="relative bg-white border border-orange-100 p-2.5 rounded-2xl flex items-center shadow-xs">
                <Search className="w-4 h-4 text-on-surface-variant/70 shrink-0 ml-1" />
                <input
                  type="text"
                  placeholder="Busca por tacos, burritos, aguas fresas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-xs outline-none bg-transparent ml-2 placeholder:text-on-surface-variant/40 text-charcoal-coffee font-medium"
                />
              </div>
            </div>

            {/* Category Carousel filter */}
            <CategoryCarousel
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Main grid stream layout */}
            <main className="p-4 pt-1 flex-grow">
              <div className="flex justify-between items-baseline mb-3 px-1">
                <h3 className="font-display font-extrabold text-base text-charcoal-coffee">
                  {selectedCategory === 'all' ? 'Más Populares' : `Selección De ${selectedCategory}`}
                </h3>
                <span className="text-[10px] text-on-surface-variant/80 font-bold uppercase tracking-wider">
                  {filteredProducts.length} listados
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 opacity-60 space-y-2">
                  <span className="text-4xl block">🔍</span>
                  <p className="text-xs font-bold text-charcoal-coffee">No se encontraron productos coincidentes.</p>
                  <p className="text-[10px] text-on-surface-variant">Prueba escribiendo otra palabra como bistec, pastor u horchata.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 pb-8">
                  {filteredProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onAddToCart={handleAddToCart}
                      onCardClick={setSelectedProduct}
                    />
                  ))}
                </div>
              )}
            </main>
          </div>
        )}

        {screen === 'cart' && (
          <CartScreen
            cartItems={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onPlaceOrder={handlePlaceOrder}
            user={profile}
            onGoBack={() => setScreen('menu')}
          />
        )}

        {screen === 'profile' && (
          <ProfileScreen
            user={profile}
            onUpdateUser={(fields) => setProfile(prev => ({ ...prev, ...fields }))}
            onRedeemReward={handleRedeemRewardPoints}
            onLogout={() => {
              alert('Cierre de sesión simulado. El perfil conservará sus puntos locales para continuar interactuando.');
              setScreen('menu');
            }}
            onGoBack={() => setScreen('menu')}
          />
        )}
      </div>

      {/* Sticky Top-over tracking banner if activeOrder has been placed */}
      {activeOrder && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-16 left-1/2 -translate-x-1/2 max-w-md w-[92%] bg-cilantro-green text-white p-3.5 rounded-2xl shadow-xl z-40 border border-green-500/30 flex justify-between items-center cursor-pointer"
          onClick={() => setTrackerOpen(true)}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-bounce">
              {activeOrder.status === 'pending' ? '⏳' : activeOrder.status === 'preparing' ? '🌮' : activeOrder.status === 'on_way' ? '🏍️' : '🎉'}
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#fce8a1] leading-none">Pedir en curso: #{activeOrder.id}</p>
              <h4 className="font-display font-black text-xs leading-none mt-1">
                {activeOrder.status === 'pending' && 'Confirmando pedido...'}
                {activeOrder.status === 'preparing' && 'Tacos en el asador...'}
                {activeOrder.status === 'on_way' && 'Repartidor acelerando...'}
                {activeOrder.status === 'delivered' && '¡Tacos entregados! ¡Buen provecho!'}
              </h4>
            </div>
          </div>
          <span className="text-[10px] font-black uppercase bg-white/20 p-1 px-2.5 rounded-lg border border-white/10 text-white animate-pulse">
            Sigueme
          </span>
        </motion.div>
      )}

      {/* Shared bottom navigation bar for seamless single screen transition */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white/90 backdrop-blur-md border-t border-orange-100/60 flex justify-around items-center py-2.5 z-40 shadow-md">
        <button
          onClick={() => setScreen('menu')}
          className={`flex flex-col items-center gap-0.5 justify-center flex-grow transition-colors py-1 cursor-pointer ${
            screen === 'menu' ? 'text-deep-orange' : 'text-on-surface-variant/70 hover:text-deep-orange/60'
          }`}
        >
          <Utensils className="w-5 h-5 stroke-[2.5]" />
          <span className="text-[9px] font-black uppercase tracking-tight">Menú</span>
        </button>

        <button
          onClick={() => setScreen('cart')}
          className={`flex flex-col items-center gap-0.5 justify-center flex-grow transition-colors py-1 relative cursor-pointer ${
            screen === 'cart' ? 'text-deep-orange' : 'text-on-surface-variant/70 hover:text-deep-orange/60'
          }`}
        >
          <ShoppingCart className="w-5 h-5 stroke-[2.5]" />
          <span className="text-[9px] font-black uppercase tracking-tight">Carrito</span>
          {cart.length > 0 && (
            <span className="absolute top-0.5 right-6 bg-deep-orange text-white text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>

        <button
          onClick={() => setScreen('profile')}
          className={`flex flex-col items-center gap-0.5 justify-center flex-grow transition-colors py-1 cursor-pointer ${
            screen === 'profile' ? 'text-deep-orange' : 'text-on-surface-variant/70 hover:text-deep-orange/60'
          }`}
        >
          <User className="w-5 h-5 stroke-[2.5]" />
          <span className="text-[9px] font-black uppercase tracking-tight">Mi Perfil</span>
          <span className="absolute top-1 right-12 w-1.5 h-1.5 bg-deep-orange rounded-full" />
        </button>
      </nav>

      {/* Floating global dynamic Toast banner notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-charcoal-coffee/95 backdrop-blur-md text-white px-5 py-3 rounded-full text-xs font-bold text-center soft-shadow z-50 whitespace-nowrap border border-white/10"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Detailed Product customization Modal Drawer */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleDetailedAdd}
      />

      {/* Realtime Status Order progress Tracker overlay */}
      <AnimatePresence>
        {trackerOpen && (
          <ActiveOrderTracker
            order={activeOrder}
            onClose={() => setTrackerOpen(false)}
            onAdvanceStatus={handleAdvanceOrderStatusExplicitly}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
