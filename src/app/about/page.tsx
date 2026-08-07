'use client';

import { motion } from 'motion/react';
import { Shield, Lightbulb, Award, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  const values = [
    { icon: Shield, title: 'Trust', description: 'Unwavering commitment to securing what matters most.' },
    { icon: Lightbulb, title: 'Innovation', description: 'Forward-thinking solutions for modern challenges.' },
    { icon: Award, title: 'Excellence', description: 'Delivering the highest standards in every service.' },
    { icon: Clock, title: 'Reliability', description: 'Always there when you need us, 24/7/365.' },
  ];

  const team = [
    { name: 'James Mitchell', role: 'CEO', bio: '20+ years leading integrated services.' },
    { name: 'Sarah Chen', role: 'COO', bio: 'Expert in operational efficiency and scale.' },
    { name: 'David Williams', role: 'Head of Security', bio: 'Former military, strategic security specialist.' },
    { name: 'Priya Patel', role: 'CTO', bio: 'Driving digital transformation in security.' },
  ];

  return (
    <main className="min-h-screen bg-[#0A1128] text-[#F8F9FA] pb-24">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6 font-jakarta"
        >
          About JSM Security
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-[#94A3B8]"
        >
          Building the future of integrated services
        </motion.p>
      </section>

      {/* Story */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="space-y-6 text-[#F8F9FA]/80 leading-relaxed text-lg">
          <p>
            Founded on the principles of trust and excellence, JSM Security is an ambitious, newly established provider of integrated security and facility management solutions. We recognize that the modern landscape requires more than just traditional security—it demands a holistic approach that seamlessly integrates people, technology, and property management.
          </p>
          <p>
            Operating across multiple verticals including corporate security, digital infrastructure, event management, and real estate services, our goal is to streamline your operations while ensuring absolute safety. We bring a fresh perspective to the industry, leveraging cutting-edge technology and highly trained professionals to deliver bespoke solutions for every client.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="px-6 py-16 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[#121C3B] p-8 rounded-2xl border border-[#1A264D]"
        >
          <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">Our Vision</h2>
          <p className="text-[#94A3B8]">To be the most trusted and innovative provider of integrated services globally, setting new standards for safety, efficiency, and technological integration.</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[#121C3B] p-8 rounded-2xl border border-[#1A264D]"
        >
          <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">Our Mission</h2>
          <p className="text-[#94A3B8]">Delivering exceptional, tailor-made security and facility solutions that empower our clients to operate with complete peace of mind and focus on their core business.</p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center font-jakarta">Our Core Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#121C3B] p-6 rounded-xl border border-[#1A264D] text-center"
            >
              <div className="mx-auto w-12 h-12 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full flex items-center justify-center mb-4">
                <v.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-[#94A3B8]">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center font-jakarta">Leadership Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((t, i) => (
            <div key={i} className="bg-[#121C3B] rounded-xl overflow-hidden border border-[#1A264D]">
              <div className="h-48 bg-[#1A264D] w-full" />
              <div className="p-6">
                <h3 className="font-semibold text-lg">{t.name}</h3>
                <p className="text-[#D4AF37] text-sm mb-3">{t.role}</p>
                <p className="text-xs text-[#94A3B8]">{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Accreditations */}
      <section className="px-6 py-16 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10 font-jakarta">Accreditations & Certifications</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['SIA Approved Contractor', 'ISO 9001', 'ISO 27001', 'NSI Gold', 'SafeContractor', 'Cyber Essentials'].map((acc, i) => (
            <div key={i} className="px-4 py-2 bg-[#1A264D] text-[#F8F9FA] rounded-full text-sm font-medium border border-[#3B82F6]/30 flex items-center gap-2">
              <CheckCircle size={14} className="text-[#10B981]" />
              {acc}
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center font-jakarta">Our Journey</h2>
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#D4AF37] before:to-transparent">
          {[
            { year: '2023', title: 'Founded', desc: 'JSM Security established with a vision for integrated services.' },
            { year: '2024', title: 'First Major Contract', desc: 'Secured multi-site facility management for a national retailer.' },
            { year: '2025', title: 'Expansion', desc: 'Launched specialized digital and property service divisions.' },
          ].map((item, i) => (
            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0A1128] bg-[#D4AF37] text-[#0A1128] font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <span className="text-[10px]">{item.year}</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-[#121C3B] border border-[#1A264D]">
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-[#94A3B8]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6 font-jakarta">Ready to elevate your security?</h2>
        <div className="flex justify-center gap-4">
          <Button asChild className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0A1128] font-semibold">
            <Link href="/contact">Get in Touch</Link>
          </Button>
          <Button asChild variant="outline" className="border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10">
            <Link href="/careers">Join Our Team</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
