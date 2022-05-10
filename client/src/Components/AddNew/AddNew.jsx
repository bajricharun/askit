import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Navbar from "../Navbar/Navbar";
import { addNew } from "../../Routes/routes";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./styles/new.css";
import "../../App.css";
import { TextareaAutosize, Typography } from "@mui/material";

const AddNew = () => {

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [responseData, setResponseData] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const click = () => {
        axios
            .post(addNew, {
                questionTitle: title,
                questionText: text,
                userId: sessionStorage.getItem('id'),
                token: sessionStorage.getItem('jwt')
            })
            .then((res) => {
                setResponseData(res.data);
                console.log(res.data);
            }).catch(err => {
                setResponseData("No");
            });
    };

    return (
        <>
            <Navbar />
            <form className="addNewForm" onSubmit={handleSubmit}>
                <Typography variant="h5" className='title'>New question</Typography>
                <TextField
                    label="Title"
                    variant="filled"
                    type="text"
                    name="title"
                    className="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextareaAutosize
                    maxRows={5}
                    label="Text"
                    variant="filled"
                    type="text"
                    name="text"
                    className="text"
                    placeholder="Text"
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <div className="flexBoxForaddNew">
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
                            <div>Something gone wrong.</div>
                        </div>
                    ) : null}

                </div>
            </form>
        </>
    );
};

export default AddNew;
