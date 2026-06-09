import React, { useState } from 'react';
import { ArrowLeft, Trash2, Plus, Minus, Tag, Check, Truck, CreditCard, Landmark, Coins } from 'lucide-react';
import { CartItem, UserProfile } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartScreenProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onPlaceOrder: (address: string, paymentMethod: 'cash' | 'transfer', code: string) => void;
  user: UserProfile;
  onGoBack: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
  user,
  onGoBack,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMsg, setCouponMsg] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState(user.address || '');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'transfer'>(user.paymentMethod || 'cash');

  // Calculated totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, 250 - subtotal);
  const isFreeShipping = subtotal >= 250;
  const shippingFee = isFreeShipping ? 0 : 25;
  const appFee = subtotal > 0 ? 5 : 0;
  
  // Custom coupon calculations
  const couponDiscount = couponApplied && subtotal >= 250 ? 25 : 0;
  const total = Math.max(0, subtotal + shippingFee + appFee - couponDiscount);
  
  // Points (1 point for every $10 mxn)
  const pointsToEarn = Math.floor(subtotal / 10);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase().trim() === 'TACOGRATIS') {
      if (subtotal >= 250) {
        setCouponApplied(true);
        setCouponMsg('¡Cupón aplicado con éxito! Envío gratis y $25 de cortesía.');
      } else {
        setCouponMsg('El cupón TACOGRATIS requiere un subtotal mínimo de $250.');
      }
    } else {
      setCouponMsg('Código de cupón inválido. Intenta con "TACOGRATIS".');
    }
  };

  const handleApplyQuickCode = () => {
    setCouponCode('TACOGRATIS');
    if (subtotal >= 250) {
      setCouponApplied(true);
      setCouponMsg('¡Cupón aplicado con éxito! Envío gratis y $25 de cortesía.');
    } else {
      setCouponMsg('Cupón rellenado. Completa $250 para activarlo.');
    }
  };

  const executeCheckout = () => {
    if (cartItems.length === 0) return;
    if (!deliveryAddress.trim() || deliveryAddress.trim().length < 12) {
      alert('Por favor ingresa una dirección de entrega válida con calle, número y referencias (mínimo 12 caracteres).');
      return;
    }
    onPlaceOrder(deliveryAddress, paymentMethod, couponApplied ? 'TACOGRATIS' : '');
  };

  return (
    <div className="flex flex-col flex-grow bg-brand-background">
      {/* Small Inline Header */}
      <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-orange-100">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onGoBack}
          className="p-1.5 hover:bg-orange-50 rounded-full text-on-surface-variant cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
        <h2 className="font-display font-black text-xl text-charcoal-coffee">Mi Pedido</h2>
      </div>

      {/* Cart Container Sheet */}
      <div className="flex-grow p-4 overflow-y-auto no-scrollbar space-y-4 pb-20 max-w-lg mx-auto w-full">
        {cartItems.length === 0 ? (
          <div className="text-center py-16 space-y-4 bg-white rounded-2xl p-6 border border-orange-100/60 soft-shadow">
            <span className="text-5xl block animate-bounce">🌮</span>
            <h3 className="font-display font-extrabold text-base text-charcoal-coffee">¡Tu plato está vacío!</h3>
            <p className="text-xs text-on-surface-variant/80 max-w-xs mx-auto leading-relaxed">
              Explora nuestra selección artesanal de tacos de bistec, burritos clásicos y aguas frescas preparadas al momento.
            </p>
            <button
              onClick={onGoBack}
              className="mt-2 bg-deep-orange hover:bg-orange-600 font-display font-black text-xs text-white uppercase py-2.5 px-6 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              Ver Menú
            </button>
          </div>
        ) : (
          <>
            {/* List of items */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider px-1">Productos seleccionados</h3>
              <div className="space-y-2.5">
                {cartItems.map((item) => (
                  <motion.div
                    layout
                    key={item.product.id}
                    className="flex gap-3 bg-white p-3 rounded-2xl border border-orange-100/50 soft-shadow items-center"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-brand-cream-light shrink-0">
                      <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <h4 className="font-sans font-bold text-sm text-charcoal-coffee truncate leading-none">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-deep-orange font-extrabold mt-1">
                        ${item.product.price} <span className="text-[9px] font-sans text-on-surface-variant/80 font-normal">c/u</span>
                      </p>
                      {item.notes && (
                        <p className="text-[10px] text-brand-primary font-medium mt-1 leading-none italic bg-orange-50/50 p-1 px-2 rounded inline-block truncate max-w-full">
                          ✏️ "{item.notes}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 bg-orange-50 px-2 py-1 rounded-xl border border-orange-100/30 shrink-0">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded-lg shadow-sm font-black text-deep-orange"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </motion.button>
                      <span className="font-display font-extrabold text-xs text-deep-orange w-4 text-center">
                        {item.quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded-lg shadow-sm font-black text-deep-orange"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1.5 hover:bg-red-50 text-salsa-red rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Free Shipping Progress */}
            <div className="bg-white rounded-2xl p-4 border border-orange-100/60 soft-shadow space-y-3">
              <div className="flex items-center gap-2 text-deep-orange">
                <Truck className="w-5 h-5 animate-bounce" />
                <h4 className="text-xs font-black uppercase tracking-wider">Metros de envío gratis</h4>
              </div>
              {remainingForFreeShipping > 0 ? (
                <div className="space-y-1.5">
                  <p className="text-[11px] text-on-surface-variant font-medium">
                    Agrega <span className="font-bold text-deep-orange">${remainingForFreeShipping} MXN</span> más para tener <span className="font-bold text-cilantro-green">Envío gratis</span>.
                  </p>
                  <div className="w-full bg-orange-50 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-deep-orange h-full rounded-full transition-all duration-500"
                      style={{ width: `${(subtotal / 250) * 100}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-cilantro-green/10 border border-cilantro-green/20 rounded-xl p-2 px-3 text-center">
                  <p className="text-xs font-bold text-cilantro-green">
                    🎉 ¡Felicidades! Tu orden califica para Envío GRATIS hoy.
                  </p>
                </div>
              )}
            </div>

            {/* Coupon Code Input */}
            <div className="bg-white rounded-xl p-4 border border-orange-100/50 soft-shadow space-y-2.5">
              <div className="flex items-center gap-1.5 text-on-surface-variant font-sans font-bold text-xs uppercase tracking-wider">
                <Tag className="w-4 h-4 text-deep-orange" />
                <span>Cupón de descuento</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Escribe TACOGRATIS"
                  className="flex-grow text-xs px-3.5 py-2.5 rounded-xl bg-orange-50/15 border border-orange-100 uppercase focus:outline-none focus:ring-1.5 focus:ring-deep-orange transition-all placeholder:normal-case"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-deep-orange hover:bg-orange-600 text-white font-display font-black text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Aplicar
                </button>
              </div>
              {couponMsg && (
                <p className={`text-[11px] font-bold mt-1.5 leading-none ${couponApplied ? 'text-cilantro-green' : 'text-salsa-red'}`}>
                  {couponApplied ? '✓ ' : '✗ '} {couponMsg}
                </p>
              )}
              {!couponApplied && (
                <button
                  onClick={handleApplyQuickCode}
                  className="text-[10px] text-deep-orange font-bold hover:underline inline-block flex items-center gap-0.5"
                >
                  ✨ Rellenar con código gratis: <strong>TACOGRATIS</strong>
                </button>
              )}
            </div>

            {/* Delivery address */}
            <div className="bg-white rounded-xl p-4 border border-orange-100/50 soft-shadow space-y-3">
              <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">📍 Datos de entrega</h3>
              <div className="space-y-1.5">
                <label className="text-[11px] text-on-surface-variant/80 font-bold">Dirección para enviar:</label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Ap. 402, Calle del Taco Rojo 125, Col. Centro, Refs: portón marrón..."
                  rows={2}
                  className="w-full text-xs p-3 rounded-xl bg-orange-50/15 border border-orange-100 focus:outline-none focus:ring-1.5 focus:ring-deep-orange transition-all placeholder:text-on-surface-variant/40"
                />
                <p className="text-[9px] text-on-surface-variant/70 leading-none">
                  💡 Mínimo 12 caracteres. Necesitamos calle, número y referencias claras.
                </p>
              </div>
            </div>

            {/* Payment options */}
            <div className="bg-white rounded-xl p-4 border border-orange-100/50 soft-shadow space-y-3">
              <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">💳 Forma de pago</h3>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer ${
                    paymentMethod === 'cash'
                      ? 'border-deep-orange bg-deep-orange/5 text-deep-orange'
                      : 'border-orange-100 bg-white text-on-surface-variant hover:border-orange-200'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mb-1.5" />
                  <span className="text-xs font-bold">Efectivo al recibir</span>
                  <span className="text-[9px] text-on-surface-variant/70 mt-0.5">Paga al repartidor</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('transfer')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer ${
                    paymentMethod === 'transfer'
                      ? 'border-deep-orange bg-deep-orange/5 text-deep-orange'
                      : 'border-orange-100 bg-white text-on-surface-variant hover:border-orange-200'
                  }`}
                >
                  <Landmark className="w-5 h-5 mb-1.5" />
                  <span className="text-xs font-bold">Transferencia</span>
                  <span className="text-[9px] text-on-surface-variant/70 mt-0.5">BBVA CLABE Co.</span>
                </button>
              </div>
            </div>

            {/* Price Calculations breakdown */}
            <div className="bg-white rounded-xl p-4 border border-orange-100/50 soft-shadow space-y-2 text-xs font-medium">
              <div className="flex justify-between text-on-surface-variant/80">
                <span>Subtotal comestibles</span>
                <span className="text-charcoal-coffee font-bold">${subtotal} MXN</span>
              </div>
              <div className="flex justify-between text-on-surface-variant/80">
                <span>Costo de envío</span>
                {shippingFee === 0 ? (
                  <span className="text-cilantro-green font-bold uppercase tracking-wide">Gratis</span>
                ) : (
                  <span className="text-charcoal-coffee font-bold">${shippingFee} MXN</span>
                )}
              </div>
              <div className="flex justify-between text-on-surface-variant/80">
                <span>Tarifa fija app de entrega</span>
                <span className="text-charcoal-coffee font-bold">${appFee} MXN</span>
              </div>
              {couponApplied && couponDiscount > 0 && (
                <div className="flex justify-between text-cilantro-green font-bold">
                  <span>Descuento cupón TACOGRATIS</span>
                  <span>-${couponDiscount} MXN</span>
                </div>
              )}

              <div className="flex justify-between text-deep-orange font-bold text-xs pt-1.5 border-t border-orange-50">
                <span className="flex items-center gap-0.5">
                  <Coins className="w-3.5 h-3.5 fill-deep-orange/20" />
                  Puntos a acumular
                </span>
                <span>+{pointsToEarn} pts</span>
              </div>

              <div className="flex justify-between text-sm text-charcoal-coffee font-black pt-3 border-t-2 border-orange-100/60 mt-1">
                <span>Total de tu órden</span>
                <span className="text-xl text-deep-orange font-extrabold">${total} MXN</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={executeCheckout}
              className="w-full bg-cilantro-green hover:bg-green-700 text-white font-display font-black text-sm tracking-widest uppercase py-4 rounded-xl shadow-lg shadow-green-100/40 text-center transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Confirmar & Enviar Pedido • ${total} MXN
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
};
