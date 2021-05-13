import React from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
      <>
      {currentUser ? (
        <>
        <h3>{currentUser.username}</h3>
        <p>
            <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{" "}
            {currentUser.token.substr(currentUser.token.length - 20)}
        </p>
        <p>
            <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
            <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
            <strong>Authorities:</strong>
            <ul>
                {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
        </p>
        </>
    ) : (
        <Redirect to='/login' />
    )}
    </>
  );
};

export default Profile;