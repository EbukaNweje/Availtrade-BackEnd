/* const User = require("../models/User")

exports.getoneUser = async (req, res, next) =>{
    try {
        const userId = req.params.userId
        const UserData = await User.findById(userId)
        
        res.status(201).json({
            message: "User Data",
            data: UserData
        })

    }catch(err){
        next(err)
    }
}

exports.allUserData = async (req, res, next) =>{
    try {
        const UserDatas = await User.find()
        
        res.status(201).json({
            message: "All User Data",
            maxnumber: UserDatas.length,
            data: UserDatas
        })

    }catch(err){
        next(err)
    }
}

exports.deleteoneUser = async (req, res, next) =>{
    try {
        const userId = req.params.userId
        const UserDatadelete = await User.findByIdAndDelete(userId)
        
        res.status(200).json({
            message: "User Data have been deleted",
            data: UserDatadelete
        })

    }catch(err){
        next(err)
    }
}

exports.updateoneUser = async (req, res, next) =>{
    try {
        const userId = req.params.userId
        const UserDataupdate= await User.findByIdAndUpdate(userId,req.body,{
            new: true
        })
        
        res.status(201).json({
            message: "User Data have been Updated",
            data: UserDataupdate
        })

    }catch(err){
        next(err)
    }
}
 */