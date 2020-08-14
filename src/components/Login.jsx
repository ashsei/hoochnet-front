import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Logout from "./Logout"


const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        isAuthenticated ? (
            <Logout />
            // !!! Add Link to Profile Component When Logged In !!!
        ) : (
            <button onClick={() => loginWithRedirect()}>Log In / Sign Up</button>
        )
    );
};

export default LoginButton;