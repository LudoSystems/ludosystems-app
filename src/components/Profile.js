import React from "react";
import { useHistory } from "react-router-dom";
import { useCurrentUser } from "./CurrentUserContext"

const Profile = () => {
    const { currentUser } = useCurrentUser();

    const history = useHistory();

    if(!currentUser) {
        history.push("/login");
    }

    return (
    <div className="page-container profile">
        {currentUser && <>
            <h1>{currentUser.username}</h1>
            <div className="content">
                <div><strong>Email:</strong> {currentUser.email}</div>
            </div>
        </>}
    </div>
    );
};

export default Profile;