'use client';

import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Users, BookOpen, Trophy, Building2, Star } from 'lucide-react';

const stats = [
  { value: 123, suffix: '+', label: 'Years of Excellence', icon: Star, color: '#C6A04D' },
  { value: 15000, suffix: '+', label: 'Alumni Worldwide', icon: GraduationCap, color: '#990A25' },
  { value: 20, suffix: '+', label: 'Departments', icon: Building2, color: '#2563EB' },
  { value: 200, suffix: '+', label: 'Faculty Members', icon: Users, color: '#059669' },
  { value: 50, suffix: '+', label: 'Courses Offered', icon: BookOpen, color: '#7C3AED' },
  { value: 100, suffix: '+', label: 'Awards & Honours', icon: Trophy, color: '#DC2626' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + increment, target);
            setCount(Math.round(current));
            if (current >= target) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function CollegeStats() {
  return (
    <section
      className="relative overflow-hidden section-py"
      style={{ background: 'linear-gradient(135deg, #111111 0%, #1a0a10 60%, #0d0510 100%)' }}
    >
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(198,160,77,0.8) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />
      {/* Red accent bar at top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#990A25] via-[#C6A04D] to-[#990A25]" />

      <div className="relative container-nrec">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">NREC by Numbers</span>
          <h2 className="font-heading text-white font-bold" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
            A Century of Impact
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map(({ value, suffix, label, icon: Icon, color }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C6A04D]/40 hover:bg-white/8 transition-all duration-300 group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ background: `${color}20` }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <div className="font-heading text-white font-bold text-3xl md:text-2xl lg:text-3xl mb-1">
                <CountUp target={value} suffix={suffix} />
              </div>
              <div className="text-gray-400 text-xs leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
