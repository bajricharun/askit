module.exports = app => {
    const router = require("express").Router();
    const bodyParser = require("body-parser").json();
    const profile = require("../controllers/profile.controller");
    const auth = require("../middleware/auth");

    router.get("/view/:id", bodyParser, profile.myProfile);
    router.post("/editProfile", bodyParser, auth, profile.editProfile);
    router.post("/change-password", bodyParser, auth, profile.changePassword);

    app.use("/api/profile", router);

}