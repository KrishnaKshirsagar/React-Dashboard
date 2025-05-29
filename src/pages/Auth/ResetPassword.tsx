import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../../components/AuthLayout/AuthLayout.module.css";
import type { ResetPasswordRequest } from "../../interfaces/auth";

const ResetPasswordSchema = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required")
    .matches(/^[0-9]{4}$/, "OTP must be exactly 4 digits"),
  mobile_number: Yup.string()
    .required("Mobile number is required")
    .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirm_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const initialValues: ResetPasswordRequest = {
    mobile_number: "",
    otp: "",
    password: "",
    confirm_password: "",
  };

  const handleSubmit = (values: ResetPasswordRequest) => {
    // Remove confirm_password before making API call
    const apiPayload = {
      mobile_number: values.mobile_number,
      otp: values.otp,
      password: values.password,
    };
    // TODO: Implement API call to reset password
    console.log("Form submitted:", values);
    console.log("API payload:", apiPayload);
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
              <label htmlFor="mobile_number">Mobile Number</label>
              <Field
                type="tel"
                name="mobile_number"
                placeholder="Enter mobile number"
                className={styles.formControl}
              />
              <ErrorMessage
                name="mobile_number"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="otp">OTP</label>
              <Field
                type="text"
                name="otp"
                placeholder="Enter OTP"
                className={styles.formControl}
              />
              <ErrorMessage
                name="otp"
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
              <label htmlFor="confirm_password">Confirm Password</label>
              <Field
                type="password"
                name="confirm_password"
                placeholder="Confirm new password"
                className={styles.formControl}
              />
              <ErrorMessage
                name="confirm_password"
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
