import type { Metadata } from 'next';
import HeroSlider from '@/components/sections/HeroSlider';
import WelcomeSection from '@/components/sections/WelcomeSection';
import PrincipalMessage from '@/components/sections/PrincipalMessage';
import CollegeStats from '@/components/sections/CollegeStats';
import DepartmentsSection from '@/components/sections/DepartmentsSection';
import FeaturedCourses from '@/components/sections/FeaturedCourses';
import LatestNotices from '@/components/sections/LatestNotices';
import LatestNews from '@/components/sections/LatestNews';
import UpcomingEvents from '@/components/sections/UpcomingEvents';
import CampusGallery from '@/components/sections/CampusGallery';
import Testimonials from '@/components/sections/Testimonials';
import CallToAction from '@/components/sections/CallToAction';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchData<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${endpoint}`, {
      next: { revalidate: 300 }, // ISR: revalidate every 5 minutes
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

export const metadata: Metadata = {
  title: 'NREC College Khurja | Excellence in Education Since 1901',
  description:
    'Welcome to NREC College, Khurja — a premier institution of higher education in Uttar Pradesh. Established in 1901, affiliated to CCS University, Meerut.',
};

export default async function HomePage() {
  const [sliders, departments, courses, notices, news, events, gallery, albums] = await Promise.allSettled([
    fetchData<{ sliders: unknown[] }>('/settings/sliders'),
    fetchData<{ departments: unknown[] }>('/departments'),
    fetchData<{ courses: unknown[] }>('/courses?featured=true&limit=6'),
    fetchData<{ notices: unknown[] }>('/notices?limit=7'),
    fetchData<{ news: unknown[] }>('/news?limit=3&featured=true'),
    fetchData<{ events: unknown[] }>('/events?upcoming=true&limit=4'),
    fetchData<{ images: unknown[] }>('/gallery/featured'),
    fetchData<{ albums: unknown[] }>('/gallery'),
  ]);

  const slidersData = sliders.status === 'fulfilled' && sliders.value ? (sliders.value as { sliders: never[] }).sliders : [];
  const departmentsData = departments.status === 'fulfilled' && departments.value ? (departments.value as { departments: never[] }).departments : [];
  const coursesData = courses.status === 'fulfilled' && courses.value ? (courses.value as { courses: never[] }).courses : [];
  const noticesData = notices.status === 'fulfilled' && notices.value ? (notices.value as { notices: never[] }).notices : [];
  const newsData = news.status === 'fulfilled' && news.value ? (news.value as { news: never[] }).news : [];
  const eventsData = events.status === 'fulfilled' && events.value ? (events.value as { events: never[] }).events : [];
  const galleryData = gallery.status === 'fulfilled' && gallery.value ? (gallery.value as { images: never[] }).images : [];
  const albumsData = albums.status === 'fulfilled' && albums.value ? (albums.value as { albums: never[] }).albums : [];

  return (
    <>
      <HeroSlider sliders={slidersData} />
      <CollegeStats />
      <PrincipalMessage />
      <WelcomeSection />
      <DepartmentsSection departments={departmentsData} />
      <FeaturedCourses courses={coursesData} />
      <LatestNews news={newsData} />
      <LatestNotices notices={noticesData} />
      <UpcomingEvents events={eventsData} />
      <CampusGallery images={galleryData} albums={albumsData} />
      <Testimonials />
      <CallToAction />
    </>
  );
}
