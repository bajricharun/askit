import { Navigate } from "react-router-dom";

const Logout = () => {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('jwt');
    return <>
        <Navigate to="/"></Navigate>
    </>
}

export default Logout;