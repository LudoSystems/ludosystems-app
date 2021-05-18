import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";

import './styles/App.scss';
import { ReactComponent as Logo } from './site-logo.svg';

import AuthService from "./services/AuthService";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Nodes from "./components/Nodes";

const App = () => {
    const [showNodes, setShowNodes] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if(user) {
            setCurrentUser(user);
            
            if(user.roles.includes("USER")) {
                setShowNodes(true);
            }
        }
    }, []);

    const logout = () => {
        AuthService.logout();
    };

    return (
        <>
            <header>
                <nav>
                    <Link to={"/"}>
                        <div id="site-logo">
                                <Logo/>
                        </div>
                    </Link>
                    <div className="nav-menu">
                        <Link to ={"/"} className="nav-link">
                            Home
                        </Link>

                        {currentUser && showNodes && (
                            <Link to={"/nodes"} className="nav-link">
                                Nodes
                            </Link>
                        )}
                    </div>

                    {currentUser ? (
                        <div className="user-menu">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.username}
                            </Link>
                            <a href="/login" className="nav-link" onClick={logout}>
                                Log Out
                            </a>
                        </div>
                    ) : (
                        <div className="user-menu">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                            <Link to={"/register"} className="nav-link">
                                Register
                            </Link>
                        </div>
                    )}
                </nav>
            </header>

            <main>
                <Switch>
                    <Route exact path={["/", "/home"]} component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/profile" component={Profile} />
                    <Route path="/nodes" component={Nodes} />
                </Switch>
            </main>
            <footer>
                <div id="footer-text">
                    A work in progress by <a href="http://abbieschenk.com">Abbie Schenk</a>
                </div>
                <div id="footer-links">
                    <a href="https://github.com/Ludobaum">GitHub</a>
                </div>
            </footer>
        </>
    );
};

export default App;
