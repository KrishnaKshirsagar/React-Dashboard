import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../components/AuthLayout/AuthLayout.module.css";
import { useLoginMutation } from "../../store/slices/authSlice";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const initialValues = {
    mobile: "",
    password: "",
  };

  const validationSchema = Yup.object({
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Required"),
    password: Yup.string().required("Required"),
  });

  const [login, { isLoading, error }] = useLoginMutation();

  const onSubmit = async (values: typeof initialValues) => {
    try {
      await login({
        mobile_number: values.mobile,
        password: values.password,
      }).unwrap();
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className={styles.formCard}>
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            {error && (
              <div className={styles.errorMessage}>{error as string}</div>
            )}
            <div className={styles.formGroup}>
              <label htmlFor="mobile">Mobile Number</label>
              <Field name="mobile" type="tel" className={styles.formControl} />
              <ErrorMessage
                name="mobile"
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
  );
};

export default LoginPage;
