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
import Page from '../models/Page';

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

    const otherDepts = [
      { name: 'Physics', slug: 'physics', code: 'PHYS', hod: 'Dr. A. K. Tomar' },
      { name: 'Chemistry', slug: 'chemistry', code: 'CHEM', hod: 'Dr. Sandeep Gupta' },
      { name: 'Mathematics', slug: 'mathematics', code: 'MATH', hod: 'Dr. S. K. Aggarwal' },
      { name: 'Botany', slug: 'botany', code: 'BOT', hod: 'Dr. P. K. Singhal' },
      { name: 'Zoology', slug: 'zoology', code: 'ZOOL', hod: 'Dr. Rashmi Sharma' },
      { name: 'Commerce', slug: 'commerce', code: 'COMM', hod: 'Dr. Vivek Mittal' },
      { name: 'Hindi', slug: 'hindi', code: 'HIND', hod: 'Dr. R. P. Singh' },
      { name: 'English', slug: 'english', code: 'ENGL', hod: 'Dr. Seema Sharma' },
      { name: 'History', slug: 'history', code: 'HIST', hod: 'Dr. K. C. Sharma' },
      { name: 'Economics', slug: 'economics', code: 'ECON', hod: 'Dr. Neeraj Kumar' },
      { name: 'Political Science', slug: 'political-science', code: 'POLS', hod: 'Dr. Alka Gupta' }
    ];

    for (const d of otherDepts) {
      let existing = await Department.findOne({ slug: d.slug });
      if (!existing) {
        await Department.create({
          name: d.name,
          slug: d.slug,
          code: d.code,
          description: `Department of ${d.name} offering comprehensive undergraduate and postgraduate programs.`,
          hodName: d.hod,
          facilities: ['Departmental Library', 'Seminar Room'],
          laboratories: d.slug === 'chemistry' || d.slug === 'physics' || d.slug === 'botany' || d.slug === 'zoology' ? ['Practical Lab', 'Research Lab'] : []
        });
        console.log(`✅ Department created: ${d.name}`);
      }
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

    // 11. Create Default Home Page
    let homePage = await Page.findOne({ key: 'home' });
    if (!homePage) {
      await Page.create({
        key: 'home',
        title: 'Home',
        sections: {
          welcome: {
            title: 'Welcome to NREC College',
            subtitle: 'A Legacy of Excellence since 1901',
            paragraphs: [
              'NREC College, Khurja is one of the oldest and most prestigious institutions of higher learning in Uttar Pradesh. Established in 1901, the college has been a beacon of academic excellence, catering to the educational needs of the region.',
              'With a rich history spanning over a century, NREC College continues to provide top-tier instruction in Arts, Science, Commerce, and computing fields.'
            ]
          },
          principalMessage: {
            name: 'Dr. Principal Name',
            designation: 'Principal',
            quote: 'Education is the most powerful weapon which you can use to change the world.',
            image: '/images/principal.png',
            paragraphs: [
              'It is my privilege to welcome you to NREC College. Our institution is dedicated to academic rigor, personal growth, and social responsibility.',
              'We prepare our students to lead, innovate, and excel in a rapidly changing global landscape.'
            ]
          },
          stats: [
            { label: 'Students Enrolled', value: '5,000+' },
            { label: 'Faculty Members', value: '150+' },
            { label: 'Years of Legacy', value: '120+' },
            { label: 'Academic Programs', value: '45+' }
          ],
          callToAction: {
            title: 'Ready to Join Our Campus?',
            subtitle: 'Admissions are open for the current academic session. Apply today to secure your future.',
            stats: []
          },
          testimonials: [
            {
              name: 'Alumni Student',
              role: 'BCA Batch of 2024',
              quote: 'My years at NREC College were transformative. The faculty guided me every step of the way, helping me land a software engineering role.'
            }
          ]
        }
      });
      console.log('✅ Home page seeded');
    }

    // 12. Create all other dynamic pages
    const pagesToSeed = [
      {
        key: 'about',
        title: 'About NREC College',
        bannerTitle: 'About Us',
        bannerSubtitle: 'Established in 1901 — serving academic excellence for over a century',
        seoTitle: 'About NREC College Khurja | History and Legacy',
        seoDescription: 'Learn about the history, heritage, and values of NREC College, Khurja.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Our Heritage & Legacy',
              label: 'WHO WE ARE',
              align: 'left',
              content: `
                <p>Naththi Mal Ram Sahai Mal Edward Coronation Post Graduate College (N.R.E.C. College), Khurja is one of the oldest and largest colleges in Uttar Pradesh. Established in 1901 as a school and later upgraded to a Degree College, it has completed more than 120 years of glorious service in the field of higher education.</p>
                <p>The college is affiliated with Chaudhary Charan Singh (CCS) University, Meerut, and is recognized by the University Grants Commission (UGC) under Section 2(f) and 12(B). It offers undergraduate, postgraduate, and doctoral research programs across Science, Arts, Commerce, Law, and Teacher Education.</p>
              `
            }
          }
        ]
      },
      {
        key: 'history',
        title: 'History & Milestones',
        bannerTitle: 'Our History',
        bannerSubtitle: 'Tracing the glorious journey of NREC College from 1901 to present',
        seoTitle: 'History of NREC College Khurja | Over 120 Years of Legacy',
        seoDescription: 'Discover the rich history of NREC College, established during the coronation of King Edward VII.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'A Journey Through Time',
              label: 'HISTORICAL JOURNEY',
              align: 'left',
              content: `
                <p>NREC College owes its existence to the visionary benevolence of local philanthropists who sought to bring modern education to the region of Khurja. The institution was founded in 1901 to commemorate the coronation of King Edward VII and was originally named Coronation High School.</p>
                <p>Over the decades, the school grew progressively into an Intermediate College and eventually a Post Graduate College, serving thousands of rural and semi-urban students every year. Today, it stands as a monument to community service and academic aspiration.</p>
              `
            }
          },
          {
            type: 'Timeline',
            isActive: true,
            data: {
              title: 'NREC Legacy Timeline',
              subtitle: 'KEY MILESTONES',
              items: [
                {
                  year: '1901',
                  title: 'Coronation High School Foundation',
                  description: 'Established to commemorate the coronation of King Edward VII, bringing modern schooling to Khurja.'
                },
                {
                  year: '1946',
                  title: 'Degree College Upgrade',
                  description: 'Upgraded to a degree college offering undergraduate studies in Arts, Science, and Commerce.'
                },
                {
                  year: '1951',
                  title: 'Post Graduate Status',
                  description: 'Began offering master degrees and research opportunities in several traditional subjects.'
                },
                {
                  year: 'Present',
                  title: 'Modern Higher Learning Hub',
                  description: 'Affiliated with CCS University, Meerut, catering to over 5,000+ active students with professional self-financed and regular streams.'
                }
              ]
            }
          }
        ]
      },
      {
        key: 'vision-mission',
        title: 'Vision & Mission',
        bannerTitle: 'Vision & Mission',
        bannerSubtitle: 'Our guiding principles and aspirations for the future of education',
        seoTitle: 'Vision and Mission | NREC College Khurja',
        seoDescription: 'Read the vision, mission and core values of NREC College Khurja.',
        sections: [
          {
            type: 'CardsGrid',
            isActive: true,
            data: {
              title: 'Our Goals & Values',
              subtitle: 'GUIDING PRINCIPLES',
              columns: 2,
              style: 'icon',
              cards: [
                {
                  title: 'Our Vision',
                  description: 'To emerge as a center of excellence in higher education, fostering intellectual growth, moral integrity, and social responsibility among students to serve the nation and humanity.',
                  icon: 'GraduationCap',
                  highlight: true
                },
                {
                  title: 'Our Mission',
                  description: 'To provide quality, affordable, and inclusive education; to promote research, critical thinking, and technological innovation; and to empower students with skills for a progressive global society.',
                  icon: 'Award',
                  highlight: false
                }
              ]
            }
          }
        ]
      },
      {
        key: 'principal-message',
        title: 'Principal\'s Message',
        bannerTitle: 'Message from the Principal\'s Desk',
        bannerSubtitle: 'Welcoming the new generation of leaders and innovators',
        seoTitle: 'Principal Message | NREC College Khurja',
        seoDescription: 'Read the welcome message from the Principal of NREC College, Khurja.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Warm Welcome to NREC College',
              label: 'LEADERSHIP MESSAGE',
              align: 'left',
              content: `
                <p>Dear Students, Parents, and Well-wishers,</p>
                <p>It is my absolute privilege to welcome you to NREC College, Khurja. Since 1901, our institution has stood as a beacon of academic pursuit, helping students realize their full potential and transform into responsible citizens.</p>
                <p>We strive to provide a holistic environment where character building, modern technical skills, and academic rigor go hand-in-hand. I encourage all our students to actively engage in both academic and extra-curricular activities, making full use of our campus libraries, labs, and sports facilities.</p>
                <p>Best wishes for your future endeavors!</p>
                <p><strong>Prof. K.D. Sharma</strong><br/>Principal, NREC College</p>
              `
            }
          }
        ]
      },
      {
        key: 'management',
        title: 'College Management',
        bannerTitle: 'Our Management',
        bannerSubtitle: 'The governing body guiding NREC College towards its vision',
        seoTitle: 'College Management Governing Body | NREC College Khurja',
        seoDescription: 'Meet the governing body and management committee of NREC College.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Governing Committee & Trustees',
              label: 'COLLEGE LEADERSHIP',
              align: 'left',
              content: `
                <p>NREC College is governed by a dedicated Management Committee consisting of experienced educationists, public representatives, and descendants of the founding philanthropic families. The committee is committed to ensuring academic autonomy, maintaining quality infrastructure, and upgrading research facilities.</p>
                <p>Under their guidance, the college continues to expand its catalog of modern professional courses and implement UGC guidelines for student-centric education.</p>
              `
            }
          }
        ]
      },
      {
        key: 'admissions',
        title: 'Admissions Overview',
        bannerTitle: 'Campus Admissions',
        bannerSubtitle: 'Explore admission guidelines, fee structures, and course brochures',
        seoTitle: 'Admissions 2026-2027 | NREC College Khurja',
        seoDescription: 'Find general admission details, guidelines, and online application links for NREC College.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Begin Your Journey With Us',
              label: 'ADMISSION GUIDELINES',
              align: 'left',
              content: `
                <p>Admission to NREC College is conducted strictly in accordance with Chaudhary Charan Singh (CCS) University, Meerut rules and state government merit guidelines.</p>
                <p>Students must register on the CCS University admission portal and select NREC College, Khurja as their preferred institution. Subsequent merit lists will be published on the college website notice board and on campus.</p>
              `
            }
          }
        ]
      },
      {
        key: 'admission-process',
        title: 'Admission Process',
        bannerTitle: 'Step-by-Step Admission Process',
        bannerSubtitle: 'Simple guide to securing your seat at NREC College',
        seoTitle: 'Admission Process | NREC College Khurja',
        seoDescription: 'Understand the step-by-step procedure for securing admissions at NREC College.',
        sections: [
          {
            type: 'CardsGrid',
            isActive: true,
            data: {
              title: 'Four Simple Steps to Join NREC',
              subtitle: 'ADMISSION ROADMAP',
              columns: 4,
              style: 'numbered',
              cards: [
                {
                  title: 'Apply Online',
                  description: 'Register on the CCS University admission portal and choose NREC College Khurja as your choice.',
                  highlight: false
                },
                {
                  title: 'Document Verification',
                  description: 'Visit the college campus with your original documents for verification once shortlisted.',
                  highlight: false
                },
                {
                  title: 'Merit List',
                  description: 'Check the published merit lists on our website notice board or campus notice boards.',
                  highlight: true
                },
                {
                  title: 'Admission Confirmation',
                  description: 'Pay the tuition fees online/offline and collect your college ID card and fee receipt.',
                  highlight: false
                }
              ]
            }
          }
        ]
      },
      {
        key: 'fee-structure',
        title: 'Fee Structure',
        bannerTitle: 'Annual Fees Details',
        bannerSubtitle: 'Transparent fee schedule for UG, PG, and Professional courses',
        seoTitle: 'Fee Structure | NREC College Khurja',
        seoDescription: 'Get details about tuition fees, examination charges, and laboratory fees for all programs.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Program-wise Tuition & Campus Fees',
              label: 'FINANCIAL DETAILS',
              align: 'left',
              content: `
                <p>NREC College is a government-aided institution, ensuring extremely affordable and subsidized education for all sections of society.</p>
                <table class="min-w-full border-collapse border border-gray-200 mt-4 text-left">
                  <thead>
                    <tr class="bg-gray-100">
                      <th class="border border-gray-200 px-4 py-2">Course Name</th>
                      <th class="border border-gray-200 px-4 py-2">Annual Fees (approx)</th>
                      <th class="border border-gray-200 px-4 py-2">Registration Mode</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-gray-200 px-4 py-2">B.A. / B.Com / B.Sc (Regular)</td>
                      <td class="border border-gray-200 px-4 py-2">Rs. 2,000 - 3,500</td>
                      <td class="border border-gray-200 px-4 py-2">CCS University Portal</td>
                    </tr>
                    <tr>
                      <td class="border border-gray-200 px-4 py-2">BCA / BBA (Self-Finance)</td>
                      <td class="border border-gray-200 px-4 py-2">Rs. 25,000 - 30,000</td>
                      <td class="border border-gray-200 px-4 py-2">Direct Merit / CCS Portal</td>
                    </tr>
                    <tr>
                      <td class="border border-gray-200 px-4 py-2">M.A. / M.Sc / M.Com (Regular)</td>
                      <td class="border border-gray-200 px-4 py-2">Rs. 3,000 - 5,000</td>
                      <td class="border border-gray-200 px-4 py-2">University Merit</td>
                    </tr>
                  </tbody>
                </table>
              `
            }
          }
        ]
      },
      {
        key: 'prospectus',
        title: 'Prospectus & Admission Brochures',
        bannerTitle: 'Brochures & Guides',
        bannerSubtitle: 'Download full handbook for courses, eligibility rules, and sports regulations',
        seoTitle: 'Prospectus Download | NREC College Khurja',
        seoDescription: 'Download the official prospectus and brochures for NREC College.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Download Handbook',
              label: 'RESOURCES',
              align: 'left',
              content: `
                <p>The college prospectus provides deep insight into student codes of conduct, exam calendars, subject combinations, and library norms.</p>
                <p><a href="/downloads" class="text-[#8B0E2A] font-bold hover:underline">Click here to go to the Downloads page</a> to retrieve the PDF copies of the Prospectus 2026 and admission form guidelines.</p>
              `
            }
          }
        ]
      },
      {
        key: 'academic-calendar',
        title: 'Academic Calendar',
        bannerTitle: 'Academic Calendar',
        bannerSubtitle: 'Important dates, exams, holidays, and college festival schedules',
        seoTitle: 'Academic Calendar 2026-2027 | NREC College Khurja',
        seoDescription: 'View the official university academic calendar and campus schedules.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Academic Session Timeline',
              label: 'SCHEDULE',
              align: 'left',
              content: `
                <p>Academic calendars are strictly synchronized with the annual planner issued by CCS University, Meerut. Below are the key expected highlights:</p>
                <ul>
                  <li><strong>Odd Semester Classes Begin:</strong> August 2026</li>
                  <li><strong>Mid-Semester Internal Exams:</strong> October 2026</li>
                  <li><strong>Odd Semester Main Examinations:</strong> December 2026</li>
                  <li><strong>Even Semester Classes Begin:</strong> January 2027</li>
                  <li><strong>Even Semester Main Examinations:</strong> May 2027</li>
                </ul>
              `
            }
          }
        ]
      },
      {
        key: 'results',
        title: 'Examination Results',
        bannerTitle: 'Results & Merit Lists',
        bannerSubtitle: 'Get links to university marks sheets and class results portals',
        seoTitle: 'Results | NREC College Khurja',
        seoDescription: 'Find university exam results links and intermediate semester results declarations.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'University Result Portals',
              label: 'EXAMS',
              align: 'left',
              content: `
                <p>Semester-end and annual exam results are announced directly on the CCS University examination portal.</p>
                <p>Please keep your Roll Number or Enrollment Number ready and visit the official CCS University results page to verify your mark sheet. Merit lists for PG admissions will be displayed under the website notices section.</p>
              `
            }
          }
        ]
      },
      {
        key: 'scholarship',
        title: 'Scholarships & Student Aid',
        bannerTitle: 'Scholarship Programs',
        bannerSubtitle: 'Financial aid and state government scholarships supporting students',
        seoTitle: 'Scholarships for Students | NREC College Khurja',
        seoDescription: 'Find details about UP State Scholarship, National Scholarship Portal (NSP), and other fee concessions.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Financial Concessions & Government Aids',
              label: 'SCHOLARSHIPS',
              align: 'left',
              content: `
                <p>NREC College assists eligible SC, ST, OBC, General (EWS), and Minority students in securing tuition fee reimbursements under the Uttar Pradesh State Scholarship Scheme (UP Scholarship Portal).</p>
                <p>Students must apply online on the UP Government portal and submit the printed copy along with income certificates and mark sheets to the college scholarship counter for verification.</p>
              `
            }
          }
        ]
      },
      {
        key: 'placements',
        title: 'Placements & Career Guidance',
        bannerTitle: 'Placements',
        bannerSubtitle: 'Career guidance cell bridging the gap between education and industry',
        seoTitle: 'Placements Cell | NREC College Khurja',
        seoDescription: 'Read about campus recruitment, top hiring companies, and placement reports.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Campus Recruitment & Industry Ties',
              label: 'CAREERS',
              align: 'left',
              content: `
                <p>The NREC Placement and Career Counseling Cell organizes regular workshops, resume-building sessions, and mock interviews for final-year students. Companies from IT, banking, and pharmaceutical sectors regularly participate in job fairs organized on campus.</p>
                <p>Many students from BCA, Science, and Commerce departments have successfully built careers in leading organizations.</p>
              `
            }
          }
        ]
      },
      {
        key: 'anti-ragging',
        title: 'Anti-Ragging Regulations',
        bannerTitle: 'Zero Tolerance Policy',
        bannerSubtitle: 'A safe, inclusive, and friendly environment for all students',
        seoTitle: 'Anti Ragging Cell Helpline | NREC College Khurja',
        seoDescription: 'Read the anti-ragging guidelines, committee contacts and UGC regulations.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Anti-Ragging Committee & Toll-Free Helpline',
              label: 'STUDENT SAFETY',
              align: 'left',
              content: `
                <p>Ragging in any form is strictly banned inside and outside the college campus. The college follows a zero-tolerance policy against ragging as per UGC and Supreme Court regulations.</p>
                <p>If you encounter or witness any incident of ragging, please report it immediately to the Proctorial Board or call the national toll-free helpline. Anti-ragging affidavits are mandatory for all students during admission.</p>
              `
            }
          }
        ]
      },
      {
        key: 'library',
        title: 'College Central Library',
        bannerTitle: 'Central Library',
        bannerSubtitle: 'Over 1,00,000 books, rare archives, and digital database services',
        seoTitle: 'Central Library Resources | NREC College Khurja',
        seoDescription: 'Explore the central library, digital e-journals, reading halls and textbook collections.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Information Hub of NREC Campus',
              label: 'LEARNING CENTERS',
              align: 'left',
              content: `
                <p>The Central Library at NREC College is equipped with a vast collection of text books, reference manuals, research journals, and rare manuscripts dating back to the early 20th century.</p>
                <p>The library features a spacious reading room and provides access to digital resources through the INFLIBNET N-LIST database, allowing researchers and students to browse thousands of international journals and e-books online.</p>
              `
            }
          }
        ]
      },
      {
        key: 'facilities',
        title: 'Campus Infrastructure & Facilities',
        bannerTitle: 'Campus Facilities',
        bannerSubtitle: 'Modern computer centers, science laboratories, hostels, and cafeteria',
        seoTitle: 'Campus Facilities | NREC College Khurja',
        seoDescription: 'Read about state-of-the-art computer labs, seminar halls, sports fields, and hostels.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Modern Learning Environment',
              label: 'INFRASTRUCTURE',
              align: 'left',
              content: `
                <p>Our campus spans across a lush green area, providing a serene environment for higher studies. Key facilities include:</p>
                <ul>
                  <li><strong>Science Laboratories:</strong> Specialized labs for Physics, Chemistry, Zoology, and Botany.</li>
                  <li><strong>Computer Center:</strong> High-speed Wi-Fi enabled labs for computing and programming classes.</li>
                  <li><strong>Hostel Accommodation:</strong> Affordable lodging for outstation students with dining hall facilities.</li>
                  <li><strong>Seminar Halls:</strong> Audio-visual halls for guest lectures and national conferences.</li>
                </ul>
              `
            }
          }
        ]
      },
      {
        key: 'sports',
        title: 'Sports & Athletics',
        bannerTitle: 'Sports & Games Division',
        bannerSubtitle: 'Promoting physical wellness, team spirit, and university championships',
        seoTitle: 'Sports and Athletics Club | NREC College Khurja',
        seoDescription: 'Explore the sports playgrounds, gymnasiums, and annual sports meet schedules.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Excellence Beyond Classroom',
              label: 'PHYSICAL WELLNESS',
              align: 'left',
              content: `
                <p>NREC College emphasizes both physical fitness and sportsmanship. The college campus features a large playground for athletics, football, cricket, and specialized courts for basketball and volleyball.</p>
                <p>Our students regularly win medals at inter-university tournaments and state-level athletics championships under the training of dedicated physical education coaches.</p>
              `
            }
          }
        ]
      },
      {
        key: 'governing-body',
        title: 'Governing Body',
        bannerTitle: 'Governing Committee',
        bannerSubtitle: 'The governing council directing the academic and developmental policies of NREC',
        seoTitle: 'Governing Body Committee | NREC College Khurja',
        seoDescription: 'Meet the executive governing body and committee members of NREC College, Khurja.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Governing Council Members',
              label: 'ADMINISTRATION',
              align: 'left',
              content: `
                <p>NREC College is guided by a supreme governing council representing trustees, government bodies, and senior educationists.</p>
                <ul>
                  <li><strong>President:</strong> Shri Harish Chandra Gupta</li>
                  <li><strong>Honorary Secretary:</strong> Shri Anil Kumar Gupta</li>
                  <li><strong>Treasurer:</strong> Shri Manoj Kumar Gupta</li>
                  <li><strong>Member (UGC Nominee):</strong> Prof. Dr. S. K. Jain</li>
                  <li><strong>Member (State Govt. Nominee):</strong> Joint Director, Higher Education, UP</li>
                </ul>
              `
            }
          }
        ]
      },
      {
        key: 'iqac',
        title: 'Internal Quality Assurance Cell (IQAC)',
        bannerTitle: 'Internal Quality Assurance Cell',
        bannerSubtitle: 'Maintaining, assessing and enhancing the quality of academic instruction',
        seoTitle: 'Internal Quality Assurance Cell (IQAC) | NREC College Khurja',
        seoDescription: 'Learn about the IQAC cell, quality initiatives, objectives, and committee details.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Objectives & Functions of IQAC',
              label: 'QUALITY CELL',
              align: 'left',
              content: `
                <p>The IQAC cell at NREC College was established in accordance with NAAC guidelines to ensure continuous post-accreditation quality improvement.</p>
                <p><strong>Primary Objectives:</strong></p>
                <ul>
                  <li>To develop a system for conscious, consistent and catalytic improvement in the overall performance of the institution.</li>
                  <li>To promote measures for institutional functioning towards quality enhancement through internalization of quality culture and institutionalization of best practices.</li>
                </ul>
              `
            }
          }
        ]
      },
      {
        key: 'naac',
        title: 'NAAC Accreditation & SSR',
        bannerTitle: 'NAAC Accreditation',
        bannerSubtitle: 'National Assessment and Accreditation Council status and details',
        seoTitle: 'NAAC Accreditation SSR Report | NREC College Khurja',
        seoDescription: 'View the NAAC accreditation documents, certificates, and Self Study Reports (SSR) of NREC College.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'NAAC Grading & Quality Index',
              label: 'ACCREDITATION',
              align: 'left',
              content: `
                <p>NREC College stands committed to institutional assessment and quality audits by NAAC. The college is currently preparing its next cycle of accreditation self-study reports (SSR).</p>
                <p>Accreditation status certificates, institutional grade sheets, and AQAR reports can be requested from the IQAC office or downloaded from the notices section when active.</p>
              `
            }
          }
        ]
      },
      {
        key: 'syllabus',
        title: 'Course Syllabus',
        bannerTitle: 'Syllabus & Curricula',
        bannerSubtitle: 'Download official university syllabus for all UG, PG, and Professional courses',
        seoTitle: 'Course Syllabus Download | NREC College Khurja',
        seoDescription: 'Download syllabus PDFs for Arts, Science, Commerce, Law and BCA courses.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'CCS University Curricula Guidelines',
              label: 'SYLLABUS',
              align: 'left',
              content: `
                <p>NREC College follows the official curriculum set by Chaudhary Charan Singh (CCS) University, Meerut. The syllabus is based on the National Education Policy (NEP) guidelines.</p>
                <p>Please visit the <a href="/curriculum" class="text-[#8B0E2A] font-bold hover:underline">Curriculum page</a> to download the syllabus documents for specific semesters.</p>
              `
            }
          }
        ]
      },
      {
        key: 'research',
        title: 'Research & Publications',
        bannerTitle: 'Research & Publications',
        bannerSubtitle: 'Fostering research culture, doctoral guideship, and scholarly publications',
        seoTitle: 'Research and Publications Division | NREC College Khurja',
        seoDescription: 'Explore research projects, publications, journals, and PhD guides at NREC College.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Research Centers & Projects',
              label: 'SCHOLARSHIP',
              align: 'left',
              content: `
                <p>Several departments of NREC College are recognized research centers for Chaudhary Charan Singh University, Meerut. Faculty members regularly publish research papers in peer-reviewed UGC-CARE listed journals.</p>
                <p>The college supports students and scholars in applying for research fellowships and major/minor research projects funded by UGC, DST, and state government bodies.</p>
              `
            }
          }
        ]
      },
      {
        key: 'eligibility',
        title: 'Eligibility Criteria',
        bannerTitle: 'Course Eligibility Requirements',
        bannerSubtitle: 'Check prerequisites and minimum criteria for UG and PG course admissions',
        seoTitle: 'Admission Eligibility Criteria | NREC College Khurja',
        seoDescription: 'Get eligibility guidelines for BCA, B.Sc., B.A., and post-graduate course admissions.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Admission Prerequisites',
              label: 'ELIGIBILITY',
              align: 'left',
              content: `
                <p>Ensure you meet the following minimum qualifications before applying for admissions at NREC College:</p>
                <ul>
                  <li><strong>Regular B.A. / B.Com:</strong> 10+2 passing marks from any recognized state or central board.</li>
                  <li><strong>Regular B.Sc (Maths/Bio):</strong> 10+2 with Science stream (PCM/PCB) from a recognized board.</li>
                  <li><strong>BCA (Self-Finance):</strong> 10+2 with Mathematics or Computer Applications as a core subject.</li>
                  <li><strong>Post Graduate Courses:</strong> Bachelor's degree (minimum 45% aggregate) in the respective subject.</li>
                </ul>
              `
            }
          }
        ]
      },
      {
        key: 'merit-list',
        title: 'Merit Lists',
        bannerTitle: 'Admission Merit Lists',
        bannerSubtitle: 'Verify names in the current academic session admission shortlists',
        seoTitle: 'Merit Lists 2026-2027 | NREC College Khurja',
        seoDescription: 'Find dynamic updates for admissions merit list rankings of NREC College, Khurja.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Admissions Cut-offs & Rankings',
              label: 'MERIT LISTS',
              align: 'left',
              content: `
                <p>Admission merit lists are calculated based on the registered academic percentages on the CCS University portal.</p>
                <p>When the university releases the cut-offs, the college updates the notice board and publishes individual lists for regular and self-financed courses. Check the notices section for live PDF uploads.</p>
              `
            }
          }
        ]
      },
      {
        key: 'ncc',
        title: 'National Cadet Corps (NCC)',
        bannerTitle: 'National Cadet Corps',
        bannerSubtitle: 'Developing character, discipline, and leadership among campus cadets',
        seoTitle: 'NCC Unit Cadets | NREC College Khurja',
        seoDescription: 'Learn about the NCC Army and Air wings, training sessions, and certificates at NREC.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'NCC Training & B/C Certificates',
              label: 'YOUTH WING',
              align: 'left',
              content: `
                <p>NREC College has active boys and girls divisions of the National Cadet Corps (NCC). Cadets participate in annual training camps, national integration camps, and republic day parades.</p>
                <p>NCC cadets who clear the B and C certificate examinations are eligible for special weightages in university admissions and armed forces recruitments.</p>
              `
            }
          }
        ]
      },
      {
        key: 'nss',
        title: 'National Service Scheme (NSS)',
        bannerTitle: 'National Service Scheme',
        bannerSubtitle: 'Instilling the spirit of community service and social reform',
        seoTitle: 'NSS Social Service Camps | NREC College Khurja',
        seoDescription: 'Read about the NSS units, voluntary service camps and cleanliness drives at NREC College.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Not Me But You — Voluntary Social Service',
              label: 'SOCIAL SERVICE',
              align: 'left',
              content: `
                <p>NREC College NSS units organize regular blood donation drives, village hygiene camps, environmental awareness rallies, and literacy campaigns in neighboring rural zones.</p>
                <p>Volunteers who complete the mandatory hours of service and participate in seven-day special camps receive NSS merit certificates.</p>
              `
            }
          }
        ]
      },
      {
        key: 'college-committee',
        title: 'College Committees',
        bannerTitle: 'Administrative Committees',
        bannerSubtitle: 'Specialized committees ensuring standard regulatory compliance and cell operations',
        seoTitle: 'Administrative College Committees | NREC College Khurja',
        seoDescription: 'Meet the regulatory college committees and cells of NREC College.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Regulatory & Compliance Cells',
              label: 'COMMITTEES',
              align: 'left',
              content: `
                <p>NREC College operates specialized administrative committees to oversee campus life, safety, and academic guidelines:</p>
                <ul>
                  <li><strong>Anti-Ragging Cell:</strong> Ensures zero-tolerance policies are followed across all departments.</li>
                  <li><strong>Grievance Redressal Cell:</strong> Addresses academic and administrative complaints of students.</li>
                  <li><strong>Internal Complaints Committee (ICC):</strong> Focuses on gender equity and a safe campus workplace.</li>
                </ul>
              `
            }
          }
        ]
      },
      {
        key: 'recognition-affiliation',
        title: 'Recognition & Affiliation',
        bannerTitle: 'Affiliation & Approvals',
        bannerSubtitle: 'Official recognitions and affiliations with regulatory bodies',
        seoTitle: 'Recognition and University Affiliations | NREC College Khurja',
        seoDescription: 'Learn about NREC College affiliations with CCS University and UGC recognitions.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'University & UGC Approvals',
              label: 'AFFILIATION',
              align: 'left',
              content: `
                <p>NREC College, Khurja is permanently affiliated with <strong>Chaudhary Charan Singh (CCS) University, Meerut</strong> (formerly Meerut University).</p>
                <p>The college is recognized by the <strong>University Grants Commission (UGC)</strong> under Sections 2(f) and 12(B) of the UGC Act, 1956, enabling it to receive central assistance for research and development projects.</p>
              `
            }
          }
        ]
      },
      {
        key: 'academics',
        title: 'Academics Portal',
        bannerTitle: 'Academic Programs',
        bannerSubtitle: 'Comprehensive courses and departments of higher learning',
        seoTitle: 'Academics and Courses | NREC College Khurja',
        seoDescription: 'Explore the faculties, courses, syllabus and departments at NREC College.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Academic Streams Offered',
              label: 'ACADEMICS',
              align: 'left',
              content: `
                <p>We provide multiple streams of study including Science, Humanities, Commerce, Law, and Teacher Training. All programs are aligned with CCS University guidelines and NEP guidelines.</p>
                <p>Please browse our <a href="/departments" class="text-[#8B0E2A] font-bold hover:underline">Departments</a> and <a href="/courses" class="text-[#8B0E2A] font-bold hover:underline">Courses</a> sections for detailed curriculum files.</p>
              `
            }
          }
        ]
      },
      {
        key: 'program-outcomes',
        title: 'Program Outcomes (PO / CO)',
        bannerTitle: 'Program Outcomes',
        bannerSubtitle: 'Aims, objectives, and course outcomes expected upon program completion',
        seoTitle: 'Program and Course Outcomes (PO CO) | NREC College Khurja',
        seoDescription: 'Review the educational objectives and outcomes expected of students at NREC College.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'PO, PSO & CO Framework',
              label: 'OUTCOMES',
              align: 'left',
              content: `
                <p>NREC College defines specific learning targets for all faculties to evaluate student performance:</p>
                <ul>
                  <li><strong>Program Outcomes (PO):</strong> Broad statements describing the professional knowledge and skills students gain.</li>
                  <li><strong>Program Specific Outcomes (PSO):</strong> What students will be able to do in specific disciplines.</li>
                  <li><strong>Course Outcomes (CO):</strong> The specific topic-wise expertise attained after clearing individual course modules.</li>
                </ul>
              `
            }
          }
        ]
      },
      {
        key: 'examination',
        title: 'Examinations Center',
        bannerTitle: 'Examinations & Evaluations',
        bannerSubtitle: 'Check university exams schedules, guidelines, and result notifications',
        seoTitle: 'College Examinations and Schedules | NREC College Khurja',
        seoDescription: 'Get CCS University examination forms updates, date sheets, and evaluation schedules.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'University Evaluation Guidelines',
              label: 'EXAMINATIONS',
              align: 'left',
              content: `
                <p>Final theory and practical examinations are conducted by Chaudhary Charan Singh University, Meerut.</p>
                <p>Students must maintain at least 75% attendance to be eligible for filling the university examination forms. Internal tests and assignments are administered by respective departments throughout the semester.</p>
              `
            }
          }
        ]
      },
      {
        key: 'admission-rules',
        title: 'Admission Rules',
        bannerTitle: 'Admission Rules & Code of Conduct',
        bannerSubtitle: 'Regulatory rules governing candidate registrations, fees, and reservations',
        seoTitle: 'Admission Regulations and Code of Conduct | NREC College Khurja',
        seoDescription: 'Read the rules, reservation policies, and registration guidelines of NREC College.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Candidate Eligibility & Rules',
              label: 'REGULATIONS',
              align: 'left',
              content: `
                <p>All candidates applying for admissions must strictly adhere to the following regulations:</p>
                <ul>
                  <li><strong>Online Registration:</strong> Mandatory registration on the CCS University pre-admission portal.</li>
                  <li><strong>Reservations:</strong> Government of UP reservation rules apply for SC/ST/OBC and physically challenged categories.</li>
                  <li><strong>Documents:</strong> Original marksheets, transfer certificates (TC), and character certificates must be verified in person.</li>
                </ul>
              `
            }
          }
        ]
      },
      {
        key: 'student-life',
        title: 'Student Life',
        bannerTitle: 'Campus & Student Life',
        bannerSubtitle: 'Fostering holistic growth with athletic, cultural, and extra-curricular wings',
        seoTitle: 'Student Life and Co-curricular Activities | NREC College Khurja',
        seoDescription: 'Explore the library, sports meets, NCC, NSS and campus clubs of NREC College.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Holistic Campus Ecosystem',
              label: 'CAMPUS LIFE',
              align: 'left',
              content: `
                <p>Student life at NREC College extends beyond traditional lectures. We encourage students to join clubs and community organizations to build leadership skills.</p>
                <p>Browse our co-curricular wings: <a href="/library" class="text-[#8B0E2A] font-bold hover:underline">Library</a>, <a href="/ncc" class="text-[#8B0E2A] font-bold hover:underline">NCC</a>, <a href="/nss" class="text-[#8B0E2A] font-bold hover:underline">NSS</a>, and <a href="/sports" class="text-[#8B0E2A] font-bold hover:underline">Sports Division</a>.</p>
              `
            }
          }
        ]
      },
      {
        key: 'student-grievance',
        title: 'Student Grievance Redressal',
        bannerTitle: 'Grievance Redressal Cell',
        bannerSubtitle: 'Resolving academic, infrastructural, and administrative complaints of students',
        seoTitle: 'Student Grievance Redressal Committee | NREC College Khurja',
        seoDescription: 'Submit complaints and reach the Grievance Redressal Cell of NREC College.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Submit Academic & Campus Concerns',
              label: 'GRIEVANCE REDRESSAL',
              align: 'left',
              content: `
                <p>The Grievance Redressal Cell guarantees a fair and transparent evaluation of student complaints. Grievances can be submitted in writing to the committee block or via the suggestions box on campus.</p>
                <p>All complaints are evaluated by the senior dean committee within 7 working days.</p>
              `
            }
          }
        ]
      },
      {
        key: 'tenders',
        title: 'Tenders & Procurement',
        bannerTitle: 'Procurement Tenders',
        bannerSubtitle: 'Official notices inviting quotations for infrastructure, labs, and services',
        seoTitle: 'Active Tenders and Procurement Notices | NREC College Khurja',
        seoDescription: 'View the active tenders, supply invitations, and repair quotes requested by NREC College.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Invitation for Tenders',
              label: 'PROCUREMENT',
              align: 'left',
              content: `
                <p>NREC College invites registered vendors to submit competitive bidding quotes for equipment installation, building renovation, and security contracts.</p>
                <p>Download active tender specification PDFs and terms from the notices section when active.</p>
              `
            }
          }
        ]
      },
      {
        key: 'alumni',
        title: 'Alumni Network',
        bannerTitle: 'NREC Alumni Association',
        bannerSubtitle: 'Reconnecting past graduates, fostering relationships, and supporting campus growth',
        seoTitle: 'Notable Alumni Association | NREC College Khurja',
        seoDescription: 'Join the NREC College alumni network and find notable alumni details.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'A Centenary of Distinguished Alumni',
              label: 'ALUMNI',
              align: 'left',
              content: `
                <p>For over a century, NREC College has graduated thousands of students who have gone on to serve as administrative officers, scientists, political leaders, and educators.</p>
                <p>We welcome all alumni to register with the NREC Alumni Association to mentor young graduates and support campus development.</p>
              `
            }
          }
        ]
      },
      {
        key: 'rti',
        title: 'Right to Information (RTI)',
        bannerTitle: 'RTI Act Disclosures',
        bannerSubtitle: 'Statutory disclosures under Section 4(1)(b) of the RTI Act, 2005',
        seoTitle: 'Right to Information RTI Officers | NREC College Khurja',
        seoDescription: 'Get statutory RTI disclosures, Public Information Officers details at NREC.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Statutory Disclosures',
              label: 'RTI ACT',
              align: 'left',
              content: `
                <p>In accordance with the Right to Information Act, 2005, NREC College provides access to institutional rules, registers, and directories:</p>
                <ul>
                  <li><strong>Public Information Officer (PIO):</strong> Senior Vice-Principal, NREC College.</li>
                  <li><strong>Appellate Authority:</strong> Principal, NREC College, Khurja.</li>
                </ul>
              `
            }
          }
        ]
      },
      {
        key: 'career',
        title: 'Careers & Vacancies',
        bannerTitle: 'Careers & Opportunities',
        bannerSubtitle: 'Apply for teaching and non-teaching positions at NREC College',
        seoTitle: 'Faculty Vacancies and Staff Careers | NREC College Khurja',
        seoDescription: 'Find career notifications, application forms, and ad-hoc job vacancies at NREC.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Join Our Distinguished Team',
              label: 'CAREERS',
              align: 'left',
              content: `
                <p>NREC College invites applications for regular faculty vacancies under UP Higher Education Commission (UPHESC) guidelines and ad-hoc teaching positions.</p>
                <p>Check active notices or contact the administrative office for vacancy application forms and details.</p>
              `
            }
          }
        ]
      },
      {
        key: 'mandatory-disclosure',
        title: 'Mandatory Disclosure',
        bannerTitle: 'Mandatory Disclosures',
        bannerSubtitle: 'Regulatory reports, land records, NCTE, and university approvals',
        seoTitle: 'Mandatory Disclosures and Reports | NREC College Khurja',
        seoDescription: 'Download mandatory audit reports, NCTE teacher education approvals of NREC.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Statutory Disclosures and Approvals',
              label: 'DISCLOSURES',
              align: 'left',
              content: `
                <p>Download the official NCTE B.Ed course approval orders, college land records, institutional audit certificates, and AISHE reports from the administrative download links.</p>
              `
            }
          }
        ]
      },
      {
        key: 'privacy-policy',
        title: 'Privacy Policy',
        bannerTitle: 'Privacy Policy',
        bannerSubtitle: 'Our guidelines on data safety, collection, and storage policy',
        seoTitle: 'Privacy Policy guidelines | NREC College Khurja',
        seoDescription: 'Read the privacy policy of NREC College Khurja website.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Website Privacy & Security Guidelines',
              label: 'PRIVACY POLICY',
              align: 'left',
              content: `
                <p>NREC College values visitor privacy. We do not share personal registration details with third-party advertising companies. All data collection complies with central IT acts and university guidelines.</p>
              `
            }
          }
        ]
      },
      {
        key: 'proctorial-board',
        title: 'Proctorial Board',
        bannerTitle: 'Proctorial Board & Discipline',
        bannerSubtitle: 'Maintaining campus discipline, code of conduct, and student harmony',
        seoTitle: 'Proctorial Board Members | NREC College Khurja',
        seoDescription: 'Meet the proctorial board committee deans overseeing campus code of conduct.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Campus Code of Conduct',
              label: 'DISCIPLINE',
              align: 'left',
              content: `
                <p>The Proctorial Board is responsible for monitoring student discipline and enforcing regulations on the NREC campus.</p>
                <ul>
                  <li><strong>Chief Proctor:</strong> Dr. Narendra Singh</li>
                  <li><strong>Senior Proctors:</strong> Dr. R. K. Gupta, Dr. Sunita Tomar</li>
                </ul>
              `
            }
          }
        ]
      },
      {
        key: 'administrative-staff',
        title: 'Administrative Staff',
        bannerTitle: 'Administrative & Support Staff',
        bannerSubtitle: 'Support team, clerks, register offices, and estate operators',
        seoTitle: 'Administrative Staff Directory | NREC College Khurja',
        seoDescription: 'Meet the office registry staff, accounts officers and clerks of NREC College.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Office Registry & Accounts Team',
              label: 'SUPPORT STAFF',
              align: 'left',
              content: `
                <p>Meet our dedicated administrative and registry support division members:</p>
                <ul>
                  <li><strong>Registrar Office:</strong> Shri P. K. Saxena</li>
                  <li><strong>Chief Accountant:</strong> Shri Amit Kumar Sharma</li>
                  <li><strong>Accounts Registry Clerk:</strong> Smt. Rekha Rani</li>
                </ul>
              `
            }
          }
        ]
      },
      {
        key: 'iqac-members',
        title: 'IQAC Members Committee',
        bannerTitle: 'IQAC Committee Composition',
        bannerSubtitle: 'The executive committee members managing qualityassurance cell initiatives',
        seoTitle: 'IQAC Members and Quality Team | NREC College Khurja',
        seoDescription: 'Meet the coordinator and quality monitoring members of the NREC IQAC cell.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'IQAC Executive Composition',
              label: 'MEMBERS LIST',
              align: 'left',
              content: `
                <p>The IQAC Cell comprises the following executive representatives:</p>
                <ul>
                  <li><strong>Chairperson:</strong> Principal, NREC College</li>
                  <li><strong>IQAC Coordinator:</strong> Dr. Seema Tomar</li>
                  <li><strong>Administrative Officers:</strong> Shri Amit Kumar Sharma</li>
                </ul>
              `
            }
          }
        ]
      },
      {
        key: 'iqac-aqar',
        title: 'AQAR Reports',
        bannerTitle: 'Annual Quality Assurance Reports',
        bannerSubtitle: 'View and download official NAAC Annual Quality Assurance Reports (AQAR)',
        seoTitle: 'NAAC AQAR Reports Download | NREC College Khurja',
        seoDescription: 'Download yearly NAAC AQAR compliance reports of NREC College.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Yearly AQAR Submissions',
              label: 'AQAR REPORTS',
              align: 'left',
              content: `
                <p>Annual Quality Assurance Reports are prepared in accordance with NAAC directives and submitted to the national portal annually.</p>
                <p>Please check the downloads block or request physical audit guides from the IQAC registry coordinator.</p>
              `
            }
          }
        ]
      },
      {
        key: 'iqac-action-taken-report',
        title: 'Action Taken Reports',
        bannerTitle: 'Action Taken Reports (ATR)',
        bannerSubtitle: 'Action taken reports based on stakeholder evaluations and academic audits',
        seoTitle: 'IQAC Action Taken Reports | NREC College Khurja',
        seoDescription: 'Read the IQAC Action Taken Reports (ATR) resolving quality feedbacks.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Annual Action Taken Disclosures',
              label: 'ATR REPORTS',
              align: 'left',
              content: `
                <p>The IQAC committee reviews feedback collected from students, faculty, and alumni, and submits Action Taken Reports (ATR) to ensure continuous improvements in infrastructure, curriculum delivery, and library resources.</p>
              `
            }
          }
        ]
      },
      {
        key: 'facilities-computer-lab',
        title: 'Computer Laboratories',
        bannerTitle: 'Central Computer Lab',
        bannerSubtitle: 'State of the art computing and high speed networking infrastructure',
        seoTitle: 'Computer Laboratories & IT Infrastructure | NREC College Khurja',
        seoDescription: 'Explore the high-speed central computing labs and software systems at NREC.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Central Computing Resource Center',
              label: 'COMPUTING LABS',
              align: 'left',
              content: `
                <p>Our computing facility houses over 60 high-performance workstations connected with high-speed fiber internet connection, catering to BCA, IT and research programs.</p>
              `
            }
          }
        ]
      },
      {
        key: 'facilities-hostel',
        title: 'Hostel Accommodation',
        bannerTitle: 'Student Hostels',
        bannerSubtitle: 'Secure and comfortable residential hostel facilities for outstation students',
        seoTitle: 'Boys and Girls Hostel Facilities | NREC College Khurja',
        seoDescription: 'View the dining halls, rooms capacity, and security policies of NREC hostels.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'On-Campus Residential Living',
              label: 'HOSTELS',
              align: 'left',
              content: `
                <p>NREC College offers secure and affordable lodging for boys and girls with clean dining halls, common recreational rooms, and round-the-clock warden supervision.</p>
              `
            }
          }
        ]
      },
      {
        key: 'facilities-canteen',
        title: 'Campus Canteen',
        bannerTitle: 'Campus Cafeteria & Canteen',
        bannerSubtitle: 'Hygienic snacks, beverages, and affordable meal programs for students',
        seoTitle: 'Campus Canteen and Cafeteria | NREC College Khurja',
        seoDescription: 'Read about the cafeteria meal plans, hygiene guidelines and snack menu.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Hygienic Dining Facilities',
              label: 'CANTEEN',
              align: 'left',
              content: `
                <p>The campus cafeteria serves fresh, nutritious snacks, hot beverages, and lunch items at highly subsidized rates for students and staff.</p>
              `
            }
          }
        ]
      },
      {
        key: 'rangers-rovers',
        title: 'Rangers & Rovers Unit',
        bannerTitle: 'Rangers & Rovers Scouting Unit',
        bannerSubtitle: 'Instilling scouts guidelines, community service, and physical fitness',
        seoTitle: 'Rangers and Rovers Scouts | NREC College Khurja',
        seoDescription: 'Learn about the Rangers & Rovers scouting camps, certificates, and training at NREC.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Scouting & Character Development',
              label: 'SCOUTS WING',
              align: 'left',
              content: `
                <p>The Rangers & Rovers unit at NREC College teaches students self-reliance, leadership, community welfare, and emergency rescue assistance through active camp participations.</p>
              `
            }
          }
        ]
      },
      {
        key: 'seats',
        title: 'Course Seats Capacity',
        bannerTitle: 'Course Seat Intakes',
        bannerSubtitle: 'Approved seat allocations for UG, PG, and self finance courses',
        seoTitle: 'Seats Matrix and Intakes | NREC College Khurja',
        seoDescription: 'Check seats capacity for BCA, B.Sc., B.A. and PG programs at NREC.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Approved Intakes by CCS University',
              label: 'SEAT MATRIX',
              align: 'left',
              content: `
                <p>Check the approved intakes for the current academic session:</p>
                <ul>
                  <li><strong>B.A. (Regular):</strong> 960 Seats</li>
                  <li><strong>B.Sc Maths (Regular):</strong> 240 Seats</li>
                  <li><strong>B.Sc Bio (Regular):</strong> 120 Seats</li>
                  <li><strong>BCA (Self-Finance):</strong> 60 Seats</li>
                </ul>
              `
            }
          }
        ]
      },
      {
        key: 'student-feedback',
        title: 'Student Feedback Portal',
        bannerTitle: 'Feedback & Evaluations',
        bannerSubtitle: 'Share feedback regarding teaching, facilities, and campus administration',
        seoTitle: 'Student Feedback Forms | NREC College Khurja',
        seoDescription: 'Submit teacher evaluations and infrastructure feedback to NREC IQAC Cell.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Continuous Quality Enhancement Feedbacks',
              label: 'FEEDBACK PORTAL',
              align: 'left',
              content: `
                <p>Fill out the feedback forms available at the IQAC registry coordinator desk to help us maintain high educational standards.</p>
              `
            }
          }
        ]
      },
      {
        key: 'feedback',
        title: 'Stakeholder Feedback',
        bannerTitle: 'Stakeholder Feedback System',
        bannerSubtitle: 'Feedback collection forms for students, parents, and alumni',
        seoTitle: 'Feedback System and Audits | NREC College Khurja',
        seoDescription: 'Submit feedback forms for quality analysis and AQAR submissions at NREC.',
        sections: [
          {
            type: 'RichText',
            isActive: true,
            data: {
              title: 'Quality Audits & Feedbacks',
              label: 'FEEDBACK',
              align: 'left',
              content: `
                <p>Academic quality feedback surveys are conducted annually for AQAR NAAC documentation and improvement initiatives.</p>
              `
            }
          }
        ]
      }
    ];

    for (const pageData of pagesToSeed) {
      let page = await Page.findOne({ key: pageData.key });
      if (!page) {
        await Page.create(pageData);
        console.log(`✅ Dynamic page seeded: /${pageData.key}`);
      } else {
        // Optionally update the sections if already exists to ensure all routes are valid
        page.title = pageData.title;
        page.bannerTitle = pageData.bannerTitle;
        page.bannerSubtitle = pageData.bannerSubtitle;
        page.sections = pageData.sections;
        page.seoTitle = pageData.seoTitle;
        page.seoDescription = pageData.seoDescription;
        await page.save();
        console.log(`✅ Dynamic page updated: /${pageData.key}`);
      }
    }

    console.log('🎉 Version 1.0 Seeding complete with rich sample data!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seed();
