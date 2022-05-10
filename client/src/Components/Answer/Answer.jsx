import { Typography } from "@mui/material"
import "./answer.css";

const Answer = (data) => {
    return (
        <div className="flex">
            <div className="flexChild">
                <Typography>{data.data.answer}</Typography>
            </div>
            <div className="flexChild">
                <Typography>{data.data.user.name}</Typography>
            </div>
        </div>
    )

}

export default Answer;