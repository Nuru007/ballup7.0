import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Scoreboard from "./Scoreboard";
import { Menu, X } from "lucide-react";
import svgPaths from "@/imports/MacBookAir1/svg-sv4f6ggxd0";
import heroBg from "@/imports/MacBookAir1/bfee498d6b4e917aa4c25e91eedc64632235e10d.png";
import playerImg from "@/imports/MacBookAir1/c61d9ed49d410a2d3055ad47a6702c8e728e65df.png";
import sectionBg from "@/imports/MacBookAir1/f94cd86791ea6459ead026e5f8ded4deec544bbc.png";
import ctaBg from "@/imports/MacBookAir1/62ef591f981c9cb1d0fff89ed3dccdd323bfe86f.png";
import ballupLogo from "@/imports/MacBookAir1/9e7a094ee954f9ac1870c48a4df841abfb4fe69b.png";

const EVENT_DATE = new Date("2026-06-28T18:00:00");

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function CheckIcon() {
  return (
    <svg className="shrink-0 mt-0.5" width="12" height="12" viewBox="0 0 11.6667 11.6667" fill="none">
      <path d={svgPaths.p1d9bcc00} fill="#E60000" />
    </svg>
  );
}

function NavBar() {
  const [open, setOpen] = useState(false);
  const links = ["HOME", "ABOUT", "TICKETS", "EXPERIENCE", "FAQ", "CONTACT"];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/60 border-b border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex items-center justify-between h-[60px] lg:h-[72px]">
        {/* Logo */}
        <div className="font-['Epilogue'] font-black italic text-xl text-white tracking-tight whitespace-nowrap">
          BALL UP <span className="text-[#e60000]">7.0</span>
        </div>
        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l, i) => (
            <a
              key={l}
              href="#"
              className={`font-['Lexend'] text-sm uppercase tracking-wide transition-colors ${
                i === 0 ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#tickets"
          className="hidden lg:flex bg-[#e60000] text-white font-['Lexend'] font-bold text-sm uppercase tracking-wide px-6 py-2.5 rounded-lg hover:bg-[#cc0000] transition-colors"
        >
          BUY TICKETS
        </a>
        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-1"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-black/95 border-t border-white/5 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              onClick={() => setOpen(false)}
              className="font-['Lexend'] text-sm uppercase tracking-wide text-white/80 hover:text-white"
            >
              {l}
            </a>
          ))}
          <a
            href="#tickets"
            onClick={() => setOpen(false)}
            className="bg-[#e60000] text-white font-['Lexend'] font-bold text-sm uppercase tracking-wide px-6 py-3 rounded-lg text-center mt-2"
          >
            BUY TICKETS
          </a>
        </div>
      )}
    </header>
  );
}

function CountdownWidget() {
  const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE);
  const pads = (n: number) => String(n).padStart(2, "0");
  const units = [
    { v: pads(days), l: "Days" },
    { v: pads(hours), l: "Hours" },
    { v: pads(minutes), l: "Minutes" },
    { v: pads(seconds), l: "Seconds" },
  ];
  return (
    <div className="bg-black/20 border border-white/10 rounded-[32px] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-sm w-[280px] shrink-0">
      <p className="font-['Manrope'] font-bold text-[10px] text-[#e60000] tracking-[3px] uppercase text-center mb-4">
        Starts In
      </p>
      <div className="grid grid-cols-2 gap-3">
        {units.map(({ v, l }) => (
          <div key={l} className="bg-black/30 border border-white/10 rounded-2xl py-5 flex flex-col items-center gap-1">
            <span
              className="font-['Manrope'] text-4xl font-normal"
              style={{
                background: "linear-gradient(135deg, #e60000 0%, #c80303 45%, #660000 80%, #e60000 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {v}
            </span>
            <span className="font-['Manrope'] font-semibold text-[10px] text-white/35 tracking-[2px] uppercase">
              {l}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-white/8 flex flex-col gap-2">
        {[
          ["The Date", "June 28, 2026"],
          ["The Time", "06:00 PM"],
          ["The Venue", "Alfa Belgore Hall"],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between">
            <span className="font-['Manrope'] font-bold text-[10px] text-[#e60000] tracking-[2px] uppercase">
              {label}
            </span>
            <span className="font-['Manrope'] text-[13px] text-white/75">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}



function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0f0604]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Ball Up 7.0 event background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#210e0c] via-[rgba(33,14,12,0.5)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(33,14,12,0.7)] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center pt-[72px]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 py-16 lg:py-24">
            {/* Left: text */}
            <div className="flex flex-col items-start text-left max-w-[580px] mx-auto">
              
              {/* Abuad Basketball League Logo */}
              <img src={ballupLogo} alt="Abuad Basketball League" className="w-[260px] md:w-[380px] object-contain -mb-2" />
              
              <p className="font-['Epilogue'] italic text-[#e60000] text-lg lg:text-2xl tracking-[-0.5px] uppercase mb-0 [text-shadow:0_0_15px_rgba(230,0,0,0.8)]">
                pRESENTS
              </p>
              
              {/* BALL UP 7.0 Scoreboard */}
              <Scoreboard />

              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="font-['Epilogue'] font-semibold text-white text-sm lg:text-base tracking-[-0.5px] uppercase mb-8 [text-shadow:0_0_15px_rgba(230,0,0,0.8)]"
              >
                SPONSORED BY: pROF EDDIE BABALOLA
              </motion.p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  href="#tickets"
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  whileHover={{ scale: 1.05, y: -2, boxShadow: "0 0 30px rgba(230,0,0,0.6)" }}
                  className="relative bg-[#e60000] text-white font-['Lexend'] font-bold text-sm uppercase tracking-[1.5px] px-10 py-5 rounded-lg shadow-[0_0_50px_-10px_rgba(230,0,0,0.8)] hover:bg-[#cc0000] transition-colors block"
                >
                  BUY TICKETS NOW
                </motion.a>
                <motion.a
                  href="#about"
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                  whileHover={{ scale: 1.05, y: -2, boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
                  className="backdrop-blur-md border-2 border-white/40 text-white font-['Lexend'] font-bold text-sm uppercase tracking-[1.5px] px-10 py-5 rounded-lg hover:bg-white/10 transition-colors block"
                >
                  VIEW EVENT DETAILS
                </motion.a>
              </div>
            </div>
            {/* Right: countdown */}
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="flex justify-center lg:justify-end"
            >
              <CountdownWidget />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const details = [
    {
      svgKey: "p3c95900" as keyof typeof svgPaths,
      vw: 18,
      vh: 20,
      label: "DATE",
      value: "JUNE 28, 2026",
    },
    {
      svgKey: "p256e1340" as keyof typeof svgPaths,
      vw: 20,
      vh: 20,
      label: "TIME",
      value: "6:00 PM",
    },
    {
      svgKey: "p1869180" as keyof typeof svgPaths,
      vw: 16,
      vh: 20,
      label: "VENUE",
      value: "ALFA BELGORE HALL",
    },
  ];
  return (
    <section id="about" className="relative bg-[#0f0604] py-24 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <img src={sectionBg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="flex flex-col gap-5">
            <p className="font-['Lexend'] text-[#e60000] text-sm tracking-[3px] uppercase">
              ABOUT THE EVENT
            </p>
            <h2 className="font-['Epilogue'] font-semibold text-white text-4xl lg:text-5xl xl:text-[60px] tracking-[-2px] uppercase leading-[1.05]">
              MORE THAN A GAME.{" "}
              <span className="block">
                {"IT'S A "}
                <span className="text-[#e60000]">MOVEMENT.</span>
              </span>
            </h2>
            <p className="font-['Lexend'] text-white text-base lg:text-lg leading-relaxed max-w-[512px]">
              BALLUP 7.0 is where basketball, entertainment and community
              collide. Get ready for an unforgettable experience packed with
              high energy matchups, live performances and special guest
              appearances.
            </p>
          </div>
          {/* Right: detail cards */}
          <div className="flex flex-col gap-6">
            {details.map(({ svgKey, vw, vh, label, value }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }}
                whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(230,0,0,0.2)" }}
                className="bg-[#2a1613] rounded-2xl border border-white/[0.28] flex items-center gap-6 p-6 cursor-default"
              >
                <div className="relative rounded-full size-[64px] border-2 border-[#e60000] flex items-center justify-center shrink-0">
                  <svg width={vw} height={vh} viewBox={`0 0 ${vw} ${vh}`} fill="none">
                    <path d={svgPaths[svgKey]} fill="#E60000" />
                  </svg>
                </div>
                <div className="flex flex-col uppercase">
                  <span className="font-['Lexend'] text-[#e9bcb5]/60 text-sm">{label}</span>
                  <span className="font-['Epilogue'] text-white text-xl tracking-[-0.5px]">{value}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { key: "p3996ae40" as keyof typeof svgPaths, vw: 20, vh: 20, label: "ELITE MATCHUPS" },
    { key: "pb2d8f00" as keyof typeof svgPaths, vw: 16, vh: 20, label: "LIVE ENTERTAINMENT" },
    { key: "p3e30af00" as keyof typeof svgPaths, vw: 20, vh: 19, label: "SPECIAL GUESTS" },
    { key: "pd20f980" as keyof typeof svgPaths, vw: 12, vh: 18, label: "HALFTIME PERFORMANCES" },
    { key: "p5df3d80" as keyof typeof svgPaths, vw: 24, vh: 12, label: "COMMUNITY EXPERIENCE" },
  ];
  return (
    <section className="bg-[#0f0604] py-16 border-y border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map(({ key, vw, vh, label }, index) => (
            <motion.div 
              key={label} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex flex-col items-center gap-4 text-center cursor-default"
            >
              <div className="relative rounded-full size-16 border-2 border-[rgba(230,0,0,0.3)] flex items-center justify-center transition-colors group-hover:border-[#e60000]">
                <svg width={vw} height={vh} viewBox={`0 0 ${vw} ${vh}`} fill="none">
                  <path d={svgPaths[key]} fill="#E60000" />
                </svg>
              </div>
              <span className="font-['Lexend'] text-white text-sm uppercase tracking-[-0.5px]">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface TicketCardProps {
  tier: string;
  price: string;
  icon: keyof typeof svgPaths;
  iconVw: number;
  iconVh: number;
  perks: string[];
  featured?: boolean;
  bgColor?: string;
}

function TicketCard({ tier, price, icon, iconVw, iconVh, perks, featured, bgColor = "#1b0907" }: TicketCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative rounded-2xl flex flex-col overflow-hidden ${
        featured
          ? "border-2 border-[#e60000] shadow-[0_0_40px_rgba(230,0,0,0.2)]"
          : "border border-white/10"
      }`}
      style={{ backgroundColor: bgColor }}
    >
      {featured && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#e60000] px-6 py-1 rounded-b-lg">
          <span className="font-['Lexend'] font-black text-white text-sm uppercase tracking-[-0.5px]">
            MOST POPULAR
          </span>
        </div>
      )}
      {/* Header */}
      <div
        className={`px-10 pt-12 pb-10 border-b ${
          featured ? "border-white/5 bg-gradient-to-b from-[rgba(230,0,0,0.1)] to-transparent" : "border-white/5 bg-gradient-to-b from-[rgba(255,255,255,0.05)] to-transparent"
        }`}
      >
        <p className="font-['Epilogue'] text-white text-center text-base uppercase tracking-[-0.5px] mb-5">
          {tier}
        </p>
        <div className="flex justify-center mb-5">
          <svg width={iconVw} height={iconVh} viewBox={`0 0 ${iconVw} ${iconVh}`} fill="none">
            <path d={svgPaths[icon]} fill="#E60000" />
          </svg>
        </div>
        <div className="text-center">
          <span className="font-['Epilogue'] text-[#e60000] text-5xl tracking-[-2px]">{price}</span>
          <span className="font-['Lexend'] text-white/50 text-sm ml-1">/ea</span>
        </div>
      </div>
      {/* Perks */}
      <div className="px-10 pt-10 pb-4 flex flex-col gap-4 flex-1">
        {perks.map((p) => (
          <div key={p} className="flex items-start gap-3">
            <CheckIcon />
            <span className={`font-['Lexend'] text-sm ${featured ? "text-white" : "text-white/70"}`}>{p}</span>
          </div>
        ))}
      </div>
      {/* CTA */}
      <div className="px-10 pb-10 pt-6 border-t border-white/20">
        <motion.button
          whileHover={{ scale: 1.05, y: -2, boxShadow: featured ? "0 0 50px -10px rgba(230,0,0,0.8)" : "0 0 30px rgba(230,0,0,0.3)" }}
          className={`w-full py-4 rounded-xl font-['Lexend'] font-black text-sm uppercase tracking-[1.5px] transition-opacity hover:opacity-90 ${
            featured
              ? "bg-[#e60000] text-white shadow-[0_0_50px_-10px_rgba(230,0,0,0.6)]"
              : "text-[#e60000]"
          }`}
        >
          BUY NOW
        </motion.button>
      </div>
    </motion.div>
  );
}

function TicketsSection() {
  const tickets: TicketCardProps[] = [
    {
      tier: "GENERAL ADMISSION",
      price: "$49",
      icon: "p6f77340",
      iconVw: 30,
      iconVh: 30,
      perks: ["General Seating", "Access to Main Event", "Food & Drink Available", "Event Merchandise"],
    },
    {
      tier: "VIP COURTSIDE",
      price: "$129",
      icon: "p35218000",
      iconVw: 30,
      iconVh: 30,
      perks: ["Courtside Seating", "Access to VIP Lounge", "Complimentary Drinks", "Exclusive Merch Pack", "Early Entry"],
      featured: true,
      bgColor: "#2a1613",
    },
    {
      tier: "ALL-ACCESS PREMIUM",
      price: "$249",
      icon: "p295ae000",
      iconVw: 24,
      iconVh: 31.5,
      perks: ["Premium Courtside Seating", "Access to VIP Lounge", "Complimentary Food & Drinks", "Exclusive Merch Pack", "Meet & Greet Access", "Event After-Party"],
    },
  ];
  return (
    <section id="tickets" className="relative bg-[#0f0604] py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img src={sectionBg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-['Lexend'] text-[#e60000] text-sm tracking-[3px] uppercase mb-3">SELECT YOUR PASS</p>
          <h2 className="font-['Epilogue'] font-bold text-white text-4xl lg:text-5xl uppercase tracking-[-2px]">
            GET YOUR TICKETS
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {tickets.map((t) => (
            <TicketCard key={t.tier} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="relative bg-[#210e0c] py-40 overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img src={ctaBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-white mix-blend-saturation" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#210e0c] via-[rgba(33,14,12,0.9)] to-[rgba(33,14,12,0.2)]" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-col items-center text-center gap-6"
      >
        <h2 className="font-['Epilogue'] font-bold text-white text-4xl sm:text-5xl lg:text-[72px] uppercase tracking-[-3px] leading-[1]">
          {"DON'T MISS "}
          <span className="text-[#e60000]">BALLUP 7.0</span>
        </h2>
        <p className="font-['Lexend'] text-[#e9bcb5] text-base max-w-[560px]">
          Secure your seat and experience the energy live. Tickets are limited and selling out fast.
        </p>
        <motion.a
          href="#tickets"
          whileHover={{ scale: 1.05, y: -2, boxShadow: "0 0 50px -10px rgba(230,0,0,0.9)" }}
          className="relative flex items-center gap-4 bg-gradient-to-r from-[#e60000] to-[#dc2626] text-white font-['Lexend'] font-black text-lg uppercase tracking-[2px] px-14 py-6 rounded-xl shadow-[0_0_50px_-10px_rgba(230,0,0,0.8)] transition-all"
        >
          <svg width={20} height={16} viewBox="0 0 20 16" fill="none">
            <path d={svgPaths.p12995800} fill="white" />
          </svg>
          BUY YOUR TICKETS NOW
        </motion.a>
      </motion.div>
    </section>
  );
}

function Footer() {
  const socialIcons: Array<{ key: keyof typeof svgPaths; vw: number; vh: number }> = [
    { key: "p3c4dd880", vw: 11.667, vh: 11.667 },
    { key: "p313c6040", vw: 10.5, vh: 11.667 },
    { key: "p1fd12b00", vw: 12.25, vh: 11.667 },
  ];
  const quickLinks = ["Home", "About", "Tickets", "Experience", "FAQ", "Contact"];
  return (
    <footer className="bg-[#1b0907] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-5">
            <div className="font-['Epilogue'] font-black italic text-2xl text-white tracking-tight">
              BALL UP <span className="text-[#e60000]">7.0</span>
            </div>
            <p className="font-['Lexend'] text-[#e9bcb5] text-sm leading-relaxed">
              Bringing the best of basketball,
              entertainment and community together in one epic event.
            </p>
            <div className="flex gap-4">
              {socialIcons.map(({ key, vw, vh }, i) => (
                <a
                  key={i}
                  href="#"
                  className="bg-white/5 rounded-full size-10 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <svg width={vw} height={vh} viewBox={`0 0 ${vw} ${vh}`} fill="none">
                    <path d={svgPaths[key]} fill="white" fillOpacity="0.5" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          {/* Quick Links */}
          <div className="flex flex-col gap-5">
            <h4 className="font-['Epilogue'] text-white text-base uppercase tracking-[-0.5px]">QUICK LINKS</h4>
            <div className="flex flex-col gap-3">
              {quickLinks.map((l) => (
                <a key={l} href="#" className="font-['Lexend'] text-[#e9bcb5] text-sm hover:text-white transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>
          {/* Event Info */}
          <div className="flex flex-col gap-5">
            <h4 className="font-['Epilogue'] text-white text-base uppercase tracking-[-0.5px]">EVENT INFO</h4>
            <div className="flex flex-col gap-4">
              {[
                { label: "DATE", value: "June 28, 2026" },
                { label: "TIME", value: "6:00 PM" },
                { label: "LOCATION", value: "City Arena, Los Angeles, CA" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col">
                  <span className="font-['Lexend'] text-white/40 text-[10px] uppercase mb-0.5">{label}</span>
                  <span className="font-['Lexend'] text-[#e9bcb5] text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Contact */}
          <div className="flex flex-col gap-5">
            <h4 className="font-['Epilogue'] text-white text-base uppercase tracking-[-0.5px]">CONTACT US</h4>
            <div className="flex flex-col gap-3">
              {["info@ballup7.com", "(310) 555-0170", "123 Game Time Blvd\nLos Angeles, CA 90001"].map((v, i) => (
                <p key={i} className="font-['Lexend'] text-[#e9bcb5] text-sm whitespace-pre-line">{v}</p>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-['Lexend'] text-[#e9bcb5] text-sm flex flex-col sm:flex-row gap-1 sm:gap-2">
            <span>© 2026 BALLUP 7.0. All Rights Reserved.</span>
            <span className="text-white/60">Powered by Enta Technologies</span>
          </p>
          <div className="flex gap-8">
            {["PRIVACY POLICY", "TERMS OF SERVICE"].map((l) => (
              <a key={l} href="#" className="font-['Lexend'] text-[#e9bcb5] text-xs uppercase hover:text-white transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0f0604] overflow-x-hidden">
      <NavBar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <TicketsSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
