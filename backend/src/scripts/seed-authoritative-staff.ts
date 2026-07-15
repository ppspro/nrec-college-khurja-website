import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Department from '../models/Department';
import Faculty from '../models/Faculty';
import slugify from 'slugify';

// Load env
dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Nrec';

const departmentsToSeed = [
  { name: 'Economics', slug: 'economics', faculty: 'Arts' },
  { name: 'English', slug: 'english', faculty: 'Arts' },
  { name: 'Hindi', slug: 'hindi', faculty: 'Arts' },
  { name: 'History', slug: 'history', faculty: 'Arts' },
  { name: 'Geography', slug: 'geography', faculty: 'Arts' },
  { name: 'Physical Education', slug: 'physical-education', faculty: 'Arts' },
  { name: 'Political Science', slug: 'political-science', faculty: 'Arts' },
  { name: 'Psychology', slug: 'psychology', faculty: 'Arts' },
  { name: 'Sanskrit', slug: 'sanskrit', faculty: 'Arts' },
  { name: 'Sociology', slug: 'sociology', faculty: 'Arts' },
  { name: 'Commerce', slug: 'commerce', faculty: 'Commerce' },
  { name: 'Education', slug: 'education', faculty: 'Education' },
  { name: 'Law', slug: 'law', faculty: 'Law' },
  { name: 'Botany', slug: 'botany', faculty: 'Science' },
  { name: 'Chemistry', slug: 'chemistry', faculty: 'Science' },
  { name: 'Mathematics', slug: 'mathematics', faculty: 'Science' },
  { name: 'Physics', slug: 'physics', faculty: 'Science' },
  { name: 'Statistics', slug: 'statistics', faculty: 'Science' },
  { name: 'Zoology', slug: 'zoology', faculty: 'Science' }
];

