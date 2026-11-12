<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Registration Portal | VTU Web Technology</title>
    <!-- External Stylesheet -->
    <link rel="stylesheet" href="style.css">
    <!-- jQuery Library (CDN) -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
</head>
<body>

    <div class="container">
        <!-- College Header Banner -->
        <header class="college-header">
            <div class="college-emblem">🎓</div>
            <h1>VTU Institute of Technology</h1>
            <p>Department of Computer Science &amp; Engineering</p>
            <span class="portal-tag">Official Student Registration Portal &bull; AY 2024-2025</span>
        </header>

        <!-- Main Form Card -->
        <main class="card">
            <div class="form-intro">
                <h2>New Student Enrollment Form</h2>
                <p>Please fill in all mandatory details accurately. All fields marked with (<span class="required">*</span>) are required.</p>
            </div>

            <!-- Registration Form -->
            <form id="studentForm" action="process.php" method="POST" novalidate>
                <div class="form-grid">

                    <!-- 1. Full Name -->
                    <div class="form-group">
                        <label for="fullName">Full Name <span class="required">*</span></label>
                        <input type="text" id="fullName" name="fullName" class="form-control" placeholder="e.g. Rahul Sharma" autocomplete="name">
                        <small class="error-msg" id="fullNameError"></small>
                        <span class="field-hint">Enter your full name as per matriculation records</span>
                    </div>

                    <!-- 2. USN / Registration Number -->
                    <div class="form-group">
                        <label for="usn">USN / Registration No. <span class="required">*</span></label>
                        <input type="text" id="usn" name="usn" class="form-control" placeholder="e.g. 1MS21CS045" style="text-transform: uppercase;" autocomplete="off" maxlength="15">
                        <small class="error-msg" id="usnError"></small>
                        <span class="field-hint">e.g. 10-character VTU format (1MS21CS045)</span>
                    </div>

                    <!-- 3. Email Address -->
                    <div class="form-group">
                        <label for="email">Email Address <span class="required">*</span></label>
                        <input type="email" id="email" name="email" class="form-control" placeholder="e.g. student@college.edu" autocomplete="email">
                        <small class="error-msg" id="emailError"></small>
                        <span class="field-hint">Official or personal active email address</span>
                    </div>

                    <!-- 4. Mobile Number -->
                    <div class="form-group">
                        <label for="mobile">Mobile Number <span class="required">*</span></label>
                        <input type="tel" id="mobile" name="mobile" class="form-control" placeholder="e.g. 9876543210" maxlength="10" autocomplete="tel">
                        <small class="error-msg" id="mobileError"></small>
                        <span class="field-hint">10-digit valid Indian contact number</span>
                    </div>

                    <!-- 5. Date of Birth -->
                    <div class="form-group">
                        <label for="dob">Date of Birth <span class="required">*</span></label>
                        <input type="date" id="dob" name="dob" class="form-control">
                        <small class="error-msg" id="dobError"></small>
                        <span class="field-hint">Select your birth date</span>
                    </div>

                    <!-- 6. Gender -->
                    <div class="form-group">
                        <label>Gender <span class="required">*</span></label>
                        <div class="radio-group" id="genderGroup">
                            <label class="radio-option">
                                <input type="radio" name="gender" value="Male"> Male
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="gender" value="Female"> Female
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="gender" value="Other"> Other
                            </label>
                        </div>
                        <small class="error-msg" id="genderError"></small>
                    </div>

                    <!-- 7. Branch -->
                    <div class="form-group">
                        <label for="branch">Engineering Branch <span class="required">*</span></label>
                        <select id="branch" name="branch" class="form-control">
                            <option value="">-- Select Branch --</option>
                            <option value="Computer Science &amp; Engineering (CSE)">Computer Science &amp; Engineering (CSE)</option>
                            <option value="Information Science &amp; Engineering (ISE)">Information Science &amp; Engineering (ISE)</option>
                            <option value="Artificial Intelligence &amp; Machine Learning (AIML)">Artificial Intelligence &amp; Machine Learning (AIML)</option>
                            <option value="Electronics &amp; Communication Engineering (ECE)">Electronics &amp; Communication Engineering (ECE)</option>
                            <option value="Mechanical Engineering (ME)">Mechanical Engineering (ME)</option>
                            <option value="Civil Engineering (CV)">Civil Engineering (CV)</option>
                        </select>
                        <small class="error-msg" id="branchError"></small>
                    </div>

                    <!-- 8. Semester -->
                    <div class="form-group">
                        <label for="semester">Current Semester <span class="required">*</span></label>
                        <select id="semester" name="semester" class="form-control">
                            <option value="">-- Select Semester --</option>
                            <option value="1st Semester">1st Semester</option>
                            <option value="2nd Semester">2nd Semester</option>
                            <option value="3rd Semester">3rd Semester</option>
                            <option value="4th Semester">4th Semester</option>
                            <option value="5th Semester">5th Semester</option>
                            <option value="6th Semester">6th Semester</option>
                            <option value="7th Semester">7th Semester</option>
                            <option value="8th Semester">8th Semester</option>
                        </select>
                        <small class="error-msg" id="semesterError"></small>
                    </div>

                    <!-- 9. Address -->
                    <div class="form-group full-width">
                        <label for="address">Permanent Address <span class="required">*</span></label>
                        <textarea id="address" name="address" class="form-control" rows="3" placeholder="Enter complete residential address with City, State and PIN Code..."></textarea>
                        <small class="error-msg" id="addressError"></small>
                    </div>

                </div>

                <!-- Form Action Buttons -->
                <div class="form-actions">
                    <button type="submit" id="submitBtn" class="btn btn-primary">
                        <span>Submit Registration</span>
                    </button>
                    <button type="reset" id="resetBtn" class="btn btn-secondary">
                        <span>Reset Form</span>
                    </button>
                </div>
            </form>
        </main>

        <!-- Footer -->
        <footer class="portal-footer">
            <p>&copy; 2024-2025 VTU Institute of Technology. Designed for Web Technology Laboratory Assignment.</p>
        </footer>
    </div>

    <!-- Client-Side Validation Script (JavaScript + jQuery) -->
    <script src="script.js"></script>
</body>
</html>
