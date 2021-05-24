import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../services/AuthService";


const initialValues = {
    username: "",
    email: "",
    password: "",
};

const registerSchema = Yup.object().shape({
    username: Yup.string()
        .required("Required")
        .min(3, "Username is too short")
        .max(64, "Username is too long"),
    email: Yup.string().email().required("Required"),
    password: Yup.string()
        .required("Required")
        .min(8, "Password is too short.")
        .max(64, "Password is too long"),

});

const Register = (props) => {
    const [message, setMessage] = useState("");
    
    const submitForm = (values) => {
        setMessage("");

        AuthService.register(values.username, values.email, values.password).then(
            (response) => {
                setMessage("Successfully created your account.")
            },
            (error) => {
                setMessage("Registration failed. Please contact us.");
            }
        );
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={submitForm}
        >
            {(formik) => {
                const { errors, touched,isValid, dirty} = formik;

                return (
                    <div className="register-container">
                        <h1>Register</h1>
                        <Form>
                            <div className="form-row">
                                <label htmlFor="username">Username</label>
                                <Field
                                    type="text"
                                    name="username"
                                    id="username"
                                    className={errors.username && touched.username ? "input-error" : null}
                                />
                                <ErrorMessage name="username" component="span" className="error" />
                            </div>
                            <div className="form-row">
                                <label htmlFor="email">Email</label>
                                <Field
                                    type="text"
                                    name="email"
                                    id="email"
                                    className={errors.email && touched.email ? "input-error" : null}
                                />
                                <ErrorMessage name="username" component="span" className="error" />
                            </div>
                            <div className="form-row">
                                <label htmlFor="password">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    className={errors.password && touched.password ? "input-error" : null}
                                />
                                <ErrorMessage name="password" component="span" className="error" />
                            </div>
                            <button
                                type="submit"
                                className={dirty && isValid ? "" : "disabled-btn"}
                                disabled={!(dirty && isValid)}
                            >
                                <span>Register</span>
                            </button>
                            {message && (
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            )}
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};

export default Register;