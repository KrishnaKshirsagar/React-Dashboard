import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../components/AuthLayout/AuthLayout.module.css";
import { useLoginMutation } from "../../store/slices/authSlice";
import type { LoginCredentials } from "../../interfaces/auth";
const Snackbar = React.lazy(() => import("../../components/Snackbar"));

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");

  const initialValues: LoginCredentials = {
    mobile_number: "",
    password: "",
  };

  const validationSchema = Yup.object({
    mobile_number: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Required"),
    password: Yup.string().required("Required"),
  });

  const [login, { isLoading, isSuccess }] = useLoginMutation();

  const onSubmit = async (values: LoginCredentials) => {
    try {
      const response = await login({
        mobile_number: values.mobile_number,
        password: values.password,
      }).unwrap();
      setSnackbarOpen(true);
      setMessage(response?.message);
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000); // Auto-hide after 5 seconds
    } catch (err) {
      setSnackbarOpen(true);
      setMessage(err as string);
    }
  };

  return (
    <>
      <React.Suspense fallback={null}>
        {snackbarOpen && (
          <Snackbar
            open={snackbarOpen}
            message={message}
            severity={isSuccess ? "success" : "error"}
            onClose={() => setSnackbarOpen(false)}
          />
        )}
      </React.Suspense>
      <div className={styles.formCard}>
        <h2>Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              {/* {error && (
            <div className={styles.errorMessage}>{error as string}</div>
          )} */}
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

              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className={styles.formControl}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </Form>
          )}
        </Formik>
        <div className={styles.linkContainer}>
          <Link to="/forgot-password" className={styles.link}>
            Forgot Password?
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
