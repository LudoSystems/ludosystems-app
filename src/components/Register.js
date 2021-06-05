import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import { useCurrentUser } from "./CurrentUserContext"

import AuthService from "../services/AuthService";

const initialValues = {
    username: "",
    email: "",
    password: "",
};

const registerSchema = Yup.object().shape({
    username: Yup.string()
        .required("Required")
        .min(3, "Username too short")
        .max(64, "Username too long"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
        .required("Required")
        .min(8, "Password too short")
        .max(64, "Password too long"),

});

const Register = (props) => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const history = useHistory();

    const { currentUser } = useCurrentUser();

    if(currentUser) {
        history.push("/profile");
    }
    
    const submitForm = (values) => {
        setError("");

        AuthService.register(values.username, values.email, values.password).then(
            (response) => {
                setSuccess(true);
            },
            (error) => {
                setError("Registration failed. Please try again or contact us.");
            }
        );
    };

    return (
        <> {currentUser &&
            <div className="page-container auth register">  
                <h1>Register</h1>

                {success ? (
                    <div className="content">
                        <p>
                            Your account was created!
                        </p>
                        <div>
                            <Link to={"/login"}>
                                Login
                            </Link>
                        </div>
                    </div>
                ) : (
                    <Formik
                        initialValues={initialValues}
                        validationSchema={registerSchema}
                        onSubmit={submitForm}
                    >
                        {(formik) => {
                            const { errors, touched,isValid, dirty} = formik;

                            return (
                                <Form className="content">
                                    <div className="form-row">
                                        <label htmlFor="username">Username</label>
                                        <Field
                                            type="text"
                                            name="username"
                                            id="username"
                                            className={errors.username && touched.username ? "input-error" : null}
                                        />
                                        <ErrorMessage name="username" component="div" className="error" />
                                    </div>
                                    <div className="form-row">
                                        <label htmlFor="email">Email</label>
                                        <Field
                                            type="text"
                                            name="email"
                                            id="email"
                                            className={errors.email && touched.email ? "input-error" : null}
                                        />
                                        <ErrorMessage name="email" component="div" className="error" />
                                    </div>
                                    <div className="form-row">
                                        <label htmlFor="password">Password</label>
                                        <Field
                                            type="password"
                                            name="password"
                                            id="password"
                                            className={errors.password && touched.password ? "input-error" : null}
                                        />
                                        <ErrorMessage name="password" component="div" className="error" />
                                    </div>
                                    <button
                                        type="submit"
                                        className={dirty && isValid ? "" : "disabled-btn"}
                                        disabled={!(dirty && isValid)}
                                    >
                                        <span>Register</span>
                                    </button>
                                    {error && (
                                        <div className="alert alert-danger" role="alert">
                                            {error}
                                        </div>
                                    )}
                                </Form>
                            );
                        }}
                    </Formik>
                )}
        </div>}</>
    );
};

export default Register;