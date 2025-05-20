import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values: typeof initialValues) => {
    // Simulate API call
    console.log("Form data", values);
    // Simulate successful login
    localStorage.setItem("userToken", "fake-token");
    navigate("/dashboard"); // Redirect to dashboard or home page
  };

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginFormCard}>
        <h2>Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <Field
                  name="email"
                  type="email"
                  className={styles.formControl}
                />
                <ErrorMessage
                  name="email"
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

              <button type="submit" className={styles.submitButton}>
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
