/**
 * Seed default menus (main + footer) into MongoDB
 */
const { default: mongoose } = require('mongoose');
require('dotenv').config();

async function seedMenus() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nrec_college';
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const Menu = mongoose.model('Menu', new mongoose.Schema({
    key: { type: String, unique: true },
    name: String,
    items: mongoose.Schema.Types.Mixed,
  }, { timestamps: true }));

  const mainMenu = await Menu.findOneAndUpdate(
    { key: 'main' },
    {
      key: 'main',
      name: 'Main Navigation',
      items: [
        { label: 'Home', url: '/', order: 1 },
        { label: 'About', url: '/about', order: 2 },
        { label: 'Departments', url: '/departments', order: 3 },
        { label: 'Admissions', url: '/admissions', order: 4 },
        { label: 'Faculty', url: '/faculty', order: 5 },
        { label: 'Notices', url: '/notices', order: 6 },
        { label: 'Gallery', url: '/gallery', order: 7 },
        { label: 'Contact', url: '/contact', order: 8 },
      ]
    },
    { upsert: true, new: true }
  );
  console.log('✅ Main menu seeded:', mainMenu.key);

  const footerMenu = await Menu.findOneAndUpdate(
    { key: 'footer' },
    {
      key: 'footer',
      name: 'Footer Navigation',
      items: [
        { label: 'About', url: '/about', order: 1 },
        { label: 'History', url: '/history', order: 2 },
        { label: 'Departments', url: '/departments', order: 3 },
        { label: 'Faculty', url: '/faculty', order: 4 },
        { label: 'Downloads', url: '/downloads', order: 5 },
        { label: 'Contact', url: '/contact', order: 6 },
      ]
    },
    { upsert: true, new: true }
  );
  console.log('✅ Footer menu seeded:', footerMenu.key);

  await mongoose.disconnect();
  console.log('Done.');
}

seedMenus().catch(console.error);
