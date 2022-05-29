const jwt = require("jsonwebtoken");
const bookModel = require("../model/userModel");


const authentication = async (req, res, next) => {
    try {
        let token = req.headers["x-key"];
        if (!token) {
            return res.status(401).send({ status: false, message: "important header missing" })
        }
        let decodedToken = jwt.verify(token, 'mobigic-technology')
        if (!decodedToken) return res.status(401).send({ status: false, message: 'token is not valid' })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
    next()
}

const authorisation = async (req, res, next) => {
    try {
        let token = req.headers["x-key"];
        let decodedToken = jwt.verify(token, "mobigic-technology");
        let userLoggingIn = req.params.userId
        let userLoggedIn = decodedToken.id
        let value = await userModel.findById(userLoggingIn)
        if (!value) return res.status(404).send({ status: false, message: "user not found" })
        if (value.userId != userLoggedIn) return res.status(403).send({ status: false, message: "unauthorise access " })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
    next()
}


module.exports.authentication = authentication
module.exports.authorisation = authorisation