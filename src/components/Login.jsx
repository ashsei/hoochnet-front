import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Logout from "./Logout"


const LoginButton = () => {
    const { loginWithRedirect} = useAuth0();
    return (
        <button onClick={() => loginWithRedirect()}>Log In / Sign Up</button>
    )
};

export default LoginButton;