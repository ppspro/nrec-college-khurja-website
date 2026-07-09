'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Map, LayoutDashboard, Sliders, Image, FileText, HelpCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

const TOUR_STEPS = [
  {
    title: 'Welcome to your new CMS!',
    description: 'We have completely upgraded your admin panel to make managing NREC College website content easier than ever.',
    icon: Map,
  },
  {
    title: '1. Dashboard',
    description: 'Get a quick overview of your website traffic, total pages, and system health right from the home screen.',
    icon: LayoutDashboard,
  },
  {
    title: '2. Website Content',
    description: 'Use the "Website Content" section to edit your Homepage Banners, adjust the main Menu, and manage SEO for all Website Pages.',
    icon: Sliders,
  },
  {
    title: '3. Media Library',
    description: 'Upload and manage all your images, PDFs, and resources in one central location under "Resources & System".',
    icon: Image,
  },
  {
    title: '4. Smart Forms',
    description: 'All forms now include helpful placeholders and recommended image sizes. If you want to hide a page temporarily, just uncheck "Visibility"!',
    icon: FileText,
  },
  {
    title: '5. Help Center',
    description: 'Stuck? Click on the "Help Center" in the sidebar anytime to read the manual, check FAQs, and get support.',
    icon: HelpCircle,
  }
];

export default function WelcomeTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const hasSeenTour = localStorage.getItem('nrec_admin_tour_seen');
    if (!hasSeenTour) {
      // Small delay for dramatic effect after login
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const completeTour = () => {
    localStorage.setItem('nrec_admin_tour_seen', 'true');
    setIsOpen(false);
  };

  const next = () => {
    if (step < TOUR_STEPS.length - 1) setStep(step + 1);
    else completeTour();
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  if (!isClient) return null;

  const currentStep = TOUR_STEPS[step];
  const Icon = currentStep.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#990A25] to-[#7A081E] p-6 text-white text-center relative">
              <button onClick={completeTour} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
                <X size={20} />
              </button>
              <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md mb-4 shadow-inner border border-white/20">
                <Icon size={32} className="text-white drop-shadow-md" />
              </div>
              <h2 className="text-xl font-bold font-heading">{currentStep.title}</h2>
            </div>
            
            {/* Body */}
            <div className="p-8 text-center flex-1">
              <p className="text-gray-600 text-[15px] leading-relaxed">
                {currentStep.description}
              </p>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mb-6">
              {TOUR_STEPS.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === step ? 'bg-[#990A25] w-6' : 'bg-gray-200'}`} />
              ))}
            </div>

            {/* Footer Controls */}
            <div className="p-5 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
              <button onClick={completeTour} className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors px-2">
                Skip Tour
              </button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={prev} disabled={step === 0} className="px-3">
                  <ChevronLeft size={18} />
                </Button>
                <Button variant="primary" onClick={next} className="px-6">
                  {step === TOUR_STEPS.length - 1 ? 'Finish' : 'Next'}
                  {step !== TOUR_STEPS.length - 1 && <ChevronRight size={16} className="ml-1" />}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