const facultyMembers = [
  // FACULTY OF ARTS
  { name: 'Dr. Om Prakash Singh', deptSlug: 'economics', faculty: 'Arts', designation: 'Associate Professor', qualification: 'M.A., Ph.D.' },
  { name: 'Dr. Sharad Kumar', deptSlug: 'economics', faculty: 'Arts', designation: 'Assistant Professor', qualification: 'M.A., Ph.D.' },
  
  { name: 'Dr. Sunil Kumar Dixit', deptSlug: 'english', faculty: 'Arts', designation: 'Associate Professor', qualification: 'M.A., Ph.D.' },
  { name: 'Dr. Harsha Sharma', deptSlug: 'english', faculty: 'Arts', designation: 'Assistant Professor', qualification: 'M.A., Ph.D.' },
  
  { name: 'Dr. Krishna Sharma', deptSlug: 'hindi', faculty: 'Arts', designation: 'Associate Professor', qualification: 'M.A., Ph.D.' },
  { name: 'Sh. Neeraj Kumar', deptSlug: 'hindi', faculty: 'Arts', designation: 'Assistant Professor', qualification: 'M.A., NET' },
  { name: 'Sh. Sushil Kumar Patel', deptSlug: 'hindi', faculty: 'Arts', designation: 'Assistant Professor', qualification: 'M.A., NET' },
  
  { name: 'Dr. Mithilesh Kumar', deptSlug: 'geography', faculty: 'Arts', designation: 'Associate Professor', qualification: 'M.A., Ph.D.' },
  { name: 'Dr. Atul Kumar', deptSlug: 'geography', faculty: 'Arts', designation: 'Assistant Professor', qualification: 'M.A., Ph.D.' },
  { name: 'Dr. Shabber Malik', deptSlug: 'geography', faculty: 'Arts', designation: 'Assistant Professor', qualification: 'M.A., Ph.D.' },
  { name: 'Dr. Chetram', deptSlug: 'geography', faculty: 'Arts', designation: 'Assistant Professor', qualification: 'M.A., Ph.D.' },
  { name: 'Dr. Sangam', deptSlug: 'geography', faculty: 'Arts', designation: 'Assistant Professor', qualification: 'M.A., Ph.D.' },
  
  { name: 'Sh. Atish Sharma', deptSlug: 'physical-education', faculty: 'Arts', designation: 'Assistant Professor', qualification: 'M.P.Ed.' },
  
  { name: 'Dr. Punit Shukla', deptSlug: 'political-science', faculty: 'Arts', designation: 'Assistant Professor', qualification: 'M.A., Ph.D.' },
  { name: 'Sh. Sunny Kumar', deptSlug: 'political-science', faculty: 'Arts', designation: 'Assistant Professor', qualification: 'M.A., NET' },
  
  { name: 'Dr. Bhupendra Singh', deptSlug: 'psychology', faculty: 'Arts', designation: 'Associate Professor', qualification: 'M.A., Ph.D.' },
  { name: 'Dr. Anil Kumar Singh', deptSlug: 'psychology', faculty: 'Arts', designation: 'Assistant Professor', qualification: 'M.A., Ph.D.' },
  
  { name: 'Dr. Subhash Painuly', deptSlug: 'sanskrit', faculty: 'Arts', designation: 'Assistant Professor', qualification: 'M.A., Ph.D.' },
  
  { name: 'Dr. Anjali Aggrawal', deptSlug: 'sociology', faculty: 'Arts', designation: 'Associate Professor', qualification: 'M.A., Ph.D.' },
  
  // FACULTY OF COMMERCE
  { name: 'Dr. Sanjay Kumar Bansal', deptSlug: 'commerce', faculty: 'Commerce', designation: 'Associate Professor', qualification: 'M.Com., Ph.D.' },
  { name: 'Dr. Jagveer Singh', deptSlug: 'commerce', faculty: 'Commerce', designation: 'Assistant Professor', qualification: 'M.Com., Ph.D.' },
  { name: 'Dr. Vishal Kumar Arora', deptSlug: 'commerce', faculty: 'Commerce', designation: 'Assistant Professor', qualification: 'M.Com., Ph.D.' },
  { name: 'Ms. Jyoti Yadav', deptSlug: 'commerce', faculty: 'Commerce', designation: 'Assistant Professor', qualification: 'M.Com., NET' },
  
  // FACULTY OF EDUCATION
  { name: 'Dr. Upma Singh', deptSlug: 'education', faculty: 'Education', designation: 'Associate Professor', qualification: 'M.Ed., Ph.D.' },
  { name: 'Dr. Sandhya Mishra', deptSlug: 'education', faculty: 'Education', designation: 'Associate Professor', qualification: 'M.Ed., Ph.D.' },
  { name: 'Dr. Komal Yadav', deptSlug: 'education', faculty: 'Education', designation: 'Assistant Professor', qualification: 'M.Ed., Ph.D.' },
  { name: 'Dr. Lokesh Kumar', deptSlug: 'education', faculty: 'Education', designation: 'Assistant Professor', qualification: 'M.Ed., Ph.D.' },
  { name: 'Dr. Priyanka Rani', deptSlug: 'education', faculty: 'Education', designation: 'Assistant Professor', qualification: 'M.Ed., Ph.D.' },
  { name: 'Dr. Priti Teotia', deptSlug: 'education', faculty: 'Education', designation: 'Assistant Professor', qualification: 'M.Ed., Ph.D.' },
  { name: 'Dr. Anil Kumar', deptSlug: 'education', faculty: 'Education', designation: 'Assistant Professor', qualification: 'M.Ed., Ph.D.' },
  
  // FACULTY OF LAW
  { name: 'Dr. I M Khan', deptSlug: 'law', faculty: 'Law', designation: 'Associate Professor', qualification: 'LL.M., Ph.D.' },
  { name: 'Dr. Vaishali Gupta', deptSlug: 'law', faculty: 'Law', designation: 'Assistant Professor', qualification: 'LL.M., Ph.D.' },
  
  // FACULTY OF SCIENCE
  // Botany
  { name: 'Dr. Anita Pawar', deptSlug: 'botany', faculty: 'Science', designation: 'Associate Professor', qualification: 'M.Sc., Ph.D.' },
  { name: 'Dr. Vishal Kaushik', deptSlug: 'botany', faculty: 'Science', designation: 'Assistant Professor', qualification: 'M.Sc., Ph.D.' },
  { name: 'Dr. Luvna Rajput', deptSlug: 'botany', faculty: 'Science', designation: 'Assistant Professor', qualification: 'M.Sc., Ph.D.' },
  { name: 'Dr. Aman Deep Raju', deptSlug: 'botany', faculty: 'Science', designation: 'Assistant Professor', qualification: 'M.Sc., Ph.D.' },
  
  // Chemistry
  { name: 'Dr. Sandhya Chaudhary', deptSlug: 'chemistry', faculty: 'Science', designation: 'Associate Professor', qualification: 'M.Sc., Ph.D.' },
  { name: 'Sh. Veer Pal', deptSlug: 'chemistry', faculty: 'Science', designation: 'Assistant Professor', qualification: 'M.Sc., NET' },
  { name: 'Ms. Kirti Agrawal', deptSlug: 'chemistry', faculty: 'Science', designation: 'Assistant Professor', qualification: 'M.Sc., NET' },
  { name: 'Dr. Rahul Yadav', deptSlug: 'chemistry', faculty: 'Science', designation: 'Assistant Professor', qualification: 'M.Sc., Ph.D.' },
  { name: 'Dr. Sandeep Singh', deptSlug: 'chemistry', faculty: 'Science', designation: 'Assistant Professor', qualification: 'M.Sc., Ph.D.' },
  { name: 'Sh. Anurag Verma', deptSlug: 'chemistry', faculty: 'Science', designation: 'Assistant Professor', qualification: 'M.Sc., NET' },
  { name: 'Dr. Ambreesh Kr. Singh', deptSlug: 'chemistry', faculty: 'Science', designation: 'Assistant Professor', qualification: 'M.Sc., Ph.D.' },
  
  // Mathematics
  { name: 'Dr. Sanjeev Kumar Singh', deptSlug: 'mathematics', faculty: 'Science', designation: 'Principal', qualification: 'M.Sc., Ph.D.', isHod: true },
  { name: 'Dr. Hitesh Kumar Singh', deptSlug: 'mathematics', faculty: 'Science', designation: 'Associate Professor', qualification: 'M.Sc., Ph.D.' },
  { name: 'Dr. Sachin', deptSlug: 'mathematics', faculty: 'Science', designation: 'Assistant Professor', qualification: 'M.Sc., Ph.D.' },
  
  // Physics
  { name: 'Dr. Annveer', deptSlug: 'physics', faculty: 'Science', designation: 'Associate Professor', qualification: 'M.Sc., Ph.D.' },
  { name: 'Dr. Sarjana Yadav', deptSlug: 'physics', faculty: 'Science', designation: 'Assistant Professor', qualification: 'M.Sc., Ph.D.' },
  { name: 'Sh. Aashish Kumar', deptSlug: 'physics', faculty: 'Science', designation: 'Assistant Professor', qualification: 'M.Sc., NET' },
  { name: 'Sh. Sumit', deptSlug: 'physics', faculty: 'Science', designation: 'Assistant Professor', qualification: 'M.Sc., NET' },
  { name: 'Dr. Bharat Bhushan', deptSlug: 'physics', faculty: 'Science', designation: 'Assistant Professor', qualification: 'M.Sc., Ph.D.' },
  
  // Statistics
  { name: 'Dr. Govind Singhal', deptSlug: 'statistics', faculty: 'Science', designation: 'Associate Professor', qualification: 'M.Sc., Ph.D.' },
  { name: 'Sh. Ashok Verma', deptSlug: 'statistics', faculty: 'Science', designation: 'Assistant Professor', qualification: 'M.Sc., NET' },
  
  // Zoology
  { name: 'Dr. Hridayesh Arya', deptSlug: 'zoology', faculty: 'Science', designation: 'Associate Professor', qualification: 'M.Sc., Ph.D.' },
  { name: 'Ms. Neelam', deptSlug: 'zoology', faculty: 'Science', designation: 'Assistant Professor', qualification: 'M.Sc., NET' },
  { name: 'Dr. Gauravi Yadav', deptSlug: 'zoology', faculty: 'Science', designation: 'Assistant Professor', qualification: 'M.Sc., Ph.D.' }
];

async function seed() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully.');

    // 1. Ensure all departments exist and map slugs to their DB ObjectId
    const deptSlugToIdMap: Record<string, mongoose.Types.ObjectId> = {};
    for (const d of departmentsToSeed) {
      let dept = await Department.findOne({ slug: d.slug });
      if (!dept) {
        dept = await Department.create({
          name: `Department of ${d.name}`,
          slug: d.slug,
          code: d.name.substring(0, 4).toUpperCase(),
          description: `Department of ${d.name} at NREC College.`,
          facilities: ['Departmental Library', 'Seminar Room'],
          isActive: true
        });
        console.log(`Created department: ${dept.name}`);
      } else {
        // Ensure the name is standard
        dept.name = d.slug === 'commerce' || d.slug === 'law' || d.slug === 'education' ? `Faculty of ${d.name}` : `Department of ${d.name}`;
        await dept.save();
      }
      deptSlugToIdMap[d.slug] = dept._id as mongoose.Types.ObjectId;
    }

    console.log(`Auditing faculty members. Total authoritative count: ${facultyMembers.length}`);

    for (const member of facultyMembers) {
      const deptId = deptSlugToIdMap[member.deptSlug];
      if (!deptId) {
        console.error(`Error: Department not found for slug ${member.deptSlug}`);
        continue;
      }

      const cleanSlug = slugify(member.name, { lower: true, strict: true });
      const query = { name: member.name };
      
      const updateData = {
        name: member.name,
        slug: cleanSlug,
        designation: member.designation,
        qualification: member.qualification,
        department: deptId,
        faculty: member.faculty,
        isActive: true,
        isHod: member.isHod || false,
        email: `${cleanSlug.replace(/dr\.-|sh\.-|ms\.-/, '')}@nreccollege.ac.in`,
        phone: '+91-5738-200001',
        biography: `${member.name} is a distinguished faculty member in the ${member.faculty} department at NREC College, Khurja.`,
        experience: member.designation === 'Associate Professor' ? '15+ Years' : '5+ Years',
        specialization: [member.deptSlug.toUpperCase()],
        publications: [`Publications and research papers by ${member.name} registered under CCS University.`],
        officeHours: 'Mon-Fri, 11:00 AM - 1:00 PM'
      };

      let existing = await Faculty.findOne(query);
      if (existing) {
        // Update
        await Faculty.updateOne({ _id: existing._id }, { $set: updateData });
        console.log(`Updated faculty: ${member.name}`);
      } else {
        // Create
        await Faculty.create(updateData);
        console.log(`Created faculty: ${member.name}`);
      }
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
