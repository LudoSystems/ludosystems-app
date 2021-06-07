import React from "react";
import { 
    BrowserRouter as Router, 
    Switch,
    Route
} from "react-router-dom";
import {
    GitHub,
    Twitter,
} from "react-feather";
import  { 
    ReactFlowProvider
} from 'react-flow-renderer';

import './styles/App.scss';

import { CurrentUserProvider } from "./components/CurrentUserContext";

import NavBar from "./components/NavBar";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Nodes from "./components/Nodes";
import NotFound from "./components/NotFound";

const App = () => {
    return (
        <Router>
            <CurrentUserProvider>
                <header>
                    <NavBar />
                </header>
                <main>
                    <div className="frame left" />
                    <Switch>
                        <Route exact path={["/", "/home"]} >
                            <Home />
                        </Route>
                        <Route exact path="/login">
                            <Login />
                        </Route>
                        <Route exact path="/register">
                            <Register />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                        <Route exact path="/nodes">
                            <ReactFlowProvider>
                                <Nodes />
                            </ReactFlowProvider>
                        </Route>
                        <Route>
                            <NotFound />
                        </Route>
                    </Switch>
                    <div className="frame right" />
                </main>
                <footer>
                    <div id="footer-text">
                        A work in progress by <a href="http://abbieschenk.com">Abbie Schenk</a>
                    </div>
                    <div id="footer-links">
                        <a href="https://twitter.com/Ludo_Systems" target="_blank" rel="noreferrer noopener">
                            <Twitter />
                        </a>
                        <a href="https://github.com/LudoSystems" target="_blank" rel="noreferrer noopener">
                            <GitHub />
                        </a>
                    </div>
                </footer>
            </CurrentUserProvider>
        </Router>
    );
};

export default App;
