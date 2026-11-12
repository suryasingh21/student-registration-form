/**
 * ============================================================================
 * Local Development Server for Student Registration Portal
 * Zero external dependencies (uses standard Node.js built-in modules)
 * Enables immediate local running & testing on macOS
 * ============================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const PORT = process.env.PORT || 8000;
const BASE_DIR = __dirname;

// Helper to escape HTML characters (mimics PHP htmlspecialchars)
function htmlspecialchars(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    // Route: Static CSS
    if (pathname === '/style.css') {
        const filePath = path.join(BASE_DIR, 'style.css');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end('style.css not found');
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
        return;
    }

    // Route: Static JS
    if (pathname === '/script.js') {
        const filePath = path.join(BASE_DIR, 'script.js');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end('script.js not found');
            }
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
        });
        return;
    }

    // Route: Registration Form (GET / or GET /index.php)
    if (pathname === '/' || pathname === '/index.php') {
        const filePath = path.join(BASE_DIR, 'index.php');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error reading index.php');
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });
        return;
    }

    // Route: process.php
    if (pathname === '/process.php') {
        if (req.method === 'GET') {
            // Direct access without form submission
            const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Confirmation | VTU Web Technology</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="college-header">
            <div class="college-emblem">🎓</div>
            <h1>VTU Institute of Technology</h1>
            <p>Department of Computer Science &amp; Engineering</p>
            <span class="portal-tag">Official Student Registration Portal &bull; AY 2024-2025</span>
        </header>
        <main class="card">
            <div class="error-banner">
                <h3>Direct Access Restricted</h3>
                <p>No registration data was received. Please fill out the registration form first.</p>
            </div>
            <div class="form-actions">
                <a href="index.php" class="btn btn-primary">Go to Registration Form</a>
            </div>
        </main>
        <footer class="portal-footer">
            <p>&copy; 2024-2025 VTU Institute of Technology. Server-side processing executed via PHP.</p>
        </footer>
    </div>
</body>
</html>`;
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            return res.end(html);
        }

        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                const post = querystring.parse(body);

                // Sanitization
                const fullName = htmlspecialchars((post.fullName || '').trim());
                const usn = htmlspecialchars((post.usn || '').trim().toUpperCase());
                const email = htmlspecialchars((post.email || '').trim());
                const mobile = htmlspecialchars((post.mobile || '').trim());
                const dob = htmlspecialchars((post.dob || '').trim());
                const gender = htmlspecialchars((post.gender || '').trim());
                const branch = htmlspecialchars((post.branch || '').trim());
                const semester = htmlspecialchars((post.semester || '').trim());
                const address = htmlspecialchars((post.address || '').trim());

                // Validation
                const errors = [];
                if (!fullName || !/^[a-zA-Z\s.]{3,50}$/.test(fullName)) {
                    errors.push('Full Name must contain only alphabets and be at least 3 characters.');
                }
                if (!usn || !/^[1-4A-Z0-9]{8,15}$/.test(usn)) {
                    errors.push('USN format is invalid. Must be 8 to 15 alphanumeric characters.');
                }
                if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                    errors.push('Please provide a valid email address.');
                }
                if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
                    errors.push('Mobile number must be a 10-digit number starting with 6, 7, 8, or 9.');
                }
                if (!dob) {
                    errors.push('Date of Birth is required.');
                } else if (new Date(dob) >= new Date()) {
                    errors.push('Date of birth cannot be today or in the future.');
                }
                if (!gender || !['Male', 'Female', 'Other'].includes(gender)) {
                    errors.push('Please select a valid gender option.');
                }
                if (!branch) errors.push('Engineering Branch selection is required.');
                if (!semester) errors.push('Semester selection is required.');
                if (!address || address.length < 10) {
                    errors.push('Address must be at least 10 characters long.');
                }

                if (errors.length > 0) {
                    const errorList = errors.map(e => `<li>${e}</li>`).join('');
                    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Confirmation | VTU Web Technology</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="college-header">
            <div class="college-emblem">🎓</div>
            <h1>VTU Institute of Technology</h1>
            <p>Department of Computer Science &amp; Engineering</p>
            <span class="portal-tag">Official Student Registration Portal &bull; AY 2024-2025</span>
        </header>
        <main class="card">
            <div class="error-banner">
                <h3>Submission Incomplete</h3>
                <p>Please resolve the following error(s) and resubmit the form:</p>
                <ul style="margin-top: 10px;">${errorList}</ul>
            </div>
            <div class="form-actions">
                <a href="javascript:history.back()" class="btn btn-secondary">Go Back &amp; Correct</a>
                <a href="index.php" class="btn btn-primary">New Registration</a>
            </div>
        </main>
        <footer class="portal-footer">
            <p>&copy; 2024-2025 VTU Institute of Technology. Server-side processing executed via PHP.</p>
        </footer>
    </div>
</body>
</html>`;
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    return res.end(html);
                }

                // Success Response
                const regId = 'VTU-' + new Date().getFullYear() + '-' + usn.slice(-4) + '-' + Math.floor(100 + Math.random() * 900);
                const regTime = new Date().toLocaleString('en-IN', {
                    day: '2-digit', month: 'short', year: 'numeric',
                    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
                });

                const formattedDob = new Date(dob).toLocaleDateString('en-GB', {
                    day: '2-digit', month: 'long', year: 'numeric'
                });

                const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Confirmation | VTU Web Technology</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="college-header">
            <div class="college-emblem">🎓</div>
            <h1>VTU Institute of Technology</h1>
            <p>Department of Computer Science &amp; Engineering</p>
            <span class="portal-tag">Official Student Registration Portal &bull; AY 2024-2025</span>
        </header>
        <main class="card">
            <div class="success-banner">
                <div class="badge-icon">&#10004;</div>
                <div>
                    <h3>Student Registration Successful!</h3>
                    <p>The student enrollment details have been processed and confirmed on the server.</p>
                </div>
            </div>

            <div class="details-meta">
                <span><strong>Ref ID:</strong> ${regId}</span>
                <span><strong>Date &amp; Time:</strong> ${regTime}</span>
            </div>

            <table class="details-table">
                <tbody>
                    <tr>
                        <th>Student Full Name</th>
                        <td><strong>${fullName}</strong></td>
                    </tr>
                    <tr>
                        <th>USN / Reg No.</th>
                        <td><span class="usn-badge">${usn}</span></td>
                    </tr>
                    <tr>
                        <th>Email Address</th>
                        <td>${email}</td>
                    </tr>
                    <tr>
                        <th>Mobile Number</th>
                        <td>+91 ${mobile}</td>
                    </tr>
                    <tr>
                        <th>Date of Birth</th>
                        <td>${formattedDob}</td>
                    </tr>
                    <tr>
                        <th>Gender</th>
                        <td>${gender}</td>
                    </tr>
                    <tr>
                        <th>Department / Branch</th>
                        <td>${branch}</td>
                    </tr>
                    <tr>
                        <th>Current Semester</th>
                        <td>${semester}</td>
                    </tr>
                    <tr>
                        <th>Permanent Address</th>
                        <td>${address.replace(/\n/g, '<br>')}</td>
                    </tr>
                </tbody>
            </table>

            <div class="form-actions">
                <a href="index.php" class="btn btn-primary">
                    <span>&larr; Register Another Student</span>
                </a>
                <button type="button" onclick="window.print()" class="btn btn-print">
                    <span>&#128438; Print Acknowledgment</span>
                </button>
            </div>
        </main>
        <footer class="portal-footer">
            <p>&copy; 2024-2025 VTU Institute of Technology. Server-side processing executed via PHP.</p>
        </footer>
    </div>
</body>
</html>`;
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(html);
            });
            return;
        }
    }

    // Default 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Student Registration Server is running at http://localhost:${PORT}`);
});
