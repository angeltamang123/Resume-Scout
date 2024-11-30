const { Router } = require("express");
const registerNewUser = require("../controllers/users");
const router = Router();

router.post("/register", registerNewUser);

module.exports = router;
