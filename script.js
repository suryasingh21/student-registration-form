/**
 * ============================================================================
 * Student Registration Form - Client-side Validation & Interactions
 * Technologies: JavaScript (Validation Logic & Regex) + jQuery (DOM & Events)
 * VTU Web Technology Laboratory
 * ============================================================================
 */

$(document).ready(function () {

    // Helper functions to show and clear error messages using jQuery
    function showError(elementId, errorId, message) {
        var $el = $(elementId);
        var $err = $(errorId);

        $el.addClass('is-invalid').removeClass('is-valid');
        $err.text(message).fadeIn(200);
    }

    function showSuccess(elementId, errorId) {
        var $el = $(elementId);
        var $err = $(errorId);

        $el.removeClass('is-invalid').addClass('is-valid');
        $err.text('').hide();
    }

    // -------------------------------------------------------------------------
    // 1. Validation Logic (JavaScript Functions)
    // -------------------------------------------------------------------------

    // Validate Student Full Name (Only letters, spaces, and periods; min 3 chars)
    function validateFullName() {
        var name = $('#fullName').val().trim();
        var nameRegex = /^[A-Za-z\s.]{3,50}$/;

        if (name === '') {
            showError('#fullName', '#fullNameError', 'Full Name is required.');
            return false;
        } else if (!nameRegex.test(name)) {
            showError('#fullName', '#fullNameError', 'Please enter a valid name (minimum 3 alphabetic characters).');
            return false;
        } else {
            showSuccess('#fullName', '#fullNameError');
            return true;
        }
    }

    // Validate USN / Registration Number
    // Standard VTU format: 10 chars, e.g., 1MS21CS045 or generic alphanumeric (8-12 chars)
    function validateUSN() {
        var usn = $('#usn').val().trim().toUpperCase();
        $('#usn').val(usn); // Keep uppercase in the field

        // Regex for VTU USN: e.g., 1MS21CS045 or 1RV22AI001
        var vtuRegex = /^[1-4][A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}$/;
        // Generalized college registration format: 8 to 12 alphanumeric characters
        var generalRegex = /^[A-Z0-9]{8,12}$/;

        if (usn === '') {
            showError('#usn', '#usnError', 'USN / Registration Number is required.');
            return false;
        } else if (!vtuRegex.test(usn) && !generalRegex.test(usn)) {
            showError('#usn', '#usnError', 'Invalid USN. Follow VTU format e.g., 1MS21CS045 (10 alphanumeric characters).');
            return false;
        } else {
            showSuccess('#usn', '#usnError');
            return true;
        }
    }

    // Validate Email Address using standard RFC 5322 regex
    function validateEmail() {
        var email = $('#email').val().trim();
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (email === '') {
            showError('#email', '#emailError', 'Email address is required.');
            return false;
        } else if (!emailRegex.test(email)) {
            showError('#email', '#emailError', 'Please enter a valid email address (e.g. name@domain.com).');
            return false;
        } else {
            showSuccess('#email', '#emailError');
            return true;
        }
    }

    // Validate Mobile Number (10 digits starting with 6, 7, 8, or 9)
    function validateMobile() {
        var mobile = $('#mobile').val().trim();
        var mobileRegex = /^[6-9]\d{9}$/;

        if (mobile === '') {
            showError('#mobile', '#mobileError', 'Mobile number is required.');
            return false;
        } else if (!mobileRegex.test(mobile)) {
            showError('#mobile', '#mobileError', 'Enter a valid 10-digit Indian mobile number starting with 6-9.');
            return false;
        } else {
            showSuccess('#mobile', '#mobileError');
            return true;
        }
    }

    // Validate Date of Birth (Must be in the past; age between 15 and 50)
    function validateDOB() {
        var dobVal = $('#dob').val();

        if (dobVal === '') {
            showError('#dob', '#dobError', 'Please select your Date of Birth.');
            return false;
        }

        var birthDate = new Date(dobVal);
        var today = new Date();

        if (birthDate >= today) {
            showError('#dob', '#dobError', 'Date of Birth cannot be today or in the future.');
            return false;
        }

        // Calculate age
        var age = today.getFullYear() - birthDate.getFullYear();
        var monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 15 || age > 60) {
            showError('#dob', '#dobError', 'Student age must be between 15 and 60 years (Current: ' + age + ' yrs).');
            return false;
        }

        showSuccess('#dob', '#dobError');
        return true;
    }

    // Validate Gender selection (Radio group)
    function validateGender() {
        var isChecked = $('input[name="gender"]:checked').length > 0;

        if (!isChecked) {
            $('#genderGroup').addClass('is-invalid');
            $('#genderError').text('Please select your gender.').fadeIn(200);
            return false;
        } else {
            $('#genderGroup').removeClass('is-invalid');
            $('#genderError').text('').hide();
            return true;
        }
    }

    // Validate Engineering Branch Dropdown
    function validateBranch() {
        var branch = $('#branch').val();

        if (!branch || branch === '') {
            showError('#branch', '#branchError', 'Please select an engineering branch.');
            return false;
        } else {
            showSuccess('#branch', '#branchError');
            return true;
        }
    }

    // Validate Semester Dropdown
    function validateSemester() {
        var semester = $('#semester').val();

        if (!semester || semester === '') {
            showError('#semester', '#semesterError', 'Please select your current semester.');
            return false;
        } else {
            showSuccess('#semester', '#semesterError');
            return true;
        }
    }

    // Validate Address Textarea (Minimum 10 characters)
    function validateAddress() {
        var address = $('#address').val().trim();

        if (address === '') {
            showError('#address', '#addressError', 'Permanent Address is required.');
            return false;
        } else if (address.length < 10) {
            showError('#address', '#addressError', 'Please provide a complete address (minimum 10 characters).');
            return false;
        } else {
            showSuccess('#address', '#addressError');
            return true;
        }
    }

    // -------------------------------------------------------------------------
    // 2. Real-time jQuery Event Listeners (Instant Feedback on User Input)
    // -------------------------------------------------------------------------

    $('#fullName').on('input blur', validateFullName);
    $('#usn').on('input blur', validateUSN);
    $('#email').on('input blur', validateEmail);
    $('#mobile').on('input blur', validateMobile);
    $('#dob').on('change blur', validateDOB);
    $('input[name="gender"]').on('change', validateGender);
    $('#branch').on('change blur', validateBranch);
    $('#semester').on('change blur', validateSemester);
    $('#address').on('input blur', validateAddress);

    // Prevent non-numeric keypresses on mobile field
    $('#mobile').on('keypress', function (e) {
        var charCode = e.which ? e.which : e.keyCode;
        if (charCode < 48 || charCode > 57) {
            e.preventDefault();
        }
    });

    // -------------------------------------------------------------------------
    // 3. Form Submit Handler using jQuery
    // -------------------------------------------------------------------------

    $('#studentForm').on('submit', function (e) {
        // Run all individual validators
        var isNameValid = validateFullName();
        var isUsnValid = validateUSN();
        var isEmailValid = validateEmail();
        var isMobileValid = validateMobile();
        var isDobValid = validateDOB();
        var isGenderValid = validateGender();
        var isBranchValid = validateBranch();
        var isSemesterValid = validateSemester();
        var isAddressValid = validateAddress();

        // Overall validation flag
        var isFormValid = isNameValid && isUsnValid && isEmailValid &&
                          isMobileValid && isDobValid && isGenderValid &&
                          isBranchValid && isSemesterValid && isAddressValid;

        if (!isFormValid) {
            // Stop form from submitting to PHP
            e.preventDefault();

            // Smoothly scroll to the first element with an error
            var $firstError = $('.is-invalid').first();
            if ($firstError.length) {
                $('html, body').animate({
                    scrollTop: $firstError.offset().top - 120
                }, 400);
            }
        }
        // If valid, allow standard POST submission to process.php
    });

    // -------------------------------------------------------------------------
    // 4. Form Reset Handler
    // -------------------------------------------------------------------------

    $('#resetBtn').on('click', function () {
        // Clear all validation classes and messages
        $('.form-control').removeClass('is-invalid is-valid');
        $('#genderGroup').removeClass('is-invalid');
        $('.error-msg').text('').hide();
    });

});
