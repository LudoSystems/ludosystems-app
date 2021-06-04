import React, { useEffect }from "react";

import { useCurrentUser } from "./CurrentUserContext.js"

import { Link } from "react-router-dom";
import { ReactComponent as Logo } from '../svg/site-logo.svg';


const NavBar = () => {
    const { currentUser, updateCurrentUser, logout } = useCurrentUser();

    useEffect(() => {
        updateCurrentUser();
    }, []);

    return (
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

            {currentUser && currentUser.roles.includes("USER") && (
                <Link to="/nodes" className="nav-link">
                    Nodes
                </Link>
            )}
        </div>

        {currentUser ? (
            <div className="user-menu">
                <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                </Link>
                <a href="/login" className="nav-link" onClick={() => logout()}>
                    Log Out
                </a>
            </div>
        ) : (
            <div className="user-menu">
                <Link to={"/login"} className="nav-link">
                    Log In
                </Link>
                <Link to={"/register"} className="nav-link">
                    Register
                </Link>
            </div>
        )}
    </nav>
    );
};

export default NavBar;