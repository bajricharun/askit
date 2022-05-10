import React, { useEffect, useState } from "react";
import { setUserId } from "../Helpers/HelperFunctionCheckIfUserIsLogged";
import AddNew from "../Components/AddNew/AddNew";
import axios from "axios";
import { viewProfile, editProfile, changePassword } from "../Routes/routes";
import Question from "../Components/Question/Question";
import "./styles/profile.css";
import { Button, TextField, Typography } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import "./styles/profile.css";
import Navbar from "../Components/Navbar/Navbar";

const Profile = () => {
    const userData = setUserId();
    const [loggedIn] = useState(userData.logged);
    const { id } = useParams();
    const userId = sessionStorage.getItem('id');
    const [data, setData] = useState([]);
    const [email, setEmail] = useState("");
    const [passwordOld, setPasswordOld] = useState("");
    const [name, setName] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [dataLoaded, setDataLoaded] = useState(false);


    const fetchData = async () => {
        try {
            console.log(userId);
            let response = await axios.get(viewProfile + "/" + id);
            let json = await response;
            console.log(json.data);
            return { success: true, data: json.data };
        } catch (err) {
            return { success: false, data: err };
        }
    }

    const changeData = async () => {
        axios.post(editProfile, { email: email, name: name, id: userId, token: sessionStorage.getItem("jwt") })
            .then(res => {
                setData(res.data.payload)
            }).catch(err => {
                setData('nope');
            })
    }

    const changePasswordApi = async () => {
        axios.post(changePassword, {
            id: userId,
            passwordOld: passwordOld,
            passwordNew: passwordNew,
            token: sessionStorage.getItem("jwt")
        }).then(res => {
            setData(res.data.payload)
        }).catch(err => {
            setData('nope')
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        (async () => {
            setDataLoaded(false);
            let res = await fetchData();
            if (res.success) {
                setData(res.data.payload);
                console.log(res.data.payload);
                setDataLoaded(true);
            } else {
                console.log(res.data);
            }
        })();
    }, []);
    return (
        <>
            <Navbar />
            <div className="flexBox">
                <div className="flexelem">
                    <Typography>Name: {data.name}</Typography>
                </div>
                <div className="flexelem">
                    <Typography>Email: {data.email}</Typography>
                </div>
                {userId == id ?
                    (
                        <div className="flexelem">
                            <form className="formData" onSubmit={handleSubmit}>
                                <Typography>Change data</Typography>
                                <TextField
                                    label="Email"
                                    variant="filled"
                                    type="email"
                                    name="email"
                                    className="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    label="Name"
                                    variant="filled"
                                    type="text"
                                    name="name"
                                    className="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <br />
                                <Button className="button" type="submit" variant="contained" color="primary" onClick={changeData}>
                                    Edit profile
                                </Button>
                            </form>
                        </div>
                    ) : null
                }
            </div>
            {
                userId == id ?
                    (
                        <div className="flexBoxPwd">
                            <form className="formData" onSubmit={handleSubmit}>
                                <Typography>Change data</Typography>
                                <TextField
                                    label="Old password"
                                    variant="filled"
                                    type="password"
                                    name="passwordOld"
                                    className="passwordOld"
                                    value={passwordOld}
                                    onChange={(e) => setPasswordOld(e.target.value)}
                                />
                                <TextField
                                    label="New password"
                                    variant="filled"
                                    type="password"
                                    name="passwordNew"
                                    className="passwordNew"
                                    value={passwordNew}
                                    onChange={(e) => setPasswordNew(e.target.value)}
                                />
                                <br />
                                <Button className="button" type="submit" variant="contained" color="primary" onClick={changePasswordApi}>
                                    Change password
                                </Button>
                            </form>
                        </div>
                    ) : null
            }


        </>
    )
}

export default Profile;