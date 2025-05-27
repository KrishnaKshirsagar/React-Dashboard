import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../components/AuthLayout/AuthLayout.module.css";

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();

  const initialValues = {
    mobile: "",
  };

  const validationSchema = Yup.object({
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Required"),
  });

  const onSubmit = (values: typeof initialValues) => {
    // Simulate API call
    console.log("Form data", values);
    // TODO: Implement actual password reset logic
    // For now, just show success message
    alert("OTP has been sent to your mobile number");
    navigate("/reset-password");
  };

  return (
    <div className={styles.formCard}>
      <h2>Forgot Password</h2>
      <p>
        Enter your mobile number and we'll send you an OTP to reset your
        password.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <div className={styles.formGroup}>
              <label htmlFor="mobile">Mobile Number</label>
              <Field name="mobile" type="tel" className={styles.formControl} />
              <ErrorMessage
                name="mobile"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Send OTP
            </button>
          </Form>
        )}
      </Formik>
      <div className={styles.linkContainer}>
        <Link to=".." className={styles.link}>
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
