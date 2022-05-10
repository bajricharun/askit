import { Card, CardActionArea, CardContent, CardHeader, IconButton, Typography } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Like from "@mui/icons-material/ThumbUp";
import Dislike from "@mui/icons-material/ThumbDown";
import axios from "axios";
import { like, dislike } from "../../Routes/routes";
import { useNavigate } from "react-router-dom";
import "../../Pages/styles/questions.css";

const Question = ({ data, loggedIn }) => {

    const subheader = data.title + " " + data.createdAt;
    const navigate = useNavigate();
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


    return (
        <div className="flexelemQuestion">
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    action={
                        <IconButton onClick={() => navigate(`/question/${data.id}`)}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={data.title}
                    subheader={subheader}
                />
                <CardContent>
                    <Typography variant='body2'>{data.question}</Typography>
                </CardContent>
                <CardActionArea>
                    <IconButton onClick={() => likeQuestion(data.id)}>
                        <Like />
                        <Typography>{data.countOfLikes}</Typography>
                    </IconButton>
                    <IconButton onClick={() => dislikeQuestion(data.id)}>
                        <Dislike />
                        <Typography>{data.countOfDislikes}</Typography>

                    </IconButton>
                    {loggedIn ? (<IconButton style={{ justifyContent: "right" }}><Like /></IconButton>) : null}
                </CardActionArea>
                <CardContent>
                    <Typography>
                        {data.text}
                    </Typography>
                </CardContent>
            </Card >
        </div>
    )
}

export default Question;