// ========= Core Types =========

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

// ========= Settings =========
export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
}

export interface Settings {
  _id: string;
  collegeName: string;
  tagline: string;
  logo: string;
  favicon: string;
  address: string;
  phone: string[];
  email: string[];
  website: string;
  footerText: string;
  footerLinks: { label: string; url: string }[];
  socialLinks: SocialLinks;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  googleMapEmbed: string;
  establishedYear: string;
  affiliatedTo: string;
  recognizedBy: string[];
}

// ========= Slider =========
export interface Slider {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  order: number;
  isActive: boolean;
}

// ========= Department =========
export interface Department {
  _id: string;
  name: string;
  slug: string;
  shortName: string;
  description: string;
  image: string;
  icon: string;
  headOfDepartment: string;
  establishedYear: string;
  vision: string;
  mission: string;
  objectives: string[];
  facilities: string[];
  achievements: string[];
  order: number;
  isActive: boolean;
}

// ========= Course =========
export type CourseLevel = 'UG' | 'PG' | 'Diploma' | 'Certificate' | 'PhD';
export type CourseType = 'Regular' | 'Self-Finance' | 'Distance';

export interface Course {
  _id: string;
  name: string;
  slug: string;
  code: string;
  department: Department | string;
  level: CourseLevel;
  type: CourseType;
  duration: string;
  totalSeats: number;
  description: string;
  eligibility: string;
  feeStructure: string;
  syllabus: string;
  image: string;
  highlights: string[];
  careerProspects: string[];
  order: number;
  isActive: boolean;
  isFeatured: boolean;
}

// ========= Faculty =========
export interface Faculty {
  _id: string;
  name: string;
  slug: string;
  designation: string;
  qualification: string;
  department: Department | string;
  faculty: string;
  email: string;
  phone: string;
  photo: string;
  biography: string;
  specialization: string[];
  experience: string;
  publications: string[];
  officeHours?: string;
  order: number;
  isActive: boolean;
}

// ========= Notice =========
export type NoticeCategory = 'General' | 'Examination' | 'Admission' | 'Academic' | 'Administrative' | 'Scholarship' | 'Sports' | 'Cultural';

export interface Notice {
  _id: string;
  title: string;
  content: string;
  category: NoticeCategory;
  attachment: string;
  isPinned: boolean;
  isActive: boolean;
  expiryDate: string | null;
  publishDate: string;
  createdAt: string;
}

// ========= News =========
export interface News {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  publishDate: string;
  author: string;
  createdAt: string;
}

// ========= Event =========
export interface Event {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  venue: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  category: string;
  registrationLink: string;
  isPublished: boolean;
  isFeatured: boolean;
}

// ========= Curriculum =========
export interface Curriculum {
  _id: string;
  title: string;
  faculty: string;
  department: Department | string;
  course: Course | string;
  semesterYear: string;
  pdfFile: string;
  isActive: boolean;
  updatedAt: string;
}

// ========= Download =========
export type DownloadCategory =
  | 'Prospectus'
  | 'Academic Calendar'
  | 'Examination Forms'
  | 'NAAC Documents'
  | 'NIRF Documents'
  | 'Annual Reports'
  | 'Admission Forms'
  | 'Miscellaneous';

export interface Download {
  _id: string;
  title: string;
  description: string;
  category: DownloadCategory;
  file: string;
  fileType: string;
  fileSize: string;
  isActive: boolean;
  order: number;
  createdAt: string;
}

// ========= Gallery =========
export interface GalleryAlbum {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  type: 'photo' | 'video';
  isActive: boolean;
  order: number;
}

export interface GalleryImage {
  _id: string;
  album: string;
  title: string;
  description: string;
  image: string;
  thumbnail: string;
  videoUrl: string;
  order: number;
}

// ========= Contact =========
export interface Contact {
  _id: string;
  address: string;
  phones: string[];
  emails: string[];
  googleMapEmbed: string;
  googleMapLink: string;
  officeHours: string;
  socialLinks: SocialLinks;
}

// ========= Page =========
export interface Page {
  _id: string;
  key: string;
  title: string;
  bannerImage: string;
  bannerTitle: string;
  bannerSubtitle: string;
  sections: Record<string, unknown>;
  seoTitle: string;
  seoDescription: string;
}

// ========= Admin =========
export interface Admin {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// ========= Pagination =========
export interface Pagination {
  total: number;
  page: number;
  pages: number;
  limit: number;
}
