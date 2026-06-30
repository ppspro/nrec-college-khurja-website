import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Admin from '../models/Admin';
import Settings from '../models/Settings';
import Contact from '../models/Contact';
import Department from '../models/Department';
import Course from '../models/Course';
import Faculty from '../models/Faculty';
import Slider from '../models/Slider';
import Notice from '../models/Notice';
import Event from '../models/Event';
import Download from '../models/Download';
import Curriculum from '../models/Curriculum';
import GalleryAlbum from '../models/GalleryAlbum';
import GalleryImage from '../models/GalleryImage';

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nrec_college');
    console.log('✅ Connected to MongoDB');

    // 1. Create Admin
    let admin = await Admin.findOne({ email: 'admin@nreccollege.ac.in' });
    if (!admin) {
      admin = await Admin.create({
        name: 'NREC Admin',
        email: 'admin@nreccollege.ac.in',
        password: 'admin@123',
      });
      console.log('✅ Admin created: admin@nreccollege.ac.in / admin@123');
    }

    // 2. Settings & Contact
    if (!(await Settings.findOne())) {
      await Settings.create({
        collegeName: 'NREC College',
        tagline: 'Excellence in Education Since 1901',
        address: 'Khurja, Bulandshahr District, Uttar Pradesh - 203131',
        phone: ['+91-5738-200001', '+91-5738-200002'],
        email: ['principal@nreccollege.ac.in', 'info@nreccollege.ac.in'],
        establishedYear: '1901',
        affiliatedTo: 'Chaudhary Charan Singh University, Meerut',
        recognizedBy: ['UGC', 'NAAC'],
      });
      console.log('✅ Settings initialized');
    }

    if (!(await Contact.findOne())) {
      await Contact.create({
        address: 'NREC College, Khurja, Bulandshahr District, Uttar Pradesh - 203131',
        phones: ['+91-5738-200001'],
        emails: ['principal@nreccollege.ac.in', 'info@nreccollege.ac.in'],
      });
      console.log('✅ Contact info initialized');
    }

    // 3. Sliders
    if ((await Slider.countDocuments()) === 0) {
      await Slider.create([
        {
          title: 'Welcome to NREC College',
          subtitle: 'Empowering minds and enriching lives since 1901',
          image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
          linkText: 'Explore Courses',
          linkUrl: '/courses',
          order: 1,
          isActive: true
        },
        {
          title: 'State of the Art Laboratories',
          subtitle: 'Fostering research and technological innovation',
          image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
          linkText: 'Discover Departments',
          linkUrl: '/departments',
          order: 2,
          isActive: true
        }
      ]);
      console.log('✅ Hero sliders created');
    }

    // 4. Department & Course
    let dept = await Department.findOne({ $or: [{ code: 'CS' }, { slug: 'computer-science' }] });
    if (!dept) {
      dept = await Department.create({
        name: 'Computer Science & IT',
        slug: 'computer-science',
        code: 'CS',
        description: 'Department of Computer Science and Information Technology providing top tier computing education.',
        hodName: 'Dr. Rajesh Sharma',
        facilities: ['High-speed Wi-Fi', 'AI Research Lab', 'Cloud Computing Server Room'],
        laboratories: ['Software Engineering Lab', 'Networking Lab']
      });
      console.log('✅ Department created: Computer Science');
    }

    let course = await Course.findOne({ $or: [{ code: 'BCA' }, { slug: 'bca' }] });
    if (!course) {
      course = await Course.create({
        name: 'Bachelor of Computer Applications',
        slug: 'bca',
        code: 'BCA',
        department: dept._id,
        duration: '3 Years (6 Semesters)',
        eligibility: '10+2 with Mathematics or Computer Applications',
        description: 'Comprehensive undergraduate program focusing on modern software development and computer systems.'
      });
      console.log('✅ Course created: BCA');
    }

    // 5. Faculty
    let faculty = await Faculty.findOne({ email: 'dr.sharma@nreccollege.ac.in' });
    if (!faculty) {
      faculty = await Faculty.create({
        name: 'Dr. Rajesh Sharma',
        email: 'dr.sharma@nreccollege.ac.in',
        designation: 'Head of Department',
        qualification: 'Ph.D in Computer Science',
        department: dept._id,
        specialization: ['Database Systems', 'Software Engineering'],
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      });
      console.log('✅ Faculty created: Dr. Rajesh Sharma');
    }

    // 6. Notices
    if ((await Notice.countDocuments()) === 0) {
      await Notice.create([
        {
          title: 'Annual Academic Calendar 2026-2027 Released',
          category: 'Academic',
          content: 'The official academic calendar for the upcoming session has been published. Please download the document below for details.',
          isPinned: true,
          publishDate: new Date(),
          attachment: '/uploads/sample_academic_calendar.pdf'
        },
        {
          title: 'Campus Administrative Guidelines Updated',
          category: 'Administrative',
          content: 'Updated campus guidelines and administrative schedule have been issued for all faculty and staff.',
          isPinned: false,
          publishDate: new Date()
        }
      ]);
      console.log('✅ Notices created');
    }

    // 7. Events
    if ((await Event.countDocuments()) === 0) {
      await Event.create([
        {
          title: 'National Conference on Advances in Computing (NCAC 2026)',
          slug: 'national-conference-advances-computing-2026',
          description: 'Join industry experts and researchers for a two-day conference on AI, Quantum Computing, and Cybersecurity.',
          startDate: new Date(Date.now() + 86400000 * 7),
          endDate: new Date(Date.now() + 86400000 * 9),
          location: 'Main College Auditorium',
          coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
          isFeatured: true
        }
      ]);
      console.log('✅ Events created');
    }

    // 8. Gallery Albums & Images
    if ((await GalleryAlbum.countDocuments()) === 0) {
      const album = await GalleryAlbum.create({
        title: 'Annual Sports Meet 2026',
        slug: 'annual-sports-meet-2026',
        description: 'Highlights from the inter-college athletics tournament.',
        coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80'
      });
      await GalleryImage.create([
        {
          album: album._id,
          title: '100m Sprint Final',
          url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80'
        },
        {
          album: album._id,
          title: 'Basketball Championship Ceremony',
          url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80'
        }
      ]);
      console.log('✅ Gallery album and images created');
    }

    // 9. Downloads
    if ((await Download.countDocuments()) === 0) {
      await Download.create([
        {
          title: 'College Prospectus 2026',
          category: 'Prospectus',
          description: 'Complete guide to courses, admissions, and facilities at NREC College.',
          file: '/uploads/sample_prospectus.pdf',
          fileType: 'PDF',
          fileSize: '2.4 MB'
        }
      ]);
      console.log('✅ Downloads created');
    }

    // 10. Curriculum
    if ((await Curriculum.countDocuments()) === 0) {
      await Curriculum.create([
        {
          title: 'BCA Semester 1 Syllabus',
          faculty: 'Computer Science',
          department: dept._id,
          course: course._id,
          semesterYear: 'Semester 1',
          pdfFile: '/uploads/bca_sem1_syllabus.pdf'
        }
      ]);
      console.log('✅ Curriculum created');
    }

    console.log('🎉 Version 1.0 Seeding complete with rich sample data!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seed();
