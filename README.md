# Student Registration Web Application

A clean, responsive, and professional **Student Registration Web Application** built for the **VTU Web Technology Laboratory Assignment**.

The application demonstrates client-side form validation, dynamic user feedback, server-side data sanitization, and structured registration receipt rendering using **HTML5, CSS3, JavaScript, jQuery, and PHP**.

---

## 📁 Project Folder Structure

```text
student-registration/
│
├── index.php           # Student registration form (HTML5 + PHP wrapper + jQuery CDN)
├── process.php         # Server-side data processing, sanitization & details rendering (PHP)
├── style.css           # Styling, color theme, typography & responsive layouts (CSS3)
├── script.js           # Client-side validation logic & DOM events (JavaScript + jQuery)
├── Dockerfile          # Configuration for Render deployment & Docker containerization
├── .dockerignore       # Ignored files for container builds
└── README.md           # Documentation, viva guide, and deployment steps
```

---

## 🛠️ Technology Stack & Role Explanation (For Lab Viva)

During your practical examination, you can explain each technology's exact role in this project as follows:

### 1. HTML5 (Structure)
- **Role**: Provides the semantic skeleton and input elements of the web portal.
- **Key Tags Used**:
  - `<form action="process.php" method="POST" novalidate>`: Packages inputs for secure POST transmission. The `novalidate` attribute turns off default browser tooltips so our custom JavaScript/jQuery validation handles feedback.
  - `<input type="text|email|tel|date|radio">`: Semantic input elements tailored for student attributes.
  - `<select>` and `<option>`: Standard dropdowns for Branch and Semester selection.
  - `<textarea>`: Multi-line address input.
  - `<button type="submit">` and `<button type="reset">`: Dedicated buttons for submission and form clearing.

### 2. CSS3 (Styling & Responsiveness)
- **Role**: Implements the official academic theme, visual hierarchy, and cross-device responsiveness.
- **Key Features**:
  - **Color Palette**: Clean white background (`#ffffff`), soft grey-blue page tone (`#f0f4f8`), and primary navy/royal blue accents (`#1a365d`, `#2b6cb0`).
  - **CSS Grid & Flexbox**: Two-column responsive grid on desktop (`.form-grid`) that cleanly collapses into a single column on mobile devices (`@media (max-width: 768px)`).
  - **Dynamic State Classes**: Visually distinguishes invalid inputs with red borders (`.is-invalid`) and valid inputs with green borders (`.is-valid`).
  - **Interactive Micro-interactions**: Hover elevations (`transform: translateY(-1px)`) and focus glow rings (`box-shadow: 0 0 0 3px rgba(43, 108, 176, 0.2)`).
  - **Print Media Query**: Dedicated `@media print` rules hide buttons and format the registration acknowledgment slip for clean printing/PDF export.

### 3. JavaScript (Client-side Validation Logic)
- **Role**: Implements validation algorithms, format checks, and business rules before data leaves the user's browser.
- **Key Functions & Regex Patterns**:
  - **Student Name**: `/^[A-Za-z\s.]{3,50}$/` (restricts input to alphabets, dots, spaces, min 3 characters).
  - **USN Format**: `/^[1-4][A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}$/` (standard 10-character VTU format like `1MS21CS045`) with uppercase conversion.
  - **Email Format**: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/` (verifies structure: username, `@`, domain, and valid TLD).
  - **Mobile Number**: `/^[6-9]\d{9}$/` (strictly 10 digits starting with 6, 7, 8, or 9).
  - **Date of Birth & Age Calculation**: Uses the JavaScript `Date` object to check that the selected date is in the past and confirms the student's age is between 15 and 60 years.

### 4. jQuery (DOM Interaction & Event Handling)
- **Role**: Simplifies DOM selection, event binding, dynamic styling, and user feedback animations.
- **Key Usages**:
  - `$(document).ready(...)`: Ensures the script executes only after the entire DOM tree is loaded.
  - Real-time Event Binding: `.on('input blur', ...)` and `.on('change', ...)` for instantaneous feedback as the user types.
  - Keystroke Filtering: Intercepts `keypress` on the mobile number field to reject non-digit keystrokes.
  - Form Submission Interception: `$('#studentForm').on('submit', function(e) { ... })` cancels submission with `e.preventDefault()` if validation fails.
  - Smooth Scrolling: `$('html, body').animate({ scrollTop: ... }, 400)` smoothly navigates to the first erroneous field.
  - Reset Handling: `$('#resetBtn').on('click', ...)` flushes error labels and validation CSS classes.

### 5. PHP (Server-Side Processing & Sanitization)
- **Role**: Securely handles the incoming HTTP POST request, sanitizes inputs to prevent security vulnerabilities, and dynamically generates the confirmation receipt.
- **Key Operations**:
  - **Access Guard**: Confirms `$_SERVER['REQUEST_METHOD'] === 'POST'`; blocks direct GET requests with a polite redirect.
  - **Sanitization Function**:
    ```php
    function sanitize_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
        return $data;
    }
    ```
    Strips whitespace, backslashes, and converts characters like `<` and `>` into HTML entities to eliminate Cross-Site Scripting (XSS).
  - **Server-Side Validation**: Secondary validation with `filter_var($email, FILTER_VALIDATE_EMAIL)` and `preg_match()` to safeguard against bypassed client-side scripts.
  - **Receipt Generation**: Constructs an enrollment reference number (e.g. `VTU-2024-CS045-812`), formats dates, and renders the submitted data into a clean confirmation card.

---

## 💻 How to Run Locally on a MacBook

You have multiple easy ways to run this project on macOS:

### Method 1: Using PHP's Built-in Web Server (Recommended)

1. Open **Terminal** on your Mac.
2. Check if PHP is installed:
   ```bash
   php -v
   ```
   *Note: If macOS displays `command not found: php`, install PHP via Homebrew:*
   ```bash
   brew install php
   ```
3. Navigate to the project folder:
   ```bash
   cd /Users/suryagautam/.gemini/antigravity/scratch/student-registration
   ```
4. Start the local PHP development server:
   ```bash
   php -S localhost:8000
   ```
5. Open your web browser (Safari or Chrome) and visit:
   ```text
   http://localhost:8000
   ```

---

### Method 2: Using XAMPP or MAMP on macOS

1. Download and install **XAMPP** (or **MAMP**) for macOS.
2. Copy the `student-registration` folder to:
   - For XAMPP: `/Applications/XAMPP/xamppfiles/htdocs/student-registration`
   - For MAMP: `/Applications/MAMP/htdocs/student-registration`
3. Launch the XAMPP/MAMP control panel and start the **Apache Web Server**.
4. Visit `http://localhost/student-registration/index.php` in your browser.

