import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

import Page from '../models/Page';

const createAdmissionsPage = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nrec_college');
    console.log('MongoDB Connected');

    const admissionsPage = {
      key: 'admissions',
      title: 'Admissions',
      bannerTitle: 'Admissions',
      bannerSubtitle: 'Home > Admissions',
      seoTitle: 'Admissions - NREC College',
      seoDescription: 'Join NREC College',
      seoKeywords: 'admissions, nrec college',
      sections: [
        {
          type: 'CardsGrid',
          data: {
            title: 'Step-by-Step Guide',
            subtitle: 'ADMISSION PROCESS',
            columns: 3,
            style: 'numbered',
            cards: [
              {
                title: 'Check Eligibility',
                description: 'Review the minimum eligibility criteria for your desired programme.',
              },
              {
                title: 'Get Prospectus',
                description: 'Download or collect the college prospectus and application form.',
              },
              {
                title: 'Fill Application',
                description: 'Complete the application form with accurate personal and academic details.',
              },
              {
                title: 'Submit Documents',
                description: 'Submit certified copies of mark sheets, certificates, and photos.',
              },
              {
                title: 'Merit List',
                description: 'Merit list will be displayed on the college notice board and website.',
              },
              {
                title: 'Fee Payment',
                description: 'Complete admission by paying the prescribed fee within the stipulated time.',
              }
            ]
          },
          isActive: true
        },
        {
            type: 'RichText',
            data: {
                title: 'Online Admission Link',
                content: '<p>Joining NREC College is the first step towards a bright future. Our admission process is designed to be transparent, merit-based, and completely online for your convenience.</p><p><a href="https://nrec.ac.in/admission/" target="_blank" class="px-6 py-2 bg-[#8B0E2A] text-white rounded-md hover:bg-[#700B22] transition-colors inline-block mt-4">Apply Online Now</a></p>'
            },
            isActive: true
        }
      ]
    };

    const existing = await Page.findOne({ key: 'admissions' });
    if (existing) {
      Object.assign(existing, admissionsPage);
      await existing.save();
      console.log('Admissions page updated');
    } else {
      await Page.create(admissionsPage);
      console.log('Admissions page created');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error creating admissions page:', error);
    process.exit(1);
  }
};

createAdmissionsPage();
