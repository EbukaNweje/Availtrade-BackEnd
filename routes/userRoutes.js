const express = require("express")
const ReqAccount = require("../controllers/Account")

const Routers = express.Router()

Routers.route("/requestaccount/:userId").post(ReqAccount.ResAccount)

module.exports = Routers