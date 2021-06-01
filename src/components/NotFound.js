import React from "react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
    const history = useHistory();

    return (
    <>

        <h3>404 - Page Not Found</h3>
        <p>
            There's nothing here.
        </p>
        <button onClick={() => { history.goBack(); }} >
            Go Back
        </button>

    </>
    );
};

export default NotFound;