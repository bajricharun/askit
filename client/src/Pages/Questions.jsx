import React, { useEffect, useState } from "react";
import { setUserId } from "../Helpers/HelperFunctionCheckIfUserIsLogged";
import AddNew from "../Components/AddNew/AddNew";
import axios from "axios";
import { viewQuestions } from "../Routes/routes";
import Question from "../Components/Question/Question";
import "./styles/questions.css";
import { Typography } from "@mui/material";

const Questions = () => {
    const userData = setUserId();
    const [loggedIn] = useState(userData.logged);
    const [data, setData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    const fetchQuestions = async () => {
        try {
            let response = await axios.get(viewQuestions)
            let json = await response;

            return { success: true, data: json.data };
        } catch (err) {
            return { success: false, data: err };
        }
    }

    useEffect(() => {
        (async () => {
            setDataLoaded(false);
            let res = await fetchQuestions();
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
            {loggedIn ? <AddNew /> : null}
            <div className="flexBoxQuestions">
                {data.map((question) => {
                    return (
                        <Question data={question} loggedIn={loggedIn} key={question.id} />
                    )

                })}
            </div>
        </>
    )
}

export default Questions;