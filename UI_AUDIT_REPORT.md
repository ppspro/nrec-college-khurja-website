# UI/UX Visual Audit Report

## 1. Individual Page Audits & Scores

### Homepage (`/`)
* **Screenshot**: `homepage_1783607447943.png`
* **Score**: 7/10
* **Problems**:
  * Empty sections for news, notices, and photo gallery due to backend CMS server connection errors.
  * Console throws Axios network errors continuously trying to reach backend API.
* **Required Fix**:
  * Implement mock static data fallback cards for the news, notices, and gallery sections if the backend CMS returns empty or is offline.
  * Ensure hero slider has stable CSS layout transitions.

### About Us (`/about`)
* **Screenshot**: `about_1783607197839.png`
* **Score**: 5/10
* **Problems**:
  * Layout elements and content styling look generic and resemble a simple text dump.
  * Employs basic text layouts instead of highlighting visual badges.
* **Required Fix**:
  * Upgrade `HeritageTemplate` to structure the "Excellence, Heritage, Commitment" values into premium themed feature cards.

### History (`/history`)
* **Screenshot**: `history_1783607460887.png`
* **Score**: 4/10
* **Problems**:
  * Timeline lacks timeline connector lines, bullets, and visual milestone year badges.
  * Feels like a copy-paste of standard paragraphs.
* **Required Fix**:
  * Implement standard timeline nodes with year flags and vertical connecting borders in `Timeline` view.

### Principal's Message (`/principal-message`)
* **Screenshot**: `principal_1783607342249.png`
* **Score**: 5/10
* **Problems**:
  * No portrait image or profile card for the Principal. It is purely plain text.
* **Required Fix**:
  * Render a professional profile layout for `/principal-message` with an image placeholder on the left and the signature/official seal below the message block.

### Academic Departments (`/departments`)
* **Screenshot**: `departments_1783607373047.png`
* **Score**: 3/10
* **Problems**:
  * Completely empty with a generic "No Departments Found" fallback.
* **Required Fix**:
  * Inject a robust default static array of major departments (Science, Arts, Commerce, etc.) if the API response is empty.

### Our Faculty (`/faculty`)
* **Screenshot**: `faculty_1783607383865.png`
* **Score**: 3/10
* **Problems**:
  * Empty state "No faculty members found" when offline.
* **Required Fix**:
  * Pre-populate with standard core administrative officers (Principal, Registrar, Proctor) as default fallback.

### Campus Admissions (`/admissions`)
* **Screenshot**: `admissions_1783607397346.png`
* **Score**: 6/10
* **Problems**:
  * Plain text description of admission rules. No visual path guiding the user through steps.
* **Required Fix**:
  * Integrate a clean visual Admissions Stepper (Step 1: Registration, Step 2: Verification, Step 3: Payment).

### Central Library (`/library`)
* **Screenshot**: `library_1783607407862.png`
* **Score**: 6/10
* **Problems**:
  * Pure text blocks. References digital catalogs but lacks clean click actions.
* **Required Fix**:
  * Design a Library Stats grid and link buttons to digital catalogs (N-LIST).

### Campus Gallery (`/gallery`)
* **Screenshot**: `gallery_1783607417846.png`
* **Score**: 3/10
* **Problems**:
  * Empty state "No images found".
* **Required Fix**:
  * Set up fallback stock campus images so the gallery page displays grid cards even on fresh installs.

### Notice Board (`/notices`)
* **Screenshot**: `notices_1783607429117.png`
* **Score**: 3/10
* **Problems**:
  * Empty state "No notices found".
* **Required Fix**:
  * Populates a list of default mock academic notice entries.

### Contact Us (`/contact`)
* **Screenshot**: `contact_1783607261142.png`
* **Score**: 7/10
* **Problems**:
  * Missing an interactive map iframe.
* **Required Fix**:
  * Embed a styled Google Maps location frame matching NREC's Khurja coordinates.
