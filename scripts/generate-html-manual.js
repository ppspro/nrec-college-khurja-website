const fs = require('fs');
const path = require('path');

const manualPath = path.join(__dirname, '../CLIENT_HANDOVER/Admin_User_Manual.html');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NREC College — Admin User Manual v1.0.0</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap');

:root {
  --primary: #8B0E2A;
  --primary-light: #fdf2f5;
  --dark: #0f172a;
  --text: #334155;
  --muted: #64748b;
  --border: #e2e8f0;
  --bg: #f8fafc;
  --sidebar-width: 280px;
}

* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:'Inter',sans-serif; color:var(--text); background:white; font-size:15px; line-height:1.7; display: flex; }

/* ── SIDEBAR ── */
.sidebar {
  width: var(--sidebar-width);
  background: var(--bg);
  border-right: 1px solid var(--border);
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
  padding: 24px 16px;
  flex-shrink: 0;
}
.sidebar-logo {
  font-size: 18px;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 24px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.sidebar-logo span {
  background: var(--primary);
  color: white;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}
.sidebar-nav { list-style: none; }
.sidebar-nav li { margin-bottom: 4px; }
.sidebar-nav a {
  display: block;
  padding: 8px 12px;
  color: var(--text);
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s;
}
.sidebar-nav a:hover, .sidebar-nav a.active {
  background: var(--primary-light);
  color: var(--primary);
}
.sidebar-section {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--muted);
  font-weight: 700;
  margin: 24px 0 8px 12px;
}

/* ── MAIN CONTENT ── */
.main-wrapper {
  flex: 1;
  min-width: 0;
  padding-bottom: 100px;
}
.search-bar {
  position: sticky;
  top: 0;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(8px);
  padding: 16px 48px;
  border-bottom: 1px solid var(--border);
  z-index: 100;
}
.search-input {
  width: 100%;
  max-width: 600px;
  padding: 12px 20px;
  border: 1px solid var(--border);
  border-radius: 100px;
  font-size: 14px;
  outline: none;
  background: var(--bg);
}
.search-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.content { max-width:900px; margin:0 auto; padding:48px; }

/* ── COVER ── */
.cover {
  background:linear-gradient(145deg,#0f172a 0%,#1e293b 100%);
  border-radius: 24px;
  color: white;
  padding: 60px 48px;
  margin-bottom: 60px;
  text-align: center;
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
}
.cover-title { font-size:36px; font-weight:800; margin-bottom:16px; }
.cover-subtitle { color:rgba(255,255,255,0.7); font-size: 16px; }

/* ── QUICK START CARDS ── */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
}
.card {
  background: white;
  border: 1px solid var(--border);
  padding: 20px;
  border-radius: 16px;
  text-decoration: none;
  color: var(--dark);
  transition: all 0.2s;
  display: block;
}
.card:hover {
  border-color: var(--primary);
  box-shadow: 0 10px 20px -10px rgba(139,14,42,0.15);
  transform: translateY(-2px);
}
.card .icon { font-size: 24px; margin-bottom: 12px; }
.card .title { font-weight: 700; font-size: 15px; margin-bottom: 4px; }
.card .desc { color: var(--muted); font-size: 13px; }

/* ── MODULE STRUCTURE ── */
.module { margin-bottom:80px; padding-top:20px; }
.module-header { margin-bottom:24px; }
.module-title { font-size:28px; font-weight:800; color:var(--dark); margin-bottom:8px; }

.meta-box {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 24px;
  font-size: 14px;
}
.meta-item { margin-bottom: 8px; }
.meta-item:last-child { margin-bottom: 0; }
.meta-label { font-weight: 700; color: var(--dark); width: 100px; display: inline-block; }

.quick-actions-box {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 32px;
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
.qa-title { font-weight: 700; color: #166534; margin-right: 12px; font-size: 14px; }
.qa-btn {
  background: white;
  border: 1px solid #bbf7d0;
  color: #166534;
  padding: 6px 12px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* ── SCREENSHOTS ── */
.screenshot-frame {
  margin:32px 0;
  border-radius:12px;
  overflow:hidden;
  box-shadow:0 12px 32px rgba(0,0,0,.08);
  border:1px solid var(--border);
  position: relative;
}
.screenshot-label {
  display:flex; align-items:center; gap:8px;
  background:var(--dark); color:white;
  padding:10px 16px; font-size:12px; font-weight:600;
}
.dots { display:flex; gap:6px; }
.dot { width:10px; height:10px; border-radius:50%; }
.dot.red { background:#FF5F57; } .dot.yellow { background:#FFBD2E; } .dot.green { background:#28CA41; }
.screenshot-img { display:block; width:100%; height:auto; }

/* ── ANNOTATIONS OVERLAY ── */
.ann-overlay {
  position: absolute;
  width: 28px;
  height: 28px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(139,14,42,0.4);
  border: 2px solid white;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.annotation-list {
  list-style:none; margin:0 0 32px 0;
  background:var(--bg); border-radius:12px; padding:20px;
  border: 1px solid var(--border);
}
.annotation-list li { display:flex; align-items:flex-start; gap:12px; margin-bottom:12px; font-size:14px; }
.annotation-list li:last-child { margin-bottom:0; }
.ann {
  display:inline-flex; width:24px; height:24px;
  background:var(--primary); color:white; border-radius:50%;
  align-items:center; justify-content:center;
  font-size:12px; font-weight:800; flex-shrink:0; margin-top:2px;
}

/* ── CONTENT ELEMENTS ── */
h3 { font-size:18px; font-weight:700; color:var(--dark); margin:32px 0 16px; border-bottom: 1px solid var(--border); padding-bottom: 8px;}
p { margin-bottom:16px; }
ul, ol { margin: 0 0 20px 24px; }
li { margin-bottom: 8px; }
code { font-family:'Fira Code',monospace; background:var(--bg); padding:3px 6px; border-radius:6px; font-size:13px; color:var(--primary); border: 1px solid var(--border); }

.steps { margin:24px 0; counter-reset: step; }
.step {
  position: relative;
  padding-left: 48px;
  margin-bottom: 24px;
}
.step::before {
  counter-increment: step;
  content: counter(step);
  position: absolute;
  left: 0;
  top: 0;
  width: 32px;
  height: 32px;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}
.step-title { font-weight: 700; color: var(--dark); font-size: 15px; margin-bottom: 4px; }
.step-desc { color: var(--muted); font-size: 14px; }

/* ── CALLOUTS ── */
.callout { padding:16px 20px; border-radius:12px; margin:24px 0; display:flex; gap:16px; font-size:14px; }
.callout .icon { font-size:20px; flex-shrink:0; }
.callout .title { font-weight:700; margin-bottom:4px; font-size:15px; }
.callout.tip { background:#eff6ff; border:1px solid #bfdbfe; }
.callout.tip .title { color:#1e40af; }
.callout.warn { background:#fffbeb; border:1px solid #fef08a; }
.callout.warn .title { color:#92400e; }

/* ── MOBILE RESPONSIVENESS ── */
.hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--dark);
  margin-right: 16px;
}
.sidebar-overlay {
  display: none;
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 999;
}

@media (max-width: 768px) {
  body { flex-direction: column; }
  .sidebar {
    position: fixed;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 1000;
    box-shadow: 2px 0 12px rgba(0,0,0,0.1);
  }
  .sidebar.open {
    transform: translateX(0);
  }
  .sidebar-overlay.show {
    display: block;
  }
  .hamburger {
    display: block;
  }
  .search-bar {
    padding: 16px 20px;
    display: flex;
    align-items: center;
  }
  .content {
    padding: 24px 16px;
  }
  .cover {
    padding: 40px 24px;
  }
  .cover-title {
    font-size: 28px;
  }
  .cards-grid {
    grid-template-columns: 1fr;
  }
  .ann-overlay {
    width: 20px;
    height: 20px;
    font-size: 11px;
  }
}
</style>
</head>
<body>

<div class="sidebar">
  <div class="sidebar-logo">
    <span>N</span> NREC Admin
  </div>
  
  <div class="sidebar-section">Overview</div>
  <ul class="sidebar-nav">
    <li><a href="#quick-start">🚀 Quick Start</a></li>
    <li><a href="#dashboard">📊 Dashboard</a></li>
  </ul>

  <div class="sidebar-section">Website</div>
  <ul class="sidebar-nav">
    <li><a href="#homepage">🏡 Homepage</a></li>
    <li><a href="#pages">📄 Website Pages</a></li>
    <li><a href="#menus">🧭 Website Menu</a></li>
    <li><a href="#settings">⚙️ Website Settings</a></li>
  </ul>

  <div class="sidebar-section">Academics</div>
  <ul class="sidebar-nav">
    <li><a href="#departments">🏛 Departments</a></li>
    <li><a href="#courses">🎓 Courses</a></li>
    <li><a href="#faculty">👨‍🏫 Faculty</a></li>
    <li><a href="#curriculum">📚 Curriculum</a></li>
  </ul>

  <div class="sidebar-section">Campus</div>
  <ul class="sidebar-nav">
    <li><a href="#news">📰 News</a></li>
    <li><a href="#notices">📢 Notices</a></li>
    <li><a href="#events">📅 Events</a></li>
    <li><a href="#downloads">📁 Downloads</a></li>
    <li><a href="#media">🗃 Media Library</a></li>
  </ul>

  <div class="sidebar-section">Support</div>
  <ul class="sidebar-nav">
    <li><a href="#help">❓ Help Center</a></li>
  </ul>
</div>

<div class="sidebar-overlay" id="sidebarOverlay"></div>

<div class="main-wrapper">
  <div class="search-bar">
    <button class="hamburger" id="hamburgerBtn">☰</button>
    <input type="text" id="searchBox" class="search-input" placeholder="Search documentation..." />
  </div>

  <div class="content">
    
    <div class="cover">
      <h1 class="cover-title">Admin User Manual</h1>
      <p class="cover-subtitle">Complete guide to managing the NREC College CMS</p>
    </div>

    <!-- QUICK START -->
    <div id="quick-start" class="module searchable">
      <h2 class="module-title">🚀 Quick Start Guide</h2>
      <p>Select a quick action to jump directly to the relevant instructions.</p>
      
      <div class="cards-grid">
        <a href="#login" class="card">
          <div class="icon">🔑</div>
          <div class="title">How to Log In</div>
          <div class="desc">Access your admin account</div>
        </a>
        <a href="#homepage" class="card">
          <div class="icon">🏡</div>
          <div class="title">Update Homepage</div>
          <div class="desc">Change the hero banner & welcome</div>
        </a>
        <a href="#notices" class="card">
          <div class="icon">📢</div>
          <div class="title">Publish Notice</div>
          <div class="desc">Post a new PDF notice</div>
        </a>
        <a href="#news" class="card">
          <div class="icon">📰</div>
          <div class="title">Add News</div>
          <div class="desc">Write a new news article</div>
        </a>
        <a href="#downloads" class="card">
          <div class="icon">📁</div>
          <div class="title">Upload File</div>
          <div class="desc">Share a PDF form or brochure</div>
        </a>
        <a href="#faculty" class="card">
          <div class="icon">👨‍🏫</div>
          <div class="title">Add Faculty</div>
          <div class="desc">Add a new staff member</div>
        </a>
      </div>
      
      <h3>Most Frequently Used Tasks</h3>
      <ul>
        <li><a href="#homepage">Update the Principal's Message on the Homepage</a></li>
        <li><a href="#settings">Update College Contact Phone Number</a></li>
        <li><a href="#menus">Add a new link to the top Navigation Menu</a></li>
        <li><a href="#downloads">Upload a new PDF form for students to download</a></li>
      </ul>
    </div>

    <!-- LOGIN -->
    <div id="login" class="module searchable">
      <h2 class="module-title">🔑 How to Log In</h2>
      <div class="meta-box">
        <div class="meta-item"><span class="meta-label">Purpose:</span> Access the Admin Panel to manage website content.</div>
        <div class="meta-item"><span class="meta-label">When:</span> Every time you want to make changes to the live site.</div>
      </div>

      <div class="screenshot-frame">
        <div class="screenshot-label">
          <div class="dots"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div>
          <span>Admin Login</span>
        </div>
        <img class="screenshot-img" src="screenshots/login.png" alt="Login" />
        <div class="ann-overlay" style="top: 45%; left: 75%;">1</div>
        <div class="ann-overlay" style="top: 60%; left: 75%;">2</div>
        <div class="ann-overlay" style="top: 75%; left: 75%;">3</div>
      </div>

      <ul class="annotation-list">
        <li><span class="ann">1</span><strong>Email Field</strong> — Enter your administrator email (e.g., admin@nreccollege.ac.in).</li>
        <li><span class="ann">2</span><strong>Password Field</strong> — Enter your password. Click the eye icon to show/hide.</li>
        <li><span class="ann">3</span><strong>Sign In Button</strong> — Click to access the dashboard.</li>
      </ul>

      <h3>Step-by-Step Instructions</h3>
      <div class="steps">
        <div class="step"><div class="step-title">Open the Login Page</div><div class="step-desc">Go to <code>/admin/login</code> in your browser.</div></div>
        <div class="step"><div class="step-title">Enter Credentials</div><div class="step-desc">Type your email and password.</div></div>
        <div class="step"><div class="step-title">Click Sign In</div><div class="step-desc">You will be redirected to the Dashboard automatically.</div></div>
      </div>

      <div class="callout tip">
        <div class="icon">💡</div>
        <div>
          <div class="title">First Time Login</div>
          Use the default credentials provided by IT and change your password immediately in Settings.
        </div>
      </div>
    </div>

    <!-- DASHBOARD -->
    <div id="dashboard" class="module searchable">
      <h2 class="module-title">📊 Dashboard</h2>
      <div class="meta-box">
        <div class="meta-item"><span class="meta-label">Purpose:</span> View an overview of the website's statistics and recent activity.</div>
      </div>

      <div class="quick-actions-box">
        <span class="qa-title">Quick Actions:</span>
        <span class="qa-btn">📝 Post Notice</span>
        <span class="qa-btn">📰 Add News</span>
        <span class="qa-btn">📅 Create Event</span>
        <span class="qa-btn">👨‍🏫 Add Faculty</span>
      </div>

      <div class="screenshot-frame">
        <div class="screenshot-label">
          <div class="dots"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div>
          <span>Dashboard</span>
        </div>
        <img class="screenshot-img" src="screenshots/dashboard.png" alt="Dashboard" />
        <div class="ann-overlay" style="top: 10%; left: 8%;">1</div>
        <div class="ann-overlay" style="top: 25%; left: 50%;">2</div>
        <div class="ann-overlay" style="top: 70%; left: 40%;">3</div>
        <div class="ann-overlay" style="top: 70%; left: 85%;">4</div>
      </div>

      <ul class="annotation-list">
        <li><span class="ann">1</span><strong>Sidebar Navigation</strong> — Use this menu to access all modules. Items are grouped by category.</li>
        <li><span class="ann">2</span><strong>Statistics Cards</strong> — Shows total counts of notices, news, events, faculty, courses, departments, downloads, and gallery albums.</li>
        <li><span class="ann">3</span><strong>Quick Actions</strong> — Shortcuts to create new notices, news, events, faculty, courses, or upload files.</li>
        <li><span class="ann">4</span><strong>Recent Activities</strong> — Shows the latest records added across all modules.</li>
      </ul>
    </div>

    <!-- HOMEPAGE -->
    <div id="homepage" class="module searchable">
      <h2 class="module-title">🏡 Homepage Content</h2>
      <div class="meta-box">
        <div class="meta-item"><span class="meta-label">Purpose:</span> Manage the content that appears on the front page of the website.</div>
      </div>

      <div class="quick-actions-box">
        <span class="qa-title">Quick Actions:</span>
        <span class="qa-btn">✏️ Edit Text</span>
        <span class="qa-btn">🖼 Change Image</span>
        <span class="qa-btn">💾 Save Changes</span>
      </div>

      <div class="screenshot-frame">
        <div class="screenshot-label">
          <div class="dots"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div>
          <span>Homepage Content Editor</span>
        </div>
        <img class="screenshot-img" src="screenshots/homepage.png" alt="Homepage Content" />
        <div class="ann-overlay" style="top: 8%; left: 35%;">1</div>
        <div class="ann-overlay" style="top: 30%; left: 50%;">2</div>
        <div class="ann-overlay" style="top: 95%; left: 20%;">3</div>
      </div>

      <ul class="annotation-list">
        <li><span class="ann">1</span><strong>Welcome Section</strong> — Edit the Title and Subtitle that appear at the top of the homepage.</li>
        <li><span class="ann">2</span><strong>Principal Message</strong> — Update the Principal's name, designation, photo, and quote.</li>
        <li><span class="ann">3</span><strong>Save Button</strong> — Always click "Save Homepage Content" after making changes.</li>
      </ul>

      <h3>Step-by-Step Instructions</h3>
      <div class="steps">
        <div class="step"><div class="step-title">Navigate to Homepage</div><div class="step-desc">Click "Homepage" in the sidebar under Website Content.</div></div>
        <div class="step"><div class="step-title">Edit Content</div><div class="step-desc">Modify the Welcome Section title, Principal Message, or Advanced sections.</div></div>
        <div class="step"><div class="step-title">Save</div><div class="step-desc">Click the "Save Homepage Content" button at the bottom.</div></div>
      </div>
      
      <div class="callout tip">
        <div class="icon">💡</div>
        <div>
          <div class="title">Tip: JSON Fields</div>
          Some fields like "Paragraphs" and "College Stats" use JSON format. Format them as: <code>["Item 1", "Item 2"]</code>
        </div>
      </div>
    </div>

    <!-- PAGES -->
    <div id="pages" class="module searchable">
      <h2 class="module-title">📄 Website Pages</h2>
      <div class="meta-box">
        <div class="meta-item"><span class="meta-label">Purpose:</span> Edit the content of standard pages like About Us, History, Mission.</div>
      </div>

      <div class="screenshot-frame">
        <div class="screenshot-label">
          <div class="dots"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div>
          <span>Website Pages</span>
        </div>
        <img class="screenshot-img" src="screenshots/pages.png" alt="Website Pages" />
        <div class="ann-overlay" style="top: 15%; left: 90%;">1</div>
        <div class="ann-overlay" style="top: 50%; left: 50%;">2</div>
      </div>

      <ul class="annotation-list">
        <li><span class="ann">1</span><strong>Add New Page</strong> — Click "Add New" to create a new website page.</li>
        <li><span class="ann">2</span><strong>Page List</strong> — View, edit, or delete existing pages from this table.</li>
      </ul>
    </div>
    
    <!-- MENUS -->
    <div id="menus" class="module searchable">
      <h2 class="module-title">🧭 Website Menu</h2>
      <div class="meta-box">
        <div class="meta-item"><span class="meta-label">Purpose:</span> Control the top navigation bar of the website.</div>
      </div>
      <div class="quick-actions-box">
        <span class="qa-title">Quick Actions:</span>
        <span class="qa-btn">➕ Add Link</span>
        <span class="qa-btn">🗑 Delete Link</span>
      </div>
      <div class="screenshot-frame">
        <div class="screenshot-label">
          <div class="dots"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div>
          <span>Menu Manager</span>
        </div>
        <img class="screenshot-img" src="screenshots/menus.png" alt="Menus" />
        <div class="ann-overlay" style="top: 15%; left: 90%;">1</div>
        <div class="ann-overlay" style="top: 50%; left: 50%;">2</div>
      </div>

      <ul class="annotation-list">
        <li><span class="ann">1</span><strong>Add Menu Item</strong> — Click to add a new navigation link.</li>
        <li><span class="ann">2</span><strong>Menu Table</strong> — Drag to reorder, edit labels, or set visibility.</li>
      </ul>

      <h3>Tips</h3>
      <ul>
        <li>Keep menu labels short (1-2 words).</li>
        <li>Use the "Order" number to arrange them (lowest number appears first).</li>
      </ul>
    </div>

    <!-- DEPARTMENTS -->
    <div id="departments" class="module searchable">
      <h2 class="module-title">🏛 Departments</h2>
      <div class="meta-box">
        <div class="meta-item"><span class="meta-label">Purpose:</span> Manage academic departments (e.g. Science, Arts, Commerce).</div>
      </div>
      <div class="quick-actions-box">
        <span class="qa-title">Quick Actions:</span>
        <span class="qa-btn">➕ Add Department</span>
        <span class="qa-btn">✏️ Edit</span>
        <span class="qa-btn">🗑 Delete</span>
      </div>
      <div class="screenshot-frame">
        <div class="screenshot-label">
          <div class="dots"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div>
          <span>Departments Module</span>
        </div>
        <img class="screenshot-img" src="screenshots/departments.png" alt="Departments" />
        <div class="ann-overlay" style="top: 10%; left: 90%;">1</div>
        <div class="ann-overlay" style="top: 20%; left: 50%;">2</div>
        <div class="ann-overlay" style="top: 50%; left: 50%;">3</div>
      </div>

      <ul class="annotation-list">
        <li><span class="ann">1</span><strong>Add New Button</strong> — Click to create a new department.</li>
        <li><span class="ann">2</span><strong>Search Bar</strong> — Search departments by name.</li>
        <li><span class="ann">3</span><strong>Department List</strong> — View all departments with their details.</li>
      </ul>
    </div>

    <!-- COURSES -->
    <div id="courses" class="module searchable">
      <h2 class="module-title">🎓 Courses</h2>
      <div class="meta-box">
        <div class="meta-item"><span class="meta-label">Purpose:</span> Manage courses offered by the college.</div>
      </div>
      <div class="quick-actions-box">
        <span class="qa-title">Quick Actions:</span>
        <span class="qa-btn">➕ Add Course</span>
        <span class="qa-btn">✏️ Edit</span>
      </div>
      <div class="screenshot-frame">
        <div class="screenshot-label">
          <div class="dots"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div>
          <span>Courses Module</span>
        </div>
        <img class="screenshot-img" src="screenshots/courses.png" alt="Courses" />
        <div class="ann-overlay" style="top: 10%; left: 90%;">1</div>
        <div class="ann-overlay" style="top: 20%; left: 50%;">2</div>
        <div class="ann-overlay" style="top: 50%; left: 50%;">3</div>
      </div>

      <ul class="annotation-list">
        <li><span class="ann">1</span><strong>Add New Button</strong> — Click to create a new course.</li>
        <li><span class="ann">2</span><strong>Search Bar</strong> — Filter courses by name.</li>
        <li><span class="ann">3</span><strong>Course List</strong> — View all courses with duration, department, and status.</li>
      </ul>
    </div>

    <!-- FACULTY -->
    <div id="faculty" class="module searchable">
      <h2 class="module-title">👨‍🏫 Faculty</h2>
      <div class="meta-box">
        <div class="meta-item"><span class="meta-label">Purpose:</span> Manage the directory of teachers and staff.</div>
      </div>
      <div class="quick-actions-box">
        <span class="qa-title">Quick Actions:</span>
        <span class="qa-btn">➕ Add Faculty</span>
        <span class="qa-btn">📷 Upload Photo</span>
      </div>
      <div class="screenshot-frame">
        <div class="screenshot-label">
          <div class="dots"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div>
          <span>Faculty Module</span>
        </div>
        <img class="screenshot-img" src="screenshots/faculty.png" alt="Faculty" />
        <div class="ann-overlay" style="top: 10%; left: 90%;">1</div>
        <div class="ann-overlay" style="top: 20%; left: 50%;">2</div>
        <div class="ann-overlay" style="top: 50%; left: 50%;">3</div>
      </div>

      <ul class="annotation-list">
        <li><span class="ann">1</span><strong>Add New Button</strong> — Click to add a new faculty member.</li>
        <li><span class="ann">2</span><strong>Search & Filter</strong> — Search by name or filter by department.</li>
        <li><span class="ann">3</span><strong>Faculty Cards/List</strong> — View all faculty members with photos, designation, and department.</li>
      </ul>
    </div>
    
    <!-- CURRICULUM -->
    <div id="curriculum" class="module searchable">
      <h2 class="module-title">📚 Curriculum</h2>
      <div class="meta-box">
        <div class="meta-item"><span class="meta-label">Purpose:</span> Manage syllabi and course structures.</div>
      </div>
      <div class="quick-actions-box">
        <span class="qa-title">Quick Actions:</span>
        <span class="qa-btn">➕ Add Syllabus</span>
        <span class="qa-btn">📄 Upload PDF</span>
      </div>
      <div class="screenshot-frame">
        <div class="screenshot-label">
          <div class="dots"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div>
          <span>Curriculum Module</span>
        </div>
        <img class="screenshot-img" src="screenshots/curriculum.png" alt="Curriculum" />
        <div class="ann-overlay" style="top: 10%; left: 90%;">1</div>
        <div class="ann-overlay" style="top: 50%; left: 50%;">2</div>
      </div>

      <ul class="annotation-list">
        <li><span class="ann">1</span><strong>Add New Button</strong> — Click to add a new syllabus entry.</li>
        <li><span class="ann">2</span><strong>Curriculum List</strong> — View all syllabi with course, semester, and PDF download links.</li>
      </ul>
    </div>

    <!-- NEWS -->
    <div id="news" class="module searchable">
      <h2 class="module-title">📰 News & Articles</h2>
      <div class="meta-box">
        <div class="meta-item"><span class="meta-label">Purpose:</span> Publish campus news articles and press releases.</div>
      </div>
      <div class="quick-actions-box">
        <span class="qa-title">Quick Actions:</span>
        <span class="qa-btn">➕ Add New</span>
        <span class="qa-btn">📤 Publish/Draft</span>
      </div>
      <div class="screenshot-frame">
        <div class="screenshot-label">
          <div class="dots"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div>
          <span>News & Articles</span>
        </div>
        <img class="screenshot-img" src="screenshots/news.png" alt="News" />
        <div class="ann-overlay" style="top: 8%; left: 95%;">1</div>
        <div class="ann-overlay" style="top: 20%; left: 50%;">2</div>
        <div class="ann-overlay" style="top: 60%; left: 50%;">3</div>
      </div>

      <ul class="annotation-list">
        <li><span class="ann">1</span><strong>Add New Button</strong> — Click to write a new news article.</li>
        <li><span class="ann">2</span><strong>Search Bar</strong> — Filter news by keyword.</li>
        <li><span class="ann">3</span><strong>News List</strong> — View all news articles. Click "Add First Item" to get started.</li>
      </ul>

      <h3>Step-by-Step: Add a News Article</h3>
      <div class="steps">
        <div class="step"><div class="step-title">Click "Add New"</div><div class="step-desc">Opens a form for the new article.</div></div>
        <div class="step"><div class="step-title">Fill in Details</div><div class="step-desc">Enter the title, content, and optionally upload an image.</div></div>
        <div class="step"><div class="step-title">Set Visibility</div><div class="step-desc">Toggle "Publish to Website" if you want it to appear immediately.</div></div>
        <div class="step"><div class="step-title">Save</div><div class="step-desc">Click "Save" to publish or save as draft.</div></div>
      </div>
    </div>
    
    <!-- NOTICES -->
    <div id="notices" class="module searchable">
      <h2 class="module-title">📢 Notice Board</h2>
      <div class="meta-box">
        <div class="meta-item"><span class="meta-label">Purpose:</span> Upload important PDF notices for students, faculty, and staff.</div>
      </div>
      <div class="quick-actions-box">
        <span class="qa-title">Quick Actions:</span>
        <span class="qa-btn">➕ Add Notice</span>
        <span class="qa-btn">📄 Upload PDF</span>
      </div>
      <div class="screenshot-frame">
        <div class="screenshot-label">
          <div class="dots"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div>
          <span>Notice Board</span>
        </div>
        <img class="screenshot-img" src="screenshots/notices.png" alt="Notices" />
        <div class="ann-overlay" style="top: 10%; left: 90%;">1</div>
        <div class="ann-overlay" style="top: 50%; left: 50%;">2</div>
      </div>

      <ul class="annotation-list">
        <li><span class="ann">1</span><strong>Add New Button</strong> — Click to create a new notice.</li>
        <li><span class="ann">2</span><strong>Notice List</strong> — View all notices with title, date, and attached PDF.</li>
      </ul>
    </div>
    
    <!-- EVENTS -->
    <div id="events" class="module searchable">
      <h2 class="module-title">📅 Events</h2>
      <div class="meta-box">
        <div class="meta-item"><span class="meta-label">Purpose:</span> Add upcoming campus events, seminars, and workshops.</div>
      </div>
      <div class="quick-actions-box">
        <span class="qa-title">Quick Actions:</span>
        <span class="qa-btn">➕ Add Event</span>
        <span class="qa-btn">📅 Set Date</span>
      </div>
      <div class="screenshot-frame">
        <div class="screenshot-label">
          <div class="dots"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div>
          <span>Events Module</span>
        </div>
        <img class="screenshot-img" src="screenshots/events.png" alt="Events" />
        <div class="ann-overlay" style="top: 10%; left: 90%;">1</div>
        <div class="ann-overlay" style="top: 50%; left: 50%;">2</div>
      </div>

      <ul class="annotation-list">
        <li><span class="ann">1</span><strong>Add New Button</strong> — Click to create a new event.</li>
        <li><span class="ann">2</span><strong>Event List</strong> — View all events with title, date, location, and status.</li>
      </ul>
    </div>
    
    <!-- DOWNLOADS -->
    <div id="downloads" class="module searchable">
      <h2 class="module-title">📁 Downloads</h2>
      <div class="meta-box">
        <div class="meta-item"><span class="meta-label">Purpose:</span> Provide downloadable PDF forms, brochures, and documents for students.</div>
      </div>
      <div class="quick-actions-box">
        <span class="qa-title">Quick Actions:</span>
        <span class="qa-btn">➕ Add File</span>
        <span class="qa-btn">📄 Upload PDF</span>
      </div>
      <div class="screenshot-frame">
        <div class="screenshot-label">
          <div class="dots"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div>
          <span>Downloads Module</span>
        </div>
        <img class="screenshot-img" src="screenshots/downloads.png" alt="Downloads" />
        <div class="ann-overlay" style="top: 10%; left: 90%;">1</div>
        <div class="ann-overlay" style="top: 50%; left: 50%;">2</div>
      </div>

      <ul class="annotation-list">
        <li><span class="ann">1</span><strong>Add New Button</strong> — Click to upload a new downloadable file.</li>
        <li><span class="ann">2</span><strong>File List</strong> — View all uploaded files with title, category, and download count.</li>
      </ul>
    </div>

    <!-- MEDIA LIBRARY -->
    <div id="media" class="module searchable">
      <h2 class="module-title">🗃 Media Library</h2>
      <div class="meta-box">
        <div class="meta-item"><span class="meta-label">Purpose:</span> View and manage all uploaded files (images, PDFs, documents).</div>
      </div>
      <div class="quick-actions-box">
        <span class="qa-title">Quick Actions:</span>
        <span class="qa-btn">📤 Upload File</span>
        <span class="qa-btn">🗑 Delete</span>
      </div>
      <div class="screenshot-frame">
        <div class="screenshot-label">
          <div class="dots"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div>
          <span>Media Library</span>
        </div>
        <img class="screenshot-img" src="screenshots/media.png" alt="Media Library" />
        <div class="ann-overlay" style="top: 10%; left: 90%;">1</div>
        <div class="ann-overlay" style="top: 50%; left: 50%;">2</div>
      </div>

      <ul class="annotation-list">
        <li><span class="ann">1</span><strong>Upload Button</strong> — Click to upload a new image or file.</li>
        <li><span class="ann">2</span><strong>File Grid</strong> — View all uploaded media. Click to preview or copy the URL.</li>
      </ul>

      <div class="callout tip">
        <div class="icon">💡</div>
        <div>
          <div class="title">Image Best Practices</div>
          Upload images in JPEG or PNG format. Keep file sizes under 2MB for faster loading.
        </div>
      </div>
    </div>

    <!-- SETTINGS -->
    <div id="settings" class="module searchable">
      <h2 class="module-title">⚙️ Website Settings</h2>
      <div class="meta-box">
        <div class="meta-item"><span class="meta-label">Purpose:</span> Update global information like College Name, Email, Phone, Address, Social Links, and SEO.</div>
      </div>
      <div class="screenshot-frame">
        <div class="screenshot-label">
          <div class="dots"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div>
          <span>Website Settings</span>
        </div>
        <img class="screenshot-img" src="screenshots/settings.png" alt="Settings" />
        <div class="ann-overlay" style="top: 8%; left: 50%;">1</div>
        <div class="ann-overlay" style="top: 30%; left: 50%;">2</div>
        <div class="ann-overlay" style="top: 50%; left: 50%;">3</div>
        <div class="ann-overlay" style="top: 75%; left: 50%;">4</div>
      </div>

      <ul class="annotation-list">
        <li><span class="ann">1</span><strong>General Info</strong> — Update College Name, Address, Phone, Email, and Website URL.</li>
        <li><span class="ann">2</span><strong>Branding & Footer</strong> — Edit the footer description and copyright text.</li>
        <li><span class="ann">3</span><strong>Social Profiles</strong> — Add links to Facebook, Instagram, X (Twitter), LinkedIn, and YouTube.</li>
        <li><span class="ann">4</span><strong>Search Engine Optimization (SEO)</strong> — Set the Meta Title, Description, and Keywords for Google search results.</li>
      </ul>

      <h3>Step-by-Step: Update Phone Number</h3>
      <div class="steps">
        <div class="step"><div class="step-title">Navigate to Settings</div><div class="step-desc">Click "Website Settings" in the sidebar.</div></div>
        <div class="step"><div class="step-title">Find Phone Number</div><div class="step-desc">Scroll to the "General Info" section.</div></div>
        <div class="step"><div class="step-title">Edit & Save</div><div class="step-desc">Change the number and click "Save Settings".</div></div>
      </div>
    </div>

    <!-- HELP CENTER -->
    <div id="help" class="module searchable">
      <h2 class="module-title">❓ Help Center</h2>
      <div class="meta-box">
        <div class="meta-item"><span class="meta-label">Purpose:</span> Access documentation, FAQs, glossary, and support resources.</div>
      </div>
      <div class="screenshot-frame">
        <div class="screenshot-label">
          <div class="dots"><div class="dot red"></div><div class="dot yellow"></div><div class="dot green"></div></div>
          <span>Help Center</span>
        </div>
        <img class="screenshot-img" src="screenshots/help.png" alt="Help Center" />
        <div class="ann-overlay" style="top: 7%; left: 50%;">1</div>
        <div class="ann-overlay" style="top: 18%; left: 35%;">2</div>
        <div class="ann-overlay" style="top: 35%; left: 50%;">3</div>
        <div class="ann-overlay" style="top: 35%; left: 87%;">4</div>
        <div class="ann-overlay" style="top: 75%; left: 50%;">5</div>
      </div>

      <ul class="annotation-list">
        <li><span class="ann">1</span><strong>Search Bar</strong> — Search documentation by keyword.</li>
        <li><span class="ann">2</span><strong>Quick Links</strong> — Jump to Getting Started, Video Tutorials, or User Manuals.</li>
        <li><span class="ann">3</span><strong>FAQs</strong> — Common questions like "How do I change the Homepage slider?" answered.</li>
        <li><span class="ann">4</span><strong>Client Handover Docs</strong> — Download the Admin User Manual, API Documentation, and Postman Collection.</li>
        <li><span class="ann">5</span><strong>Glossary</strong> — Understand technical terms like "Slug / Page URL", "Visibility", "JSON Array", etc.</li>
      </ul>
    </div>

  </div>
</div>

<script>
  // Simple search functionality
  document.getElementById('searchBox').addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    const modules = document.querySelectorAll('.searchable');
    
    modules.forEach(mod => {
      const text = mod.innerText.toLowerCase();
      if (text.includes(term)) {
        mod.style.display = 'block';
      } else {
        mod.style.display = 'none';
      }
    });
    
    // Always show quick start if search is empty
    if (term === '') {
      modules.forEach(mod => mod.style.display = 'block');
    }
  });

  // Active state for sidebar
  const sections = document.querySelectorAll('.module');
  const navLinks = document.querySelectorAll('.sidebar-nav a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Sidebar Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebar = document.querySelector('.sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  function toggleSidebar() {
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('show');
  }

  hamburgerBtn.addEventListener('click', toggleSidebar);
  sidebarOverlay.addEventListener('click', toggleSidebar);

  // Close sidebar when a link is clicked on mobile
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        toggleSidebar();
      }
    });
  });
</script>

</body>
</html>
`;

fs.writeFileSync(manualPath, html);
console.log('Successfully generated Admin_User_Manual.html');
