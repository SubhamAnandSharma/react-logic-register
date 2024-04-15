# react-logic-register

## Overview

This project is a registration and login system implemented using React for the frontend and Django for the backend.

## Steps to Start the Project

1. **Clone the Repository**:
   ```bash
   git clone [<repository_url>](https://github.com/SubhamAnandSharma/react-logic-register.git)
   ```

### Frontend:

1. **Navigate to the Frontend Directory**:

    ```bash
    cd frontend/login-signup
    ```

2. **Start the React Project**:

    ```bash
    npm start
    ```

### Backend:

1. **Navigate to the Backend Directory**:

    ```bash
    cd backend/myproject
    ```

2. **Start the Django Project**:

    ```bash
    python manage.py runserver
    ```



## Test Cases

### User Registration:

1. **Valid Registration**: Register with valid username, email, password, and confirm password.
   
   Example:
   - Username: subham123
   - Email: sharmasubham210@gmail.com
   - Password: StrongPassword123!
   - Confirm Password: StrongPassword123!

2. **Existing Email**: Register with an existing email address (should fail).

3. **Weak Password**: Register with a weak password (less than 8 characters) (should fail).

4. **Mismatched Passwords**: Register with mismatched passwords (should fail).

5. **Invalid Email Format**: Register with an invalid email format (should fail).

6. **Invalid Username**: Register with a username containing special characters or spaces (should fail).

### User Login:

1. **Successful Login**: Login with valid email and password.

   Example:
   - Email: sharmasubham210@gmail.com
   - Password: StrongPassword123!

2. **Incorrect Email**: Login with incorrect email (should fail).

3. **Incorrect Password**: Login with incorrect password (should fail).

4. **Incorrect Email and Password**: Login with both incorrect email and password (should fail).

### Email Verification:

1. **Successful Verification**: Verify email with the correct OTP received in the email.

2. **Incorrect OTP**: Verify email with an incorrect OTP (should fail).

3. **Expired OTP**: Verify email with expired OTP (should fail).

### Validation Checks:

1. **All Fields Required**: Validate that all fields are required during registration and login.

2. **Valid Username**: Validate that username cannot contain special characters or spaces.

3. **Valid Email Format**: Validate that email must be in a valid format.

4. **Password Length**: Validate that password must be at least 8 characters long.

5. **Uppercase Letter**: Validate that password must contain at least one uppercase letter.

6. **Lowercase Letter**: Validate that password must contain at least one lowercase letter.

7. **Special Character**: Validate that password must contain at least one special character.

8. **Password Matching**: Validate that password and confirm password fields match during registration.

### Edge Cases:

1. **Maximum Length**: Register with the maximum allowed length for username, email, password, and confirm password fields.

2. **Empty Fields**: Register with an empty username, email, password, or confirm password field (should fail).

3. **Exceeding Maximum Length**: Register with a username, email, password, or confirm password field exceeding the maximum allowed length (should fail).

4. **Special Characters in Email**: Register with an email address containing special characters (should fail).

5. **Email Length**: Register with an email address exceeding the maximum allowed length (should fail).

6. **Password Length**: Register with a password exceeding the maximum allowed length (should fail).


