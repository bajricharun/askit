import { Button, IconButton, TextareaAutosize, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Like from "@mui/icons-material/ThumbUp";
import Dislike from "@mui/icons-material/ThumbDown";

import { addAnswer, dislike, like, viewAnswers, viewQuestion } from "../Routes/routes";
import "./styles/questions.css"
import Answer from "../Components/Answer/Answer";
const Question = () => {
    const { id } = useParams();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [commentsLoaded, setCommentsLoaded] = useState(false);
    const [responseData, setResponseData] = useState("");
    const [data, setData] = useState([]);
    const [key, setKey] = useState(0);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    const fetchData = async () => {
        try {
            let response = await axios.get(viewQuestion + "/" + id);
            let json = await response;
            return { success: true, data: json.data }
        } catch (err) {
            return { success: false, data: err }
        }
    }

    const likeQuestion = async (id) => {
        try {
            let response = axios.put(like, {
                id: id
            });
            let data = await response;
            console.log(data);
        } catch (err) {
            console.error(err);
        }

    }

    const dislikeQuestion = async (id) => {
        try {
            let response = axios.put(dislike, {
                id: id
            });
            let data = await response;
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const addComment = () => {
        axios.post(addAnswer, {
            answerString: comment,
            userId: sessionStorage.getItem('id'),
            token: sessionStorage.getItem("jwt"),
            questionId: id
        })
            .then((res) => {
                setResponseData("OK");
            }).catch(err => {
                setResponseData("No");
            })
    }

    const fetchQuestions = async () => {
        try {
            let response = await axios.get(viewAnswers + "/" + id);
            let json = await response;
            return { success: true, data: json.data }
        } catch (err) {
            return { success: false, data: err }
        }
    }

    useEffect(() => {
        (async () => {
            setDataLoaded(false);
            setCommentsLoaded(false);
            let res = await fetchData();
            let commentsData = await fetchQuestions();
            if (res.success && commentsData.success) {
                setData(res.data.payload);
                setComments(commentsData.data.payload);
                setDataLoaded(true);
                setCommentsLoaded(true);
            } else {
                console.log(res.data);
            }
        })();
    }, []);

    return (
        <>
            <Navbar />
            {data.map(el => {
                return (
                    <div className="flexBoxQuestion" style={{ marginTop: "10%" }} key={key}>
                        <div className="flexelemQ">
                            <Typography variant="h6" className="title">
                                Question: {el.title}
                            </Typography>
                        </div>
                        <div className="flexelemQ">
                            <Typography>
                                {el.question}
                            </Typography>
                        </div>
                        <div className="flexelemQ actionIcon">
                            <IconButton className="like" onClick={() => likeQuestion(id)}>
                                <Typography>{el.countOfLikes}</Typography>
                                <Like />
                            </IconButton>
                            <IconButton className="like" onClick={() => dislikeQuestion(id)} >
                                <Typography>{el.countOfDislikes}</Typography>

                                <Dislike />
                            </IconButton>
                            <form className="addNewAnswerForm" onSubmit={handleSubmit}>
                                <TextareaAutosize
                                    maxRows={5}
                                    label="Answer"
                                    variant="filled"
                                    type="text"
                                    name="comment"
                                    className="comment"
                                    placeholder="New comment..."
                                    required
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    className="button"
                                    variant="contained"
                                    color="primary"
                                    onClick={addComment}
                                >
                                    Submit
                                </Button>
                            </form>
                        </div>
                        <div className="flexelemQ">
                            {comments.map(comment => {
                                return <Answer data={comment} key={data.id} />
                            })}
                        </div>
                    </div>
                )
            })}
        </>
    )

}

export default Question;