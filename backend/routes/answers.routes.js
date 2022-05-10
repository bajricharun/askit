module.exports = app => {
    const router = require("express").Router();
    const bodyParser = require("body-parser").json();
    const auth = require("../middleware/auth");
    const answers = require("../controllers/answers.controller");

    router.get("/:id", bodyParser, answers.viewAnswers);
    router.post("/addNew", bodyParser, auth, answers.addAnswer);
    router.get("/delete/:id", bodyParser, answers.deleteAnswer);
    router.post("/editAnswer/:id", bodyParser, answers.editAnswer);
    app.use("/api/answers", router);
}