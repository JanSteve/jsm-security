'use client';

import { motion } from 'motion/react';
import { Shield, Lightbulb, Award, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    { icon: Shield, title: 'Trust', description: 'Unwavering commitment to securing what matters most.' },
    { icon: Lightbulb, title: 'Innovation', description: 'Forward-thinking solutions for modern challenges.' },
    { icon: Award, title: 'Excellence', description: 'Delivering the highest standards in every service.' },
    { icon: Clock, title: 'Reliability', description: 'Always there when you need us, 24/7/365.' },
  ];

  const team = [
    { name: 'J SWEETY', role: 'Managing Director (MD)', bio: 'Executive leadership steering the strategic vision and growth of JSM.' },
    { name: 'A RICHARD', role: 'Chief Executive Officer (CEO)', bio: 'Leading operations, client partnerships, and international security standards.' },
    { name: 'R JAN STEVE DANIEL', role: 'Chief Technology Officer (CTO)', bio: 'Architecting intelligent IoT security monitoring and digital client portal ecosystems.' },
  ];

  return (
    <main className="min-h-screen bg-white text-zinc-800 pb-24">
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-black mb-6 tracking-tight"
        >
          About JSM Security
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-zinc-500 font-medium"
        >
          Building the future of integrated services and corporate safety
        </motion.p>
      </section>

      {/* Story & Image (Apple Style Split) */}
      <section className="px-6 py-16 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Story text */}
        <div className="lg:col-span-7 space-y-6 text-zinc-600 text-lg leading-relaxed">
          <p>
            Founded on the principles of trust and excellence, JSM Security is an ambitious, newly established provider of integrated security and facility management solutions. We recognize that the modern landscape requires more than just traditional security—it demands a holistic approach that seamlessly integrates people, technology, and property management.
          </p>
          <p>
            Operating across multiple verticals including corporate security, digital infrastructure, event management, and real estate services, our goal is to streamline your operations while ensuring absolute safety. We bring a fresh perspective to the industry, leveraging cutting-edge technology and highly trained professionals to deliver bespoke solutions for every client.
          </p>
        </div>

        {/* Corporate Lobby Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-5 rounded-3xl overflow-hidden shadow-xl border border-zinc-200 p-2 bg-zinc-50"
        >
          <div className="rounded-2xl overflow-hidden border border-zinc-200">
            <img 
              src="/images/facility_lobby.jpg" 
              alt="JSM Corporate Lobby Headquarters" 
              className="w-full h-auto object-cover min-h-[350px]"
            />
          </div>
        </motion.div>
      </section>

      {/* Vision & Mission */}
      <section className="px-6 py-16 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-50 p-8 rounded-3xl border border-zinc-200/60 shadow-sm"
        >
          <h2 className="text-2xl font-bold text-black mb-4">Our Vision</h2>
          <p className="text-zinc-500 leading-relaxed text-sm">To be the most trusted and innovative provider of integrated services globally, setting new standards for safety, efficiency, and technological integration.</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-50 p-8 rounded-3xl border border-zinc-200/60 shadow-sm"
        >
          <h2 className="text-2xl font-bold text-black mb-4">Our Mission</h2>
          <p className="text-zinc-500 leading-relaxed text-sm">Delivering exceptional, tailor-made security and facility solutions that empower our clients to operate with complete peace of mind and focus on their core business.</p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="px-6 py-16 max-w-6xl mx-auto border-t border-zinc-200/60 mt-12">
        <h2 className="text-3xl font-black text-black mb-10 text-center tracking-tight">Our Core Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-50 p-6 rounded-3xl border border-zinc-200/60 text-center"
            >
              <div className="mx-auto w-12 h-12 bg-[#C5A880]/10 text-[#C5A880] rounded-xl flex items-center justify-center mb-4">
                <v.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">{v.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="px-6 py-16 max-w-6xl mx-auto border-t border-zinc-200/60 mt-12">
        <h2 className="text-3xl font-black text-black mb-10 text-center tracking-tight">Leadership Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((t, i) => (
            <div key={i} className="bg-zinc-50 rounded-3xl overflow-hidden border border-zinc-200/60 shadow-sm flex flex-col group">
              <div className="h-44 bg-zinc-200 w-full group-hover:bg-[#C5A880]/10 transition-colors duration-300 flex items-center justify-center text-zinc-400 font-bold tracking-widest text-xs">
                JSM TEAM
              </div>
              <div className="p-6">
                <h3 className="font-bold text-black text-base">{t.name}</h3>
                <p className="text-[#C5A880] text-xs font-semibold mb-3">{t.role}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Accreditations */}
      <section className="px-6 py-16 max-w-4xl mx-auto text-center border-t border-zinc-200/60 mt-12">
        <h2 className="text-3xl font-black text-black mb-10 tracking-tight">Accreditations & Certifications</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['SIA Approved Contractor', 'ISO 9001 Quality', 'ISO 27001 Security', 'NSI Gold Standards', 'SafeContractor Vetted', 'Cyber Essentials Approved'].map((acc, i) => (
            <div key={i} className="px-5 py-2.5 bg-zinc-50 text-zinc-700 rounded-full text-sm font-semibold border border-zinc-200 shadow-sm flex items-center gap-2">
              <CheckCircle size={14} className="text-emerald-500" />
              {acc}
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 py-16 max-w-4xl mx-auto border-t border-zinc-200/60 mt-12">
        <h2 className="text-3xl font-black text-black mb-10 text-center tracking-tight">Our Journey</h2>
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-zinc-200">
          {[
            { year: '2024', title: 'Inaugural Launch & Trichy Airport Operations', desc: 'JSM Security was founded and officially launched operations, securing the comprehensive security and facility screening assignment at Trichy International Airport as our landmark first client.' },
          ].map((item, i) => (
            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#C5A880] text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <span className="text-[10px]">{item.year}</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-3xl bg-zinc-50 border border-zinc-200/60 shadow-sm">
                <h3 className="font-bold text-black text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center border-t border-zinc-200/60 mt-12">
        <h2 className="text-3xl font-black text-black mb-6 tracking-tight">Ready to elevate your operations?</h2>
        <div className="flex justify-center gap-4">
          <Button asChild className="bg-black hover:bg-zinc-800 text-white font-semibold rounded-full px-6 h-12 shadow-md">
            <Link href="/contact">Get in Touch</Link>
          </Button>
          <Button asChild variant="outline" className="border-zinc-300 text-zinc-800 hover:bg-zinc-50 font-semibold rounded-full px-6 h-12">
            <Link href="/careers">Join Our Team</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
