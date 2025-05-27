import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../../components/AuthLayout/AuthLayout.module.css";

interface ResetPasswordValues {
  mobile: string;
  password: string;
  confirmPassword: string;
}

const ResetPasswordSchema = Yup.object().shape({
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const initialValues: ResetPasswordValues = {
    mobile: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: ResetPasswordValues) => {
    // TODO: Implement API call to reset password
    console.log("Form submitted:", values);
    alert("Password reset successfully");
    navigate("/login");
  };

  return (
    <div className={styles.formCard}>
      <h2>Reset Password</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={ResetPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.formGroup}>
              <label htmlFor="mobile">Mobile Number</label>
              <Field
                type="tel"
                name="mobile"
                placeholder="Enter mobile number"
                className={styles.formControl}
              />
              <ErrorMessage
                name="mobile"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">New Password</label>
              <Field
                type="password"
                name="password"
                placeholder="Enter new password"
                className={styles.formControl}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                className={styles.formControl}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? "Submitting..." : "Reset Password"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
