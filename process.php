<?php
/**
 * ============================================================================
 * Student Registration - Server-Side Processing
 * File: process.php
 * Technologies: PHP (Data Sanitization, Server-side Validation, Output Rendering)
 * VTU Web Technology Laboratory
 * ============================================================================
 */

// Function to sanitize user inputs to prevent XSS (Cross-Site Scripting)
function sanitize_input($data) {
    if ($data === null) {
        return '';
    }
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Variables to hold sanitized data and error messages
$errors = [];
$is_submitted = ($_SERVER["REQUEST_METHOD"] === "POST");

$fullName = '';
$usn      = '';
$email    = '';
$mobile   = '';
$dob      = '';
$gender   = '';
$branch   = '';
$semester = '';
$address  = '';
$regId    = '';
$regTime  = '';

if ($is_submitted) {
    // 1. Sanitize all POST inputs
    $fullName = isset($_POST['fullName']) ? sanitize_input($_POST['fullName']) : '';
    $usn      = isset($_POST['usn'])      ? strtoupper(sanitize_input($_POST['usn'])) : '';
    $email    = isset($_POST['email'])    ? sanitize_input($_POST['email']) : '';
    $mobile   = isset($_POST['mobile'])   ? sanitize_input($_POST['mobile']) : '';
    $dob      = isset($_POST['dob'])      ? sanitize_input($_POST['dob']) : '';
    $gender   = isset($_POST['gender'])   ? sanitize_input($_POST['gender']) : '';
    $branch   = isset($_POST['branch'])   ? sanitize_input($_POST['branch']) : '';
    $semester = isset($_POST['semester']) ? sanitize_input($_POST['semester']) : '';
    $address  = isset($_POST['address'])  ? sanitize_input($_POST['address']) : '';

    // 2. Server-side Validation

    // Full Name check
    if (empty($fullName)) {
        $errors[] = "Student Full Name is required.";
    } elseif (!preg_match("/^[a-zA-Z\s.]{3,50}$/", $fullName)) {
        $errors[] = "Full Name must contain only alphabets and be at least 3 characters.";
    }

    // USN check
    if (empty($usn)) {
        $errors[] = "USN / Registration Number is required.";
    } elseif (!preg_match("/^[1-4A-Z0-9]{8,15}$/", $usn)) {
        $errors[] = "USN format is invalid. Must be 8 to 15 alphanumeric characters.";
    }

    // Email check
    if (empty($email)) {
        $errors[] = "Email Address is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Please provide a valid email address.";
    }

    // Mobile Number check
    if (empty($mobile)) {
        $errors[] = "Mobile Number is required.";
    } elseif (!preg_match("/^[6-9]\d{9}$/", $mobile)) {
        $errors[] = "Mobile number must be a 10-digit number starting with 6, 7, 8, or 9.";
    }

    // Date of Birth check
    if (empty($dob)) {
        $errors[] = "Date of Birth is required.";
    } else {
        $birthTimestamp = strtotime($dob);
        $todayTimestamp = time();
        if ($birthTimestamp >= $todayTimestamp) {
            $errors[] = "Date of birth cannot be today or in the future.";
        }
    }

    // Gender check
    $allowed_genders = ['Male', 'Female', 'Other'];
    if (empty($gender) || !in_array($gender, $allowed_genders)) {
        $errors[] = "Please select a valid gender option.";
    }

    // Branch check
    if (empty($branch)) {
        $errors[] = "Engineering Branch selection is required.";
    }

    // Semester check
    if (empty($semester)) {
        $errors[] = "Semester selection is required.";
    }

    // Address check
    if (empty($address)) {
        $errors[] = "Permanent Address is required.";
    } elseif (strlen($address) < 10) {
        $errors[] = "Address must be at least 10 characters long.";
    }

    // If all validation passed, generate registration metadata
    if (empty($errors)) {
        $regId   = 'VTU-' . date('Y') . '-' . strtoupper(substr(preg_replace('/[^A-Za-z0-9]/', '', $usn), -4)) . '-' . rand(100, 999);
        $regTime = date('d-M-Y h:i:s A');
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Confirmation | VTU Web Technology</title>
    <!-- Same CSS for consistent styling -->
    <link rel="stylesheet" href="style.css">
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

        <!-- Main Confirmation Card -->
        <main class="card">
            <?php if (!$is_submitted): ?>
                <!-- Direct access without form submission -->
                <div class="error-banner">
                    <h3>Direct Access Restricted</h3>
                    <p>No registration data was received. Please fill out the registration form first.</p>
                </div>
                <div class="form-actions">
                    <a href="index.php" class="btn btn-primary">Go to Registration Form</a>
                </div>

            <?php elseif (!empty($errors)): ?>
                <!-- Server-Side Validation Failure -->
                <div class="error-banner">
                    <h3>Submission Incomplete</h3>
                    <p>Please resolve the following error(s) and resubmit the form:</p>
                    <ul style="margin-top: 10px;">
                        <?php foreach ($errors as $error): ?>
                            <li><?php echo $error; ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <div class="form-actions">
                    <a href="javascript:history.back()" class="btn btn-secondary">Go Back &amp; Correct</a>
                    <a href="index.php" class="btn btn-primary">New Registration</a>
                </div>

            <?php else: ?>
                <!-- Successful Registration View -->
                <div class="success-banner">
                    <div class="badge-icon">&#10004;</div>
                    <div>
                        <h3>Student Registration Successful!</h3>
                        <p>The student enrollment details have been processed and confirmed on the server.</p>
                    </div>
                </div>

                <div class="details-meta">
                    <span><strong>Ref ID:</strong> <?php echo htmlspecialchars($regId); ?></span>
                    <span><strong>Date &amp; Time:</strong> <?php echo htmlspecialchars($regTime); ?></span>
                </div>

                <!-- Registration Details Table -->
                <table class="details-table">
                    <tbody>
                        <tr>
                            <th>Student Full Name</th>
                            <td><strong><?php echo $fullName; ?></strong></td>
                        </tr>
                        <tr>
                            <th>USN / Reg No.</th>
                            <td><span class="usn-badge"><?php echo $usn; ?></span></td>
                        </tr>
                        <tr>
                            <th>Email Address</th>
                            <td><?php echo $email; ?></td>
                        </tr>
                        <tr>
                            <th>Mobile Number</th>
                            <td>+91 <?php echo $mobile; ?></td>
                        </tr>
                        <tr>
                            <th>Date of Birth</th>
                            <td><?php echo date('d-F-Y', strtotime($dob)); ?></td>
                        </tr>
                        <tr>
                            <th>Gender</th>
                            <td><?php echo $gender; ?></td>
                        </tr>
                        <tr>
                            <th>Department / Branch</th>
                            <td><?php echo $branch; ?></td>
                        </tr>
                        <tr>
                            <th>Current Semester</th>
                            <td><?php echo $semester; ?></td>
                        </tr>
                        <tr>
                            <th>Permanent Address</th>
                            <td><?php echo nl2br($address); ?></td>
                        </tr>
                    </tbody>
                </table>

                <!-- Action Buttons -->
                <div class="form-actions">
                    <a href="index.php" class="btn btn-primary">
                        <span>&larr; Register Another Student</span>
                    </a>
                    <button type="button" onclick="window.print()" class="btn btn-print">
                        <span>&#128438; Print Acknowledgment</span>
                    </button>
                </div>
            <?php endif; ?>
        </main>

        <!-- Footer -->
        <footer class="portal-footer">
            <p>&copy; 2024-2025 VTU Institute of Technology. Server-side processing executed via PHP.</p>
        </footer>
    </div>

</body>
</html>