---

### Method 3: Using Docker on macOS

If you have Docker Desktop installed:
```bash
cd /Users/suryagautam/.gemini/antigravity/scratch/student-registration
docker build -t student-registration .
docker run -d -p 8000:80 --name student-reg-app student-registration
```
Then visit `http://localhost:8000`.

---

## 🚀 How to Deploy on Render (Step-by-Step)

Render is a cloud hosting platform that offers free hosting for web services. Since this project includes a standard `Dockerfile`, Render can deploy it automatically.

### Step 1: Initialize Git and Push to GitHub

1. Open your Terminal:
   ```bash
   cd /Users/suryagautam/.gemini/antigravity/scratch/student-registration
   git init
   git add .
   git commit -m "Initial commit: Student Registration Web Application"
   ```
2. Go to [GitHub](https://github.com) and create a new repository named `student-registration`.
3. Push your local project to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/student-registration.git
   git branch -M main
   git push -u origin main
   ```

---

### Step 2: Create a Web Service on Render

1. Visit [Render.com](https://render.com) and sign in (you can use your GitHub account).
2. On your Render Dashboard, click the **New +** button in the top right corner and select **Web Service**.
3. Under **Connect a repository**, find and select your `student-registration` repository.
4. Configure the Web Service settings:
   - **Name**: `student-registration-vtu` (or any unique name).
   - **Region**: Choose the closest region (e.g., *Singapore* or *Oregon*).
   - **Branch**: `main`
   - **Runtime**: Select **Docker** (Render will detect the `Dockerfile` in the root of the repository).
   - **Instance Type**: Select **Free** ($0/month).
5. Scroll to the bottom and click **Create Web Service**.

---

### Step 3: Deployment & Public URL

1. Render will automatically build the Docker container using PHP 8.2 and Apache.
2. In 1 to 2 minutes, you will see a green badge indicating:
   ```text
   ==> Your service is live 🎉
   ```
3. Your public live URL will appear directly below the service name at the top:
   ```text
   https://student-registration-vtu.onrender.com
   ```
4. You can share this URL with your professor or lab examiner.

---

## 🧪 Sample Test Data for Demonstration

### Valid Test Case:
- **Full Name**: `Rahul Sharma`
- **USN**: `1MS21CS045`
- **Email**: `rahul.sharma@college.edu`
- **Mobile**: `9876543210`
- **Date of Birth**: `2003-05-15`
- **Gender**: `Male`
- **Branch**: `Computer Science & Engineering (CSE)`
- **Semester**: `5th Semester`
- **Address**: `#142, 3rd Cross, Rajajinagar, Bengaluru, Karnataka - 560010`

### Invalid Edge Cases (to demonstrate client & server validation):
1. **Empty Fields**: Click "Submit Registration" directly with blank fields to trigger red error messages and smooth scrolling.
2. **Invalid Mobile**: Enter `12345` or `5555555555` to see the Indian phone validation error.
3. **Invalid USN**: Enter `XYZ` to trigger the USN format error.
4. **Future DOB**: Pick a future date to show the age validation error.
5. **Direct GET Request**: Navigate to `process.php` directly in the browser to show the access restriction guard.
