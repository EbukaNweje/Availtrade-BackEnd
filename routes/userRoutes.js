const express = require("express")
const ReqAccount = require("../controllers/Account")
const UserData = require("../controllers/User")

const Routers = express.Router()

Routers.route("/requestaccount/:userId").post(ReqAccount.ResAccount)
Routers.route("/userdata/:userId").get(UserData.getoneUser).delete(UserData.deleteoneUser).patch(UserData.updateoneUser)
Routers.route("/alluserdata").get(UserData.allUserData)


module.exports = Routers