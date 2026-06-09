import React, { useState } from 'react';
import { ArrowLeft, User, Phone, Mail, MapPin, Award, Landmark, CreditCard, LogOut, Check, Sparkles, Coins } from 'lucide-react';
import { UserProfile, Product } from '../types';
import { LOYALTY_LEVELS, REWARDS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileScreenProps {
  user: UserProfile;
  onUpdateUser: (updatedFields: Partial<UserProfile>) => void;
  onRedeemReward: (rewardName: string, pointsDoc: number, productCategory: 'tacos' | 'sincronizadas' | 'burritos' | 'bebidas', price: number) => void;
  onLogout: () => void;
  onGoBack: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onUpdateUser,
  onRedeemReward,
  onLogout,
  onGoBack,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);
  const [phoneInput, setPhoneInput] = useState(user.phone);
  const [emailInput, setEmailInput] = useState(user.email);
  const [err, setErr] = useState('');

  // Find user current level specs
  const curLevelSpecs = LOYALTY_LEVELS.find(l => user.loyaltyPoints >= l.min && user.loyaltyPoints <= l.max) || LOYALTY_LEVELS[0];
  const nextLevelSpecs = LOYALTY_LEVELS[curLevelSpecs.level] || null;

  // Progress metrics toward next level
  let levelPercentage = 100;
  let pointsNeeded = 0;
  if (nextLevelSpecs) {
    const range = nextLevelSpecs.min - curLevelSpecs.min;
    const progress = user.loyaltyPoints - curLevelSpecs.min;
    levelPercentage = Math.min(100, Math.max(0, (progress / range) * 100));
    pointsNeeded = nextLevelSpecs.min - user.loyaltyPoints;
  }

  const handleSaveChanges = () => {
    if (!nameInput.trim()) {
      setErr('El nombre es requerido.');
      return;
    }
    if (phoneInput.trim().length < 10) {
      setErr('El teléfono debe tener un formato de al menos 10 dígitos.');
      return;
    }
    onUpdateUser({
      name: nameInput.trim(),
      phone: phoneInput.trim(),
      email: emailInput.trim(),
    });
    setIsEditing(false);
    setErr('');
  };

  const executeRedemption = (rewardId: string, reqPoints: number, rewardLabel: string) => {
    if (user.loyaltyPoints < reqPoints) {
      alert(`Te faltan ${reqPoints - user.loyaltyPoints} puntos para canjear esta recompensa.`);
      return;
    }

    // Determine category based on reward
    let category: 'tacos' | 'sincronizadas' | 'burritos' | 'bebidas' = 'tacos';
    let basePrice = 0;
    if (rewardId === 'rew_taco') {
      category = 'tacos';
      basePrice = 90; // pastor/bistec
    } else if (rewardId === 'rew_sincro') {
      category = 'sincronizadas';
      basePrice = 70;
    } else if (rewardId === 'rew_burrito') {
      category = 'burritos';
      basePrice = 110;
    } else if (rewardId === 'rew_bebida') {
      category = 'bebidas';
      basePrice = 35;
    }

    onRedeemReward(rewardLabel, reqPoints, category, basePrice);
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
        <h2 className="font-display font-black text-xl text-charcoal-coffee">Mi Perfil</h2>
      </div>

      {/* Screen contents body */}
      <div className="flex-grow p-4 overflow-y-auto no-scrollbar space-y-5 pb-20 max-w-lg mx-auto w-full">
        
        {/* User Card */}
        <div className="bg-white rounded-2xl p-4 border border-orange-100/50 soft-shadow flex items-center gap-4 relative">
          <div className="w-14 h-14 bg-deep-orange/15 text-deep-orange rounded-2xl flex items-center justify-center font-bold text-3xl shrink-0">
            👤
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="font-sans font-black text-base text-charcoal-coffee leading-tight truncate">
              {user.name}
            </h3>
            <p className="text-xs text-on-surface-variant/80 mt-0.5 truncate flex items-center gap-1 leading-none">
              <Mail className="w-3.5 h-3.5" /> {user.email}
            </p>
            <p className="text-xs text-deep-orange font-bold mt-1.5 flex items-center gap-1 leading-none">
              <Phone className="w-3.5 h-3.5" /> {user.phone}
            </p>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-3 right-3 text-[11px] font-black text-deep-orange hover:bg-orange-50/60 p-1.5 px-3 rounded-lg border border-orange-100/50 transition-colors cursor-pointer"
          >
            {isEditing ? 'Cancelar' : 'Editar'}
          </button>
        </div>

        {/* Editing Expandable Form */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white rounded-2xl p-4 border border-orange-100/50 soft-shadow overflow-hidden"
            >
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">Actualizar datos de mi Perfil</h4>
              <div className="space-y-3 text-xs">
                {err && <p className="text-salsa-red font-bold text-[11px]">{err}</p>}
                <div>
                  <label className="block text-on-surface-variant/80 font-bold mb-1">Nombre completo:</label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-orange-50/15 border border-orange-100 focus:outline-none focus:ring-1.5 focus:ring-deep-orange transition-all"
                  />
                </div>
                <div>
                  <label className="block text-on-surface-variant/80 font-bold mb-1">Teléfono:</label>
                  <input
                    type="text"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-orange-50/15 border border-orange-100 focus:outline-none focus:ring-1.5 focus:ring-deep-orange transition-all"
                  />
                </div>
                <div>
                  <label className="block text-on-surface-variant/80 font-bold mb-1">Correo electrónico:</label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-orange-50/15 border border-orange-100 focus:outline-none focus:ring-1.5 focus:ring-deep-orange transition-all"
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSaveChanges}
                  className="w-full bg-deep-orange hover:bg-orange-600 text-white font-display font-black text-xs uppercase py-2.5 rounded-xl text-center shadow-xs cursor-pointer mt-2"
                >
                  Guardar modificaciones
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loyalty Progression Visual Card */}
        <div className="bg-gradient-to-br from-deep-orange to-brand-primary p-5 rounded-2xl text-white shadow-lg shadow-orange-100/40 relative overflow-hidden">
          {/* Back glows */}
          <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

          <div className="flex justify-between items-start mb-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#fce8a1]">Mis Puntos Acumulados</p>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="font-display font-extrabold text-5xl leading-none">{user.loyaltyPoints}</span>
                <span className="text-xs font-bold text-[#fce8a1]">pts</span>
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-md p-2.5 px-4 rounded-xl text-center border border-white/10">
              <span className="text-sm block leading-none">{curLevelSpecs.emoji}</span>
              <p className="font-display font-extrabold text-xs mt-1 leading-none tracking-wide text-[#fce8a1]">Nivel {user.level}</p>
              <p className="text-[10px] font-black uppercase text-white/95 mt-0.5 tracking-tight leading-none">
                {curLevelSpecs.name}
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-white/90">Progreso de bronce</span>
              <span className="text-[#fce8a1]">X {curLevelSpecs.bonusRate} Multiplicador</span>
            </div>
            <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-800"
                style={{ width: `${levelPercentage}%` }}
              />
            </div>
            
            {nextLevelSpecs ? (
              <p className="text-[10px] font-bold text-[#fce8a1] text-center uppercase tracking-wider">
                Te faltan {pointsNeeded} pts para el nivel {nextLevelSpecs.level} ({nextLevelSpecs.name} {nextLevelSpecs.emoji})
              </p>
            ) : (
              <p className="text-[10px] font-bold text-[#fce8a1] text-center uppercase tracking-wider flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5 fill-[#fce8a1]" /> Nivel Leyenda Máximo Alcanzado 🏆
              </p>
            )}
          </div>
        </div>

        {/* Address and Location Card */}
        <div className="bg-white rounded-2xl p-4 border border-orange-100/50 soft-shadow space-y-3">
          <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-4 h-4 text-deep-orange" />
            <span>Ubicación frecuente de envío</span>
          </h3>
          <textarea
            value={user.address}
            onChange={(e) => onUpdateUser({ address: e.target.value })}
            placeholder="Escribe tu calle, número oficial, colonia y referencias..."
            rows={2}
            className="w-full text-xs p-3 rounded-xl bg-orange-50/15 border border-orange-100 focus:outline-none focus:ring-1.5 focus:ring-deep-orange transition-all text-charcoal-coffee placeholder:text-on-surface-variant/40"
          />
          <button
            onClick={() => alert(`✓ Dirección guardada con éxito: "${user.address}"`)}
            className="w-full bg-orange-50 text-deep-orange hover:bg-orange-100/80 font-sans font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
          >
            Guardar Dirección predeterminada
          </button>
        </div>

        {/* Claim Rewards Dynamic section */}
        <div className="bg-white rounded-2xl p-4 border border-orange-100/50 soft-shadow space-y-3">
          <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
            <Coins className="w-4 h-4 text-deep-orange" />
            <span>Recompensas del Club A&L</span>
          </h3>
          
          <div className="space-y-2.5">
            {REWARDS.map((rew) => {
              const remainsPoints = rew.pointsRequired - user.loyaltyPoints;
              const canRedeem = remainsPoints <= 0;

              return (
                <div
                  key={rew.id}
                  className={`p-3 rounded-xl border flex justify-between items-center transition-all ${
                    canRedeem
                      ? 'bg-neutral-50/80 border-orange-100/80'
                      : 'bg-neutral-50/40 border-orange-50/40 opacity-75'
                  }`}
                >
                  <div className="space-y-1 pr-1.5">
                    <div className="flex items-center gap-1">
                      <span className="font-sans font-bold text-xs text-charcoal-coffee leading-none">
                        {rew.name}
                      </span>
                    </div>
                    <p className="text-[10px] text-on-surface-variant/80 leading-relaxed">
                      {rew.desc}
                    </p>
                    <span className="text-[10px] font-black text-deep-orange bg-deep-orange/10 px-2 py-0.5 rounded-lg inline-block mt-1 leading-none">
                      Rebaja: {rew.pointsRequired} pts
                    </span>
                  </div>

                  <div className="shrink-0 ml-1.5">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => executeRedemption(rew.id, rew.pointsRequired, rew.name)}
                      className={`font-display font-black text-[10px] tracking-wider uppercase p-2 px-3.5 rounded-xl transition-all cursor-pointer ${
                        canRedeem
                          ? 'bg-cilantro-green hover:bg-green-700 text-white shadow-xs'
                          : 'bg-orange-100 text-on-surface-variant/40 hover:bg-orange-200/50'
                      }`}
                    >
                      Canjear
                    </motion.button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="bg-orange-50/50 border border-orange-100/50 rounded-xl p-2 px-3 text-center">
            <p className="text-[10px] text-brand-primary leading-none">
              💡 <strong>¿Cómo funciona?</strong> Reclamar una recompensa descontará los puntos correspondientes y colocará un platillo gratuito ($0) en tu carrito de compra de inmediato.
            </p>
          </div>
        </div>

        {/* Logout session CTA */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onLogout}
          className="w-full text-center hover:bg-red-50 text-salsa-red font-display font-extrabold text-xs uppercase py-3 rounded-xl border border-red-100 transition-all cursor-pointer"
        >
          Cerrar Sesión de Cliente
        </motion.button>

        {/* Footer info label */}
        <p className="text-[9px] text-on-surface-variant/50 text-center font-bold tracking-wider leading-none uppercase">
          A&L PWA • Desarrollado en Cloud Native Space • 2026
        </p>

      </div>
    </div>
  );
};
