import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../components/AuthLayout/AuthLayout.module.css";
import { useForgotPasswordMutation } from "../../store/slices/authSlice";
import Snackbar from "../../components/Snackbar";

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");

  const initialValues = {
    mobile_number: "",
  };

  const validationSchema = Yup.object({
    mobile_number: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Required"),
  });

  const [forgotPassword, { isLoading, isSuccess }] =
    useForgotPasswordMutation();

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const response = await forgotPassword({
        mobile_number: values.mobile_number,
      }).unwrap();
      setSnackbarOpen(true);
      setMessage(response?.message);
      setTimeout(() => {
        navigate("/reset-password");
      }, 3000); // Auto-hide after 5 seconds
    } catch (err) {
      console.log(err);
      setSnackbarOpen(true);
      setMessage(err as string);
    }
  };

  return (
    <>
      {snackbarOpen && (
        <Snackbar
          open={snackbarOpen}
          message={message}
          severity={isSuccess ? "success" : "error"}
          onClose={() => setSnackbarOpen(false)}
        />
      )}
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
                <label htmlFor="mobile_number">Mobile Number</label>
                <Field
                  name="mobile_number"
                  type="tel"
                  className={styles.formControl}
                />
                <ErrorMessage
                  name="mobile_number"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={styles.submitButton}
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
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
    </>
  );
};

export default ForgotPasswordPage;
