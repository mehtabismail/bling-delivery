import * as yup from "yup";

const signInSchema = yup.object().shape({
  // username/email field - more flexible validation for both username and email
  email: yup
    .string()
    .trim()
    .required("Please enter Username/Email")
    .test(
      "is-valid-username-or-email",
      "Please enter a valid username or email",
      function (value) {
        if (!value) return false;

        // Check if it's an email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
          return true;
        }

        // Check if it's a valid username format (alphanumeric + underscore, 3-20 chars)
        const usernameRegex = /^[A-Za-z0-9_]{3,20}$/;
        return usernameRegex.test(value);
      }
    ),
  // password field
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;'\/]).{8,}$/,
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
    ),
});

export { signInSchema };
