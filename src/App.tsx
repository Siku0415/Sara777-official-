import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, ShieldCheck, Zap, Headphones, Share2, Star, BarChart3, Trophy, Clock, CheckCircle2, TrendingUp } from 'lucide-react';

declare global {
  interface Window {
    fbq: any;
  }
}

const SaraLogo = ({ size = "w-14 h-14" }: { size?: string }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className={`${size} bg-[#FBAE17] flex flex-col items-center justify-center relative rounded-xl shadow-md border-b-4 border-yellow-600/30 overflow-hidden shrink-0`}
  >
    <div className="w-[60%] h-0.5 bg-neutral-900 mb-0.5 rounded-full" />
    <div className="flex flex-col items-center">
      <span className="text-neutral-900 font-black tracking-tighter leading-none" style={{ fontSize: '100%' }}>Sara</span>
      <span className="text-neutral-900 font-black self-end -mr-1 -mt-0.5" style={{ fontSize: '60%' }}>777</span>
    </div>
  </motion.div>
);

export default function App() {
  const downloadLink = "https://sara777offical.com/sara777.apk";
  
  const handleDownload = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    
    // Pixel tracking
    if (window.fbq) {
      window.fbq('track', 'CompleteRegistration');
    }

    // CAPI tracking
    try {
      await fetch('/api/track-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: 'CompleteRegistration',
          userData: {},
          customData: {
            content_name: 'Sara777 APK Download',
            status: 'success'
          }
        })
      });
    } catch (err) {
      console.error('CAPI tracking failed', err);
    }

    window.open(downloadLink, '_blank');
  };

  const [showNotification, setShowNotification] = useState(false);
  const [lastWinner, setLastWinner] = useState({ name: "Rahul S.", amount: "₹5,400" });

  useEffect(() => {
    // Inject Meta Pixel Script
    const initPixel = () => {
      if (window.fbq) return;
      
      const n = (window as any).fbq = function() {
        (n as any).callMethod ? (n as any).callMethod.apply(n, arguments) : (n as any).queue.push(arguments);
      };
      if (!(window as any)._fbq) (window as any)._fbq = n;
      (n as any).push = n;
      (n as any).loaded = !0;
      (n as any).version = '2.0';
      (n as any).queue = [];
      const t = document.createElement('script');
      t.async = !0;
      t.src = 'https://connect.facebook.net/en_US/fbevents.js';
      const s = document.getElementsByTagName('script')[0];
      s.parentNode?.insertBefore(t, s);

      window.fbq('init', '26794598016845961');
      window.fbq('track', 'PageView');
    };

    initPixel();

    const winners = [
      { name: "Rahul S.", amount: "₹5,400" },
      { name: "Amit K.", amount: "₹12,200" },
      { name: "Suresh M.", amount: "₹2,100" },
      { name: "Priya V.", amount: "₹8,900" },
      { name: "Deepak R.", amount: "₹15,000" }
    ];
    
    const interval = setInterval(() => {
      const randomWinner = winners[Math.floor(Math.random() * winners.length)];
      setLastWinner(randomWinner);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#fffdf0] text-neutral-900 font-sans selection:bg-yellow-400 selection:text-black">
      {/* Real-time Winner Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-8 right-4 md:bottom-8 md:right-8 z-[100] bg-white border border-yellow-200 shadow-2xl rounded-2xl p-4 flex items-center gap-4 max-w-[280px]"
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0">
              <Trophy size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black text-neutral-400 tracking-wider leading-none mb-1">New Winner!</p>
              <p className="text-sm font-bold leading-tight">{lastWinner.name} just won {lastWinner.amount}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SaraLogo size="w-14 h-14" />
            <div className="flex flex-col">
              <span className="text-2xl font-black text-neutral-900 tracking-tighter leading-none italic uppercase">
                OFFICIAL
              </span>
              <span className="text-[10px] text-amber-600 font-bold tracking-[0.2em] uppercase">
                Satta Matka
              </span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-10 text-sm font-bold uppercase tracking-wider text-neutral-500">
            <a href="#hero" className="hover:text-yellow-600 transition-colors">Home</a>
            <a href="#rates" className="hover:text-yellow-600 transition-colors">Game Rates</a>
            <a href="#charts" className="hover:text-yellow-600 transition-colors">Charts</a>
            <a href="#contact" className="hover:text-yellow-600 transition-colors">About</a>
          </div>

          <div className="flex items-center gap-4">
            <motion.a 
              href={downloadLink}
              onClick={handleDownload}
              target="_blank"
              rel="noopener noreferrer"
              download="sara777.apk"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-yellow-400 text-black rounded-full text-sm font-black shadow-lg shadow-yellow-400/20 hover:bg-yellow-500 transition-all border-b-2 border-yellow-600/40 uppercase"
            >
              FREE SIGNUP
            </motion.a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-yellow-200/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-amber-100/50 blur-[100px] rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-black mb-8 tracking-widest uppercase shadow-sm">
              <CheckCircle2 size={14} />
              VERIFIED OFFICIAL PLATFORM
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black leading-[1.1] mb-8 text-neutral-900">
              INDIA'S #1 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-500 italic">WINNING APP</span>
            </h1>
            
            <p className="text-neutral-600 text-lg mb-10 max-w-lg leading-relaxed font-medium">
              Join <span className="text-neutral-900 font-bold underline decoration-yellow-400">10 Lakh+ Winners</span> today. Get instant results, guaranteed payouts, and the <span className="text-yellow-600 font-bold italic">Fastest Matka Experience</span> immediately.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 mb-12">
              <motion.a
                href={downloadLink}
                onClick={handleDownload}
                target="_blank"
                rel="noopener noreferrer"
                download="sara777.apk"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-4 px-12 py-6 bg-yellow-400 text-black rounded-[2rem] font-black text-2xl shadow-[0_20px_40px_-5px_rgba(250,204,21,0.3)] relative group overflow-hidden border-b-8 border-yellow-600 active:border-b-0 active:translate-y-2 transition-all"
              >
                <div className="absolute inset-0 bg-white/40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                <Download className="animate-bounce" />
                DOWNLOAD APK NOW
              </motion.a>
              
              <div className="flex flex-col justify-center bg-white/50 p-4 rounded-2xl border border-yellow-100 backdrop-blur-sm self-center sm:self-auto">
                <div className="flex items-center gap-1 text-yellow-500 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                  <span className="text-neutral-900 font-black ml-2 mt-1">4.9/5</span>
                </div>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest text-center">Apple & Android Verified</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatBox label="Daily Winners" value="15k+" />
              <StatBox label="Auto Withdraw" value="2 Min" />
              <StatBox label="Min Play" value="₹10" />
              <StatBox label="Support" value="24/7" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 bg-white aspect-[5/4] rounded-[3rem] p-4 border border-yellow-200 shadow-3xl overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1596838132731-dd36a183b442?auto=format&fit=crop&q=80&w=1000" 
                alt="Winning Moment"
                className="w-full h-full object-cover rounded-[2.5rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-600/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-yellow-200 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-black text-neutral-400 uppercase mb-1">Current Jackpot</div>
                    <div className="text-3xl font-black text-neutral-900">₹25,00,000+</div>
                  </div>
                  <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center text-black shadow-lg shadow-yellow-600/30">
                    <TrendingUp size={28} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-yellow-300/40 blur-[80px] rounded-full animate-pulse" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-amber-300/20 blur-[80px] rounded-full animate-pulse delay-500" />
          </motion.div>
        </div>
      </section>

      {/* Conversion Banner */}
      <div className="bg-yellow-400 py-4 overflow-hidden relative border-y border-yellow-500 shadow-lg">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-8">
              <span className="font-black text-black text-sm uppercase flex items-center gap-2">
                <CheckCircle2 size={16} /> GUARANTEED WITHDRAWAL
              </span>
              <span className="font-black text-black text-sm uppercase flex items-center gap-2">
                <ShieldCheck size={16} /> ANTI-FRAUD SYSTEM
              </span>
              <span className="font-black text-black text-sm uppercase flex items-center gap-2">
                <Zap size={16} /> FASTEST UPDATES
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Rates Section */}
      <section id="rates" className="py-24 bg-white border-y border-yellow-100 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 px-4">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-neutral-900">Highest Profit Rates</h2>
            <p className="text-neutral-500 font-bold">Why play elsewhere when you win more at Sara777?</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <RateCard label="Single Digit" value="1 : 10" highlight />
            <RateCard label="Jodi Digits" value="1 : 100" />
            <RateCard label="Single Pana" value="1 : 150" />
            <RateCard label="Double Pana" value="1 : 300" />
            <RateCard label="Triple Pana" value="1 : 800" />
            <RateCard label="Half Sangam" value="1 : 1000" highlight />
            <RateCard label="Full Sangam" value="1 : 10000" />
            <RateCard label="Red Brackets" value="1 : 100" />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-neutral-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-20 items-center">
          <div className="flex-1">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic text-yellow-400 tracking-tighter">100% SECURE <br />& ANONYMOUS.</h2>
            <p className="text-neutral-400 text-lg mb-12 font-medium">
              Your privacy is our priority. With end-to-end encrypted transactions and an anonymous betting experience, you can play with total peace of mind.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-yellow-400"><ShieldCheck size={28} /></div>
                <h4 className="font-black uppercase text-sm mt-2">Safe Play</h4>
                <p className="text-xs text-neutral-500 font-medium">Advanced anti-cheat protection.</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-green-400"><Zap size={28} /></div>
                <h4 className="font-black uppercase text-sm mt-2">Auto-Credits</h4>
                <p className="text-xs text-neutral-500 font-medium">Winnings credited instantly.</p>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="bg-yellow-400 p-12 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(250,204,21,0.3)]">
              <div className="flex flex-col gap-8">
                <p className="text-black text-3xl font-black italic tracking-tight">"This is the fastest app for Kalyan and Milan Bazar. Withdrawals come in 2 minutes!"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-black rounded-full" />
                  <div>
                    <p className="text-black font-black uppercase text-sm">Vikas Sharma</p>
                    <p className="text-black/60 font-bold text-xs uppercase tracking-widest">Premium User</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#fffdf0] pt-24 pb-32 border-t border-yellow-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="max-w-xs">
              <div className="flex items-center gap-3 mb-6">
                <SaraLogo size="w-12 h-12" />
                <span className="text-2xl font-black tracking-tighter uppercase">SARA777</span>
              </div>
              <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                The official and most reliable Satta Matka platform in India. Over 1 Million+ downloads across the country.
              </p>
              <div className="flex gap-4">
                <button className="w-12 h-12 bg-yellow-100 text-yellow-700 rounded-2xl flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all">
                  <Share2 size={24} />
                </button>
                <button className="w-12 h-12 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                  <Headphones size={24} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-16">
              <div>
                <h4 className="font-black mb-6 text-[10px] uppercase tracking-[0.3em] text-neutral-400">Company</h4>
                <ul className="space-y-4 text-sm font-black uppercase tracking-tighter">
                  <li><a href="#" className="hover:text-yellow-600 transition-colors">Safety</a></li>
                  <li><a href="#" className="hover:text-yellow-600 transition-colors">Games</a></li>
                  <li><a href="#" className="hover:text-yellow-600 transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-yellow-600 transition-colors">Legal</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-black mb-6 text-[10px] uppercase tracking-[0.3em] text-neutral-400">Action</h4>
                <a 
                  href={downloadLink} 
                  onClick={handleDownload}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="sara777.apk"
                  className="p-5 bg-yellow-400 text-black font-black rounded-3xl block text-center shadow-xl shadow-yellow-600/20 active:scale-95 transition-transform uppercase text-sm border-b-4 border-yellow-600"
                >
                  APK DOWNLOAD
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-yellow-100 text-center">
            <div className="flex justify-center gap-8 mb-8 grayscale opacity-50">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/bb/SSL_Gold_Seal.png" alt="SSL" className="h-10 object-contain" />
              <div className="flex items-center gap-2 font-black text-neutral-400 text-xs italic">18+ ONLY</div>
            </div>
            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.2em] mb-4">
              © 2025 SARA777 OFFICIAL | ADULT GAMING ONLY
            </p>
          </div>
        </div>
      </footer>

      {/* Marquee Style Animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 20s linear infinite;
          width: 200%;
        }
      `}</style>
    </div>
  );
}

function StatBox({ label, value }: { label: string, value: string }) {
  return (
    <div className="p-5 rounded-2xl bg-white border border-yellow-100 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.05)] text-center hover:scale-105 transition-transform cursor-default">
      <div className="text-[10px] text-neutral-400 font-black uppercase tracking-widest mb-1">{label}</div>
      <div className="text-2xl font-black text-neutral-900 tracking-tight leading-none">{value}</div>
    </div>
  );
}

function RateCard({ label, value, highlight }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className={`p-8 rounded-[2.5rem] bg-white border-2 ${highlight ? 'border-yellow-400 shadow-2xl shadow-yellow-600/10 scale-105' : 'border-neutral-50 border-t-yellow-100 shadow-sm'} hover:border-yellow-400 hover:shadow-2xl transition-all group overflow-hidden relative`}>
      {highlight && <div className="absolute top-0 right-0 py-1 px-4 bg-yellow-400 text-[8px] font-black uppercase tracking-widest">Popular</div>}
      <div className="text-xs font-black text-neutral-400 mb-3 uppercase tracking-widest group-hover:text-yellow-600 transition-colors">{label}</div>
      <div className="text-4xl font-black text-neutral-900 tracking-tighter leading-none">{value}</div>
    </div>
  );
}
