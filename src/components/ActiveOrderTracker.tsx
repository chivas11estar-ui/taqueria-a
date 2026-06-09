import React from 'react';
import { Clock, MapPin, Receipt, CheckCircle, ChefHat, Sparkles, Truck } from 'lucide-react';
import { Order } from '../types';
import { motion } from 'motion/react';

interface ActiveOrderTrackerProps {
  order: Order | null;
  onClose: () => void;
  onAdvanceStatus?: () => void;
}

export const ActiveOrderTracker: React.FC<ActiveOrderTrackerProps> = ({
  order,
  onClose,
  onAdvanceStatus,
}) => {
  if (!order) return null;

  const statuses = [
    { key: 'pending', label: 'Esperando Confirmación', desc: 'A&L Taquería está confirmando y registrando tu orden en el asador...', icon: Clock, color: 'text-amber-500 bg-amber-50' },
    { key: 'preparing', label: 'Tacos en Preparación', desc: '¡Carne al carbón! Cortando bife, calentando cebollitas y doblando tortillas al asador...', icon: ChefHat, color: 'text-orange-500 bg-orange-50' },
    { key: 'on_way', label: 'Repartidor en Camino', desc: 'El repartidor está acelerando su motocicleta con tu comida caliente en la mochila térmica.', icon: ChefHat, color: 'text-blue-500 bg-blue-50' }, // using ChefHat since motor is custom or we use simple ChefHat
    { key: 'delivered', label: 'Entregado • Buen Provecho', desc: '¡Tus tacos calientes han llegado! Esperamos que disfrutes de tu banquete.', icon: CheckCircle, color: 'text-cilantro-green bg-green-50' },
  ];

  const currentIndex = statuses.findIndex(s => s.key === order.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative border border-orange-100 flex flex-col max-h-[90vh]"
      >
        {/* Tracker Header banner */}
        <div className="bg-gradient-to-r from-deep-orange to-brand-primary p-4 text-white">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#fce8a1]">Sigue tu comida en tiempo real</span>
              <h2 className="font-display font-black text-lg">Estado de tu Orden</h2>
            </div>
            <span className="bg-white/20 p-1.5 px-3 rounded-lg text-xs font-black uppercase font-mono tracking-tight text-[#fce8a1]">
              #{order.id}
            </span>
          </div>
        </div>

        {/* Content body scroll */}
        <div className="p-5 overflow-y-auto no-scrollbar space-y-5 flex-grow">
          {/* Main Visual Indicator Card */}
          <div className="p-4 rounded-xl bg-orange-50/20 border border-orange-100 flex gap-3.5 items-start">
            <span className="text-3xl animate-bounce shrink-0 mt-0.5">
              {order.status === 'pending' && '⏳'}
              {order.status === 'preparing' && '🌮'}
              {order.status === 'on_way' && '🏍️'}
              {order.status === 'delivered' && '🎉'}
            </span>
            <div className="flex-grow">
              <h3 className="font-sans font-black text-sm text-charcoal-coffee leading-tight">
                {statuses[currentIndex]?.label}
              </h3>
              <p className="text-xs text-on-surface-variant/90 leading-relaxed mt-1">
                {statuses[currentIndex]?.desc}
              </p>
            </div>
          </div>

          {/* Timeline steps */}
          <div className="space-y-4 relative pl-3.5 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-orange-100">
            {statuses.map((step, idx) => {
              const isPast = idx < currentIndex;
              const isCurrent = idx === currentIndex;
              const isFuture = idx > currentIndex;

              return (
                <div key={step.key} className="relative flex gap-4 items-start">
                  {/* Dot mark */}
                  <div
                    className={`absolute -left-[14.5px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                      isPast
                        ? 'bg-cilantro-green border-cilantro-green'
                        : isCurrent
                        ? 'bg-deep-orange border-deep-orange animate-ping'
                        : 'bg-white border-orange-200'
                    }`}
                  />
                  {/* Static center dot if pinging */}
                  {isCurrent && (
                    <div className="absolute -left-[14.5px] top-1.5 w-4 h-4 rounded-full border-2 bg-deep-orange border-deep-orange" />
                  )}

                  <div className="flex-grow min-w-0 pl-3">
                    <h4
                      className={`font-sans font-extrabold text-xs transition-colors ${
                        isPast
                          ? 'text-cilantro-green'
                          : isCurrent
                          ? 'text-deep-orange font-black'
                          : 'text-on-surface-variant/50'
                      }`}
                    >
                      {step.label}
                    </h4>
                    {isCurrent && (
                      <p className="text-[11px] text-on-surface-variant/80 mt-0.5 leading-relaxed">
                        Actualizado hace un instante
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Checkout Receipts Details */}
          <div className="bg-neutral-50 p-4 rounded-xl border border-orange-50 space-y-2 text-xs">
            <h4 className="font-bold text-on-surface-variant flex items-center gap-1 opacity-90 uppercase text-[10px] tracking-wider mb-2 leading-none">
              <Receipt className="w-4 h-4 text-deep-orange" />
              Detalle del ticket
            </h4>
            
            <div className="space-y-1 text-on-surface-variant/90 font-medium">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex justify-between items-baseline">
                  <span className="truncate pr-3">
                    {it.quantity}x {it.product.name}
                  </span>
                  <span className="shrink-0 font-mono text-charcoal-coffee">${it.product.price * it.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-orange-100/40 space-y-1.5 font-bold">
              <div className="flex justify-between text-on-surface-variant/80 text-[11px]">
                <span>Costo comestibles</span>
                <span>${order.subtotal} MXN</span>
              </div>
              <div className="flex justify-between text-on-surface-variant/80 text-[11px]">
                <span>Costo envío</span>
                <span>{order.shippingFee === 0 ? 'Gratis' : `$${order.shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant/80 text-[11px]">
                <span>Tarifa fija app</span>
                <span>${order.appFee} MXN</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-cilantro-green text-[11px]">
                  <span>Descuento cupón TACOGRATIS</span>
                  <span>-${order.discount} MXN</span>
                </div>
              )}
              <div className="flex justify-between text-[#1F1A17] font-black text-xs pt-1.5 border-t border-orange-100/30">
                <span>Total cancelado:</span>
                <span className="text-deep-orange font-black">${order.total} MXN</span>
              </div>
              
              {/* Payment selected */}
              <div className="text-[10px] font-bold text-brand-primary text-center italic bg-orange-50/40 p-2 rounded-lg mt-2 font-sans border border-orange-100/30">
                Forma de pago: {order.paymentMethod === 'cash' ? '💵 Efectivo contra entrega' : '🏦 Transferencia bancaria (BBVA)'}
              </div>
            </div>
          </div>

          {/* Test Sandbox Multiplier */}
          {onAdvanceStatus && order.status !== 'delivered' && (
            <div className="bg-orange-50/40 p-2.5 rounded-xl border border-dashed border-deep-orange/30 text-center space-y-1">
              <p className="text-[10px] text-brand-primary font-bold">
                🛠️ <strong>Simulación Activa (Sandbox):</strong>
              </p>
              <button
                onClick={onAdvanceStatus}
                className="bg-deep-orange/15 text-deep-orange border border-deep-orange/30 font-sans font-bold text-[10px] tracking-wide uppercase p-1.5 px-4 rounded-lg hover:bg-deep-orange hover:text-white transition-all cursor-pointer inline-block"
              >
                Avanzar estado del pedido
              </button>
            </div>
          )}

          {/* Congrats banner if complete and points earned */}
          {order.status === 'delivered' && (
            <div className="bg-cilantro-green/15 border border-cilantro-green/20 rounded-xl p-3 text-center space-y-1">
              <h4 className="text-xs font-bold text-cilantro-green flex items-center justify-center gap-1 shrink-0">
                <Sparkles className="w-4 h-4 fill-cilantro-green" />
                ¡Puntos agregados a tu cuenta!
              </h4>
              <p className="text-[11px] text-[#201b18] font-bold">
                Has ganado <span className="text-xl text-cilantro-green font-black">+{order.pointsEarned} pts</span> para tu próxima recompensa gratuita.
              </p>
            </div>
          )}

        </div>

        {/* Action Bottom */}
        <div className="p-3 bg-neutral-50 border-t border-orange-50 text-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="w-full bg-charcoal-coffee text-white font-display font-black text-xs uppercase py-3 rounded-lg text-center cursor-pointer"
          >
            Cerrar Tracker
          </motion.button>
        </div>

      </motion.div>
    </div>
  );
};
