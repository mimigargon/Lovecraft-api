const express = require("express");
const { postRegister, postLogin, postLogout } = require("./users.controller");
const UserRoutes = express.Router();

UserRoutes.post("/register", postRegister);
UserRoutes.post("/login", postLogin);
UserRoutes.post("/logout", postLogout);

module.exports = UserRoutes;
