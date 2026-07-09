import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import Timeline from '@/components/ui/Timeline';
import FeatureCard from '@/components/ui/FeatureCard';
import { CheckCircle, AlertCircle, FileText, ArrowRight, User, GraduationCap, Award, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';

const iconComponentMap: Record<string, any> = {
  CheckCircle,
  AlertCircle,
  FileText,
  ArrowRight,
  User,
  GraduationCap,
  Award,
  MapPin,
  Phone,
  Mail,
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
              const isHighlight = card.highlight;
              const theme = isHighlight ? 'secondary' : 'primary';
              const IconComp = (cardStyle === 'icon' && card.icon && iconComponentMap[card.icon]) 
                ? iconComponentMap[card.icon] 
                : ChevronRight;

              return (
                <FeatureCard 
                  key={index} 
                  title={card.title}
                  description={card.description}
                  icon={IconComp}
                  colorTheme={theme}
                  className="h-full"
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
