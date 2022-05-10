module.exports = app => {
    const router = require("express").Router();
    const bodyParser = require('body-parser').json();
    const authentication = require("../controllers/authentication.controller");
    const auth = require("../middleware/auth");

    router.post("/registration", bodyParser, authentication.registration);
    router.post("/login", bodyParser, authentication.login);
    router.get("/delete/:id", bodyParser, auth, authentication.delete);

    app.use("/api/authentication", router);
}