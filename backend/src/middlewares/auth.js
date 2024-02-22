const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const auth = (req, res, next) => {
    
    try {
        const bearertoken = req.headers.authorization
        if(!bearertoken || !bearertoken.startsWith("Bearer")){
            throw new Error("Invalid token or no token")
        }

        const secret = process.env.JWT_SECRET
    
        const token = bearertoken.split("Bearer ")[1]
    
        const data = jwt.verify(token, secret)
    
        req.userId = data.userId

        next();
        
    } catch (error) {
        res.status(401).json({message: "Some error occured", error: error})
    }


    

}

module.exports = auth