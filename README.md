# react-logic-register

## Here are examples of test cases for each scenario:

### User Registration:

Test case 1: Register with valid username, email, password, and confirm password.

Example:
Username: subham123
Email: sharmasubham210@gmail.com
Password: StrongPassword123
Confirm Password: StrongPassword123!

Test case 2: Register with an existing email address (should fail).

Test case 3: Register with a weak password (less than 8 characters) (should fail).

Test case 4: Register with mismatched passwords (should fail).

Test case 5: Register with an invalid email format (should fail).

Test case 6: Register with a username containing special characters or spaces (should fail).

### User Login:

Test case 1: Login with valid email and password.

Example:

Email: sharmasubham210@gmail.com
Password: StrongPassword123!

Test case 2: Login with incorrect email (should fail).

Test case 3: Login with incorrect password (should fail).

Test case 4: Login with both incorrect email and password (should fail).

### Email Verification:

Test case 1: Verify email with the correct OTP received in the email.
Test case 2: Verify email with an incorrect OTP (should fail).
Test case 3: Verify email with expired OTP (should fail).

### Validation Checks:

Test case 1: Validate that all fields are required during registration and login.
Test case 2: Validate that username cannot contain special characters or spaces.
Test case 3: Validate that email must be in a valid format.
Test case 4: Validate that password must be at least 8 characters long.
Test case 5: Validate that password must contain at least one uppercase letter.
Test case 6: Validate that password must contain at least one lowercase letter.
Test case 7: Validate that password must contain at least one special character.
Test case 8: Validate that password and confirm password fields match during registration.
Edge Cases:

Test case 1: Register with the maximum allowed length for username, email, password, and confirm password fields.
Test case 2: Register with an empty username, email, password, or confirm password field (should fail).
Test case 3: Register with a username, email, password, or confirm password field exceeding the maximum allowed length (should fail).
Test case 4: Register with an email address containing special characters (should fail).
Test case 5: Register with an email address exceeding the maximum allowed length (should fail).
Test case 6: Register with a password exceeding the maximum allowed length (should fail).
