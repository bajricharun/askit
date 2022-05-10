import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Navbar from "../Components/Navbar/Navbar";
import { registration } from "../Routes/routes";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./styles/login.css";

const Registration = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordSecond, setPasswordSecond] = useState("");
    const [responseData, setResponseData] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const click = () => {
        axios
            .post(registration, {
                name: name,
                email: email,
                password: password,
                passwordSecond: passwordSecond
            })
            .then((res) => {
                setResponseData("OK");
                sessionStorage.setItem("id", res.data.payload.id);
                sessionStorage.setItem("jwt", res.data.payload.jwt);
            }).catch(err => {
                setResponseData("No");
            });
    };

    return (
        <>
            <Navbar />
            <form className="form" onSubmit={handleSubmit}>
                <Typography variant='h5' className='title'>Registration</Typography>
                <TextField
                    label="Name"
                    variant="filled"
                    type="text"
                    name="name"
                    className="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <TextField
                    label="Sifra"
                    variant="filled"
                    type="password"
                    name="passwordOne"
                    className="password"
                    required
                    value={passwordSecond}
                    onChange={(e) => setPasswordSecond(e.target.value)}
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
                            Register
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
                        ><Link to="/login" className="links">Login</Link></Button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Registration;
