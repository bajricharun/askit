import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Navbar from "../Components/Navbar/Navbar";
import { login } from "../Routes/routes";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./styles/login.css";
import "../App.css";
import { Typography } from "@mui/material";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [responseData, setResponseData] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const click = () => {
        axios
            .post(login, {
                email: email,
                password: password,
            })
            .then((res) => {
                setResponseData("OK");
                sessionStorage.setItem("id", res.data.id);
                sessionStorage.setItem("jwt", res.data.payload);
            }).catch(err => {
                setResponseData("No");
            });
    };

    return (
        <>
            <Navbar />
            <form className="form" onSubmit={handleSubmit}>
                <Typography variant="h5" className='title'>Login form</Typography>
                <TextField
                    label="Email"
                    variant="filled"
                    type="email"
                    name="email"
                    className="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Sifra"
                    variant="filled"
                    type="password"
                    name="passwordOne"
                    className="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="flexBoxForLogin">
                    <div className="flexelem">
                        <Button
                            type="submit"
                            className="button"
                            variant="contained"
                            color="primary"
                            onClick={click}
                        >
                            Submit
                        </Button>
                    </div>
                    {responseData === "OK" ? (
                        <Navigate replace to="/" />
                    ) : (
                        null
                    )}

                    {responseData === "No" ? (
                        <div className="flexelem">
                            <div>Please recheck your data.</div>
                        </div>
                    ) : null}
                    <div className="flexelem">
                        <Button
                            className="button flexelem"
                            variant="contained"
                            color="primary"
                        ><Link to='/registration' className="links">Register</Link></Button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Login;
