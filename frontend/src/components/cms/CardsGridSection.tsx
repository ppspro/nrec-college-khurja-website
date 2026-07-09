import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Timeline from '@/components/ui/Timeline';
import { CheckCircle, AlertCircle, FileText, ArrowRight, User, GraduationCap, Award, MapPin, Phone, Mail } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  CheckCircle: <CheckCircle size={20} className="text-emerald-600" />,
  AlertCircle: <AlertCircle size={20} className="text-rose-600" />,
  FileText: <FileText size={20} className="text-[#8B0E2A]" />,
  ArrowRight: <ArrowRight size={20} className="text-[#8B0E2A]" />,
  User: <User size={20} className="text-[#8B0E2A]" />,
  GraduationCap: <GraduationCap size={20} className="text-[#8B0E2A]" />,
  Award: <Award size={20} className="text-[#8B0E2A]" />,
  MapPin: <MapPin size={20} className="text-[#8B0E2A]" />,
  Phone: <Phone size={20} className="text-[#8B0E2A]" />,
  Mail: <Mail size={20} className="text-[#8B0E2A]" />,
};

interface GridCard {
  title: string;
  description: string;
  prefix?: string;
  icon?: string;
  highlight?: boolean;
}

interface CardsGridData {
  title?: string;
  subtitle?: string;
  columns?: number;
  style?: 'numbered' | 'icon' | 'basic';
  cards: GridCard[];
}

export default function CardsGridSection({ data }: { data: CardsGridData }) {
  if (!data || !data.cards || !Array.isArray(data.cards)) return null;

  const cols = data.columns || 3;
  const gridClass = 
    cols === 2 ? 'grid-cols-1 md:grid-cols-2' :
    cols === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
    'grid-cols-1 md:grid-cols-3';

  const cardStyle = data.style || 'basic';

  return (
    <section className="bg-white section-py">
      <div className="container-nrec">
        {(data.title || data.subtitle) && (
          <SectionTitle
            label={data.subtitle}
            title={data.title || ''}
            align="center"
            className="mb-14"
          />
        )}
        
        {cardStyle === 'numbered' ? (
          <Timeline 
            layout="steps" 
            items={data.cards.map((card, index) => ({
              step: card.prefix || (index + 1).toString().padStart(2, '0'),
              title: card.title,
              description: card.description
            }))} 
          />
        ) : (
          <div className={`grid ${gridClass} gap-6`}>
            {data.cards.map((card, index) => {
              const numStr = (index + 1).toString().padStart(2, '0');
              const prefix = card.prefix || numStr;
              const isHighlight = card.highlight;

              return (
                <Card 
                  key={index} 
                  hoverEffect={true} 
                  className={`p-8 relative overflow-hidden bg-white border ${isHighlight ? 'border-[#8B0E2A]/30 shadow-sm' : 'border-gray-100'} rounded-[20px] group transition-all duration-300 hover:border-[#8B0E2A]/50 hover:shadow-md`}
                >
                  <div className="relative z-10">
                    <div className="flex items-start gap-3 mb-3">
                      {cardStyle === 'icon' && card.icon && iconMap[card.icon] && (
                        <div className="mt-1 flex-shrink-0">
                          {iconMap[card.icon]}
                        </div>
                      )}
                      <h3 className={`font-heading font-bold text-xl transition-colors duration-300 ${isHighlight ? 'text-[#8B0E2A]' : 'text-[#111111] group-hover:text-[#8B0E2A]'}`}>
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-[#666666] leading-relaxed text-[15px]">
                      {card.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
