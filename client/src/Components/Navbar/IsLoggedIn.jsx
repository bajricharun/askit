import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles/navbar.css";

const IsLoggedIn = () => {
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
                        <Link to="/questions" className="links">All questions</Link>
                    </Button>
                </div>
                <div className="flexelem">
                    <Button variant="outlined">
                        <Link to="/my-questions" className="links">My questions</Link>
                    </Button>
                </div>
                <div className="flexelem">
                    <Button variant="outlined">
                        <Link to={`/profile/${sessionStorage.getItem('id')}`} className="links">Profile</Link>
                    </Button>
                </div>
                <div className="flexelem">
                    <Button variant="outlined">
                        <Link to="/logout" className="links">Logout</Link>
                    </Button>
                </div>

            </div>
        </>
    );
}

export default IsLoggedIn;