const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());

require("./routes/authentication.routes")(app);
require("./routes/questions.routes")(app);
require("./routes/profile.routes")(app);
require("./routes/answers.routes")(app);

const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);



app.listen(port, function () {
    console.log(`SERVER IS ON: ${port}`);
});

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcnVuYmFqcmljQHByb3Rvbm1haWwuY29tIiwiaWF0IjoxNjUxODc4NzkyLCJleHAiOjE2NTE4ODU5OTJ9.ctSXNzVJJJC-L8rwnJeGfWhglHt9xou2s6WObu015sk