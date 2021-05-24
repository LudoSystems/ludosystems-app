import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../services/AuthService";

const initialValues = {
    username: "",
    password: "",
};

const loginSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),

});

const Login = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const submitForm = (values) => {
        setLoading(true);
        setError("");
    
        AuthService.login(values.username, values.password).then(
            () => {
                props.history.push("/nodes");
                window.location.reload();
            },
            (error) => {
                setLoading(false);
                setError("Incorrect username or password.");
            }
        );
    };

    return (
        <Formik 
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={submitForm}
        >
            {(formik) => {
                const { errors, touched, isValid, dirty } = formik;
            
                return (
                    <div className="login-container">
                        <h1>Log in</h1>
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
                            {loading ? (
                                <span className="spinner">Loading...</span>
                            ):(
                                <span>Log In</span>
                            )}
                            </button>
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};

export default Login;