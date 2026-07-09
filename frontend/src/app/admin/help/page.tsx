import React from 'react';
import { Search, Book, HelpCircle, Video, FileText, Download } from 'lucide-react';
import Card from '@/components/ui/Card';

export const metadata = {
  title: 'Help Center | NREC Admin',
};

export default function HelpCenterPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#990A25] to-[#7A081E] text-white p-8 rounded-2xl shadow-md">
        <div>
          <h1 className="text-3xl font-bold font-heading mb-2">How can we help you today?</h1>
          <p className="text-white/80">Search for tutorials, guides, and FAQs.</p>
        </div>
        <div className="relative max-w-sm w-full">
          <input 
            type="text" 
            placeholder="Search documentation..." 
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 outline-none focus:bg-white/20 transition-colors"
          />
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="#getting-started" className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-14 h-14 rounded-full bg-[#990A25]/5 flex items-center justify-center text-[#990A25] group-hover:scale-110 transition-transform mb-4">
            <Book size={24} />
          </div>
          <h3 className="font-bold text-gray-900">Getting Started</h3>
          <p className="text-xs text-gray-500 mt-2 text-center">Learn the dashboard basics</p>
        </a>
        <a href="#tutorials" className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-14 h-14 rounded-full bg-[#990A25]/5 flex items-center justify-center text-[#990A25] group-hover:scale-110 transition-transform mb-4">
            <Video size={24} />
          </div>
          <h3 className="font-bold text-gray-900">Video Tutorials</h3>
          <p className="text-xs text-gray-500 mt-2 text-center">Step-by-step visual guides</p>
        </a>
        <a href="#manuals" className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-14 h-14 rounded-full bg-[#990A25]/5 flex items-center justify-center text-[#990A25] group-hover:scale-110 transition-transform mb-4">
            <FileText size={24} />
          </div>
          <h3 className="font-bold text-gray-900">User Manuals</h3>
          <p className="text-xs text-gray-500 mt-2 text-center">Download PDF documentation</p>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* FAQs */}
          <Card hoverEffect={false} className="p-8 bg-white">
            <h2 id="getting-started" className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <HelpCircle size={20} className="text-[#990A25]" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800">How do I change the Homepage slider?</h4>
                <p className="text-sm text-gray-600 mt-1">{"Navigate to \"Website Content\" > \"Banners\". You can upload new images, change the text, and drag to reorder them."}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">What is the recommended image size for News?</h4>
                <p className="text-sm text-gray-600 mt-1">For News and Events, a standard 800x600 pixels (or 4:3 aspect ratio) image works best. Max size is 2MB.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">How do I hide a page without deleting it?</h4>
                <p className="text-sm text-gray-600 mt-1">{"Edit the item and uncheck the \"Visibility (Publish to Website)\" toggle, then save. It will be hidden from the public site."}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">How do I add a new navigation link?</h4>
                <p className="text-sm text-gray-600 mt-1">{"Go to \"Website Content\" > \"Website Menu\". You can add new links, create dropdowns, and link them to your created Website Pages."}</p>
              </div>
            </div>
          </Card>

          {/* Glossary */}
          <Card hoverEffect={false} className="p-8 bg-white">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Book size={20} className="text-[#990A25]" />
              Glossary of Terms
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <strong className="block text-gray-800 mb-1">Slug / Page URL</strong>
                <span className="text-xs text-gray-600">{"The specific web address for a page (e.g. \"about-us\" makes the URL /pages/about-us)."}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <strong className="block text-gray-800 mb-1">Visibility</strong>
                <span className="text-xs text-gray-600">Whether a piece of content is currently live on the public website.</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <strong className="block text-gray-800 mb-1">JSON Array</strong>
                <span className="text-xs text-gray-600">{"A technical format for a list of items. Must look like: [\"Item 1\", \"Item 2\"]."}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <strong className="block text-gray-800 mb-1">Search Engine Settings (SEO)</strong>
                <span className="text-xs text-gray-600">Information like Title and Description used by Google to display your page in search results.</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card hoverEffect={false} id="manuals" className="p-6 bg-white border border-[#990A25]/20 shadow-[0_8px_30px_rgba(153,10,37,0.04)]">
            <h3 className="font-bold text-gray-900 mb-4">Client Handover Docs</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-[#990A25]/5 text-gray-700 hover:text-[#990A25] transition-colors group">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <FileText size={16} /> Admin User Manual
                </div>
                <Download size={14} className="opacity-50 group-hover:opacity-100" />
              </a>
              <a href="#" className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-[#990A25]/5 text-gray-700 hover:text-[#990A25] transition-colors group">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <FileText size={16} /> API Documentation
                </div>
                <Download size={14} className="opacity-50 group-hover:opacity-100" />
              </a>
              <a href="#" className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-[#990A25]/5 text-gray-700 hover:text-[#990A25] transition-colors group">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <FileText size={16} /> Postman Collection
                </div>
                <Download size={14} className="opacity-50 group-hover:opacity-100" />
              </a>
            </div>
          </Card>
          
          <Card hoverEffect={false} className="p-6 bg-gray-900 text-white">
            <h3 className="font-bold mb-2">Need Technical Support?</h3>
            <p className="text-sm text-gray-400 mb-4">If you encounter an error or need architectural changes, contact the development team.</p>
            <a href="mailto:support@developer.com" className="block text-center w-full py-2.5 bg-white text-gray-900 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors">
              Contact Support
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
