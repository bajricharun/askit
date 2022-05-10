import React, { useState } from "react";
import IsLoggedNavbar from "./IsLoggedIn";
import IsNotLoggedNavbar from "./NotLoggedIn";
import { setUserId } from "../../Helpers/HelperFunctionCheckIfUserIsLogged";

const Navbar = () => {
    const data = setUserId();
    const [loggedIn] = useState(data.logged);
    return <>{loggedIn ? <IsLoggedNavbar /> : <IsNotLoggedNavbar />}</>;

}

export default Navbar;