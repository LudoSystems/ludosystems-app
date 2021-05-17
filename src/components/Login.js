import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/AuthService";

const required = value => {
    if(!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Required field!
            </div>
        );
    }
};

const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password).then(
                () => {
                    props.history.push("/nodes");
                    window.location.reload();
                },
                (error) => {
                    const resMessage = 
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message || 
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="login-form">
            <Form onSubmit={handleLogin} ref={form}>
                <div>
                    <label htmlFor="username">username</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required]}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required]}
                    />
                </div>

                <div className="form-group">
                    <button className="button" disabled={loading}>
                        {loading && (
                            <span className="spinner">Loading...</span>
                        )}
                        <span>Login</span>
                    </button>
                </div>

                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}

                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </div>
    );
}

export default Login;