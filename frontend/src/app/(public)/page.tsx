'use client';

import { useState, useEffect } from 'react';
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
import { API_URL as API } from '@/lib/api';

async function fetchClientData(endpoint: string) {
  try {
    const res = await fetch(`${API}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({
    homeData: {},
    slidersData: [],
    departmentsData: [],
    coursesData: [],
    noticesData: [],
    newsData: [],
    eventsData: [],
    galleryData: [],
    albumsData: [],
  });

  useEffect(() => {
    Promise.allSettled([
      fetchClientData('/pages/home'),
      fetchClientData('/settings/sliders'),
      fetchClientData('/departments'),
      fetchClientData('/courses?featured=true&limit=6'),
      fetchClientData('/notices?limit=7'),
      fetchClientData('/news?limit=3&featured=true'),
      fetchClientData('/events?upcoming=true&limit=4'),
      fetchClientData('/gallery/images/all'),
      fetchClientData('/gallery'),
    ]).then(([homePage, sliders, departments, courses, notices, news, events, gallery, albums]) => {
      setData({
        homeData: homePage.status === 'fulfilled' && homePage.value ? (homePage.value as any).page?.sections : {},
        slidersData: sliders.status === 'fulfilled' && sliders.value ? (sliders.value as any).sliders : [],
        departmentsData: departments.status === 'fulfilled' && departments.value ? (departments.value as any).departments : [],
        coursesData: courses.status === 'fulfilled' && courses.value ? (courses.value as any).courses : [],
        noticesData: notices.status === 'fulfilled' && notices.value ? (notices.value as any).notices : [],
        newsData: news.status === 'fulfilled' && news.value ? (news.value as any).news : [],
        eventsData: events.status === 'fulfilled' && events.value ? (events.value as any).events : [],
        galleryData: gallery.status === 'fulfilled' && gallery.value ? (gallery.value as any).images : [],
        albumsData: albums.status === 'fulfilled' && albums.value ? (albums.value as any).albums : [],
      });
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] flex flex-col justify-center items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#8B0E2A] border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 font-medium text-sm">Loading NREC College Homepage...</p>
      </div>
    );
  }

  return (
    <>
      <HeroSlider sliders={data.slidersData} />
      <CollegeStats stats={data.homeData?.stats} />
      <PrincipalMessage message={data.homeData?.principalMessage} />
      <WelcomeSection welcome={data.homeData?.welcome} />
      <DepartmentsSection departments={data.departmentsData} />
      <FeaturedCourses courses={data.coursesData} />
      <LatestNews news={data.newsData} />
      <LatestNotices notices={data.noticesData} />
      <UpcomingEvents events={data.eventsData} />
      <CampusGallery images={data.galleryData} albums={data.albumsData} />
      <Testimonials testimonials={data.homeData?.testimonials} />
      <CallToAction callToAction={data.homeData?.callToAction} />
    </>
  );
}
