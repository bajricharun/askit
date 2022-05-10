import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles/navbar.css";

const NotLoggedIn = () => {
    return (
        <>
            <div className="flexNavbar">
                <div className="flexelem">
                    <Button variant="outlined">
                        <Link to="/" className="links">Home</Link>
                    </Button>
                </div>
                <div className="flexelem">
                    <Button variant="outlined">
                        <Link to="/login" className="links">Login</Link>
                    </Button>
                </div>
                <div className="flexelem">
                    <Button variant="outlined">
                        <Link to="/registration" className="links">Registration</Link>
                    </Button>
                </div>

            </div>
        </>
    );
}

export default NotLoggedIn;