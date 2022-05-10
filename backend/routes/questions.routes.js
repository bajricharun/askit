module.exports = app => {
    const router = require("express").Router();
    const bodyParser = require("body-parser").json();
    const auth = require("../middleware/auth");
    const questions = require("../controllers/questions.controller");

    router.get("/", bodyParser, questions.viewQuestions);
    router.post("/addNew", bodyParser, auth, questions.addQuestion);
    router.get("/latestQuestions", bodyParser, questions.viewLastQuestions);
    router.get("/myQuestions/:userId", bodyParser, questions.myQuestions);
    router.get("/viewQuestion/:id", bodyParser, questions.viewQuestion);
    router.put("/likeQuestion", bodyParser, questions.likeQuestion);
    router.put("/dislikeQuestion", bodyParser, questions.dislikeQuestion);

    app.use("/api/questions", router);
}