'use client';

import { useState, useEffect, useMemo } from 'react';
import api, { uploadsUrl } from '@/lib/api';
import { Faculty, Department } from '@/types';
import PageBanner from '@/components/ui/PageBanner';
import ScrollReveal from '@/components/ui/ScrollReveal';
import EmptyState from '@/components/ui/EmptyState';
import FacultyCard from '@/components/ui/FacultyCard';
import { Search, Filter, BookOpen, GraduationCap, Grid, ListFilter } from 'lucide-react';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const CATEGORIES = ['Arts', 'Commerce', 'Education', 'Law', 'Science'];
const DESIGNATIONS = ['Principal', 'Professor', 'Associate Professor', 'Assistant Professor'];

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [facRes, deptRes] = await Promise.all([
          api.get('/faculty'),
          api.get('/departments')
        ]);
        setFaculty(facRes.data.faculty || []);
        setDepartments(deptRes.data.departments || []);
      } catch (err) {
        console.error('Failed to load faculty directory:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter Logic (Instant, no page reload)
  const filteredFaculty = useMemo(() => {
    return faculty.filter((member) => {
      // 1. Search Query (name, designation, specialization/research)
      const query = search.toLowerCase();
      const nameMatch = member.name.toLowerCase().includes(query);
      const desMatch = member.designation.toLowerCase().includes(query);
      const specMatch = member.specialization && member.specialization.some(s => s.toLowerCase().includes(query));
      const matchesSearch = !search || nameMatch || desMatch || specMatch;

      // 2. Faculty Category Filter
      const matchesCategory = !selectedCategory || member.faculty === selectedCategory;

      // 3. Department Filter
      const memberDeptId = typeof member.department === 'object' && member.department !== null 
        ? member.department._id 
        : member.department;
      const matchesDept = !selectedDept || memberDeptId === selectedDept;

      // 4. Designation Filter
      const matchesDesignation = !selectedDesignation || member.designation.toLowerCase().includes(selectedDesignation.toLowerCase());

      // 5. Letter Filter
      // Remove salutations like "Dr.", "Sh.", "Ms." to filter by actual name
      const cleanName = member.name.replace(/^(Dr\.|Sh\.|Ms\.|Smt\.|Prof\.)\s+/i, '').trim();
      const matchesLetter = !selectedLetter || cleanName.toUpperCase().startsWith(selectedLetter);

      return matchesSearch && matchesCategory && matchesDept && matchesDesignation && matchesLetter;
    });
  }, [faculty, search, selectedCategory, selectedDept, selectedDesignation, selectedLetter]);

  // Grouped Structure for Rendering: Category -> Department -> Faculty Members
  const groupedFaculty = useMemo(() => {
    const structure: Record<string, Record<string, Faculty[]>> = {};

    // Initialize categories
    CATEGORIES.forEach(cat => {
      structure[cat] = {};
    });

    // Populate filtered members
    filteredFaculty.forEach(member => {
      const cat = member.faculty || 'Arts'; // Fallback
      const deptName = typeof member.department === 'object' && member.department !== null 
        ? member.department.name 
        : 'General / Other';

      if (!structure[cat]) {
        structure[cat] = {};
      }
      if (!structure[cat][deptName]) {
        structure[cat][deptName] = [];
      }
      structure[cat][deptName].push(member);
    });

    // Clean up empty departments and empty categories
    const cleaned: Record<string, Record<string, Faculty[]>> = {};
    Object.keys(structure).forEach(cat => {
      const depts = structure[cat];
      const deptKeys = Object.keys(depts);
      if (deptKeys.length > 0) {
        cleaned[cat] = {};
        deptKeys.forEach(dk => {
          if (depts[dk].length > 0) {
            cleaned[cat][dk] = depts[dk];
          }
        });
        if (Object.keys(cleaned[cat]).length === 0) {
          delete cleaned[cat];
        }
      }
    });

    return cleaned;
  }, [filteredFaculty]);

  const breadcrumbs = [{ label: 'Faculty' }];

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedDept('');
    setSelectedDesignation('');
    setSelectedLetter('');
  };

  return (
    <>
      <PageBanner
        title="Enterprise Faculty Directory"
        subtitle="Meet the distinguished scholars, educators, and researchers of NREC College."
        breadcrumbs={breadcrumbs}
      />

      <section className="bg-[#F8F5F0] py-12 relative min-h-screen">
        <div className="container-nrec">
          
          {/* Advanced Search & Filter Dashboard */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E7E7]/60 shadow-[0_4px_30px_rgba(0,0,0,0.02)] mb-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              
              {/* Search Bar */}
              <div className="md:col-span-4 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, research area..."
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8B0E2A] focus:border-[#8B0E2A]"
                />
              </div>

              {/* Filters dropdowns */}
              <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                
                {/* Faculty Category */}
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedDept(''); // Reset dept if category changes
                  }}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-3 text-xs focus:outline-none text-gray-700"
                >
                  <option value="">All Faculties</option>
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>Faculty of {cat}</option>)}
                </select>

                {/* Department */}
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-3 text-xs focus:outline-none text-gray-700"
                >
                  <option value="">All Departments</option>
                  {departments
                    .filter(d => !selectedCategory || d.name.toLowerCase().includes(selectedCategory.toLowerCase()) || faculty.some(f => f.faculty === selectedCategory && (typeof f.department === 'object' ? f.department?._id === d._id : f.department === d._id)))
                    .map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
                </select>

                {/* Designation */}
                <select
                  value={selectedDesignation}
                  onChange={(e) => setSelectedDesignation(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-3 text-xs focus:outline-none text-gray-700"
                >
                  <option value="">All Positions</option>
                  {DESIGNATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>

                {/* Clear Button */}
                <button
                  onClick={clearFilters}
                  className="w-full border border-[#8B0E2A]/20 hover:bg-[#8B0E2A]/5 text-[#8B0E2A] font-bold rounded-xl py-3 text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  Clear Filters
                </button>
              </div>

            </div>

            {/* A-Z Alphabet Strip */}
            <div className="mt-6 pt-6 border-t border-gray-100 overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-1.5 min-w-max pb-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 mr-2 flex items-center gap-1">
                  <ListFilter size={12} /> Filter A-Z:
                </span>
                <button
                  onClick={() => setSelectedLetter('')}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                    !selectedLetter
                      ? 'bg-[#8B0E2A] text-white shadow-sm shadow-[#8B0E2A]/25'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  ALL
                </button>
                {ALPHABET.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setSelectedLetter(letter)}
                    className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                      selectedLetter === letter
                        ? 'bg-[#8B0E2A] text-white shadow-sm shadow-[#8B0E2A]/25'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Loader or Directory Structure */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton h-80 rounded-2xl" />)}
            </div>
          ) : Object.keys(groupedFaculty).length === 0 ? (
            <EmptyState
              title="No Faculty Members Match Your Query"
              description="Try adjusting your filters, search keyword, or clearing filters to browse the complete directory."
              action={
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-[#8B0E2A] text-white rounded-lg font-bold text-xs hover:bg-[#700B22] transition-colors"
                >
                  Clear All Filters
                </button>
              }
            />
          ) : (
            <div className="space-y-16">
              {Object.entries(groupedFaculty).map(([category, depts]) => (
                <div key={category} className="space-y-10">
                  
                  {/* Faculty Category Header */}
                  <div className="flex items-center gap-4">
                    <GraduationCap className="text-[#8B0E2A]" size={28} />
                    <h2 className="font-heading font-black text-2xl sm:text-3xl text-gray-900 uppercase tracking-wide">
                      Faculty of {category}
                    </h2>
                    <div className="flex-grow h-[2px] bg-gradient-to-r from-[#B8860B]/60 via-[#E7E7E7] to-transparent rounded" />
                  </div>

                  {/* Departments within this Faculty */}
                  <div className="space-y-12 pl-2 border-l border-gray-100/60 ml-3">
                    {Object.entries(depts).map(([deptName, members]) => (
                      <div key={deptName} className="space-y-6">
                        
                        {/* Department Subheader */}
                        <div className="flex items-center gap-3">
                          <BookOpen className="text-[#B8860B]" size={18} />
                          <h3 className="font-heading font-bold text-lg text-gray-800">
                            {deptName}
                          </h3>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {members.map((member, idx) => (
                            <ScrollReveal key={member._id} direction="up" delay={0.03 * (idx % 4)} className="h-full">
                              <FacultyCard
                                name={member.name}
                                slug={member.slug}
                                designation={member.designation}
                                department={deptName}
                                facultyCategory={member.faculty}
                                email={member.email}
                                phone={member.phone}
                                specialization={member.specialization}
                                officeHours={member.officeHours}
                                image={member.photo ? uploadsUrl(member.photo) : undefined}
                                className="h-full"
                              />
                            </ScrollReveal>
                          ))}
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
