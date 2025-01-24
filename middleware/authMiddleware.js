
const jwt = require('jsonwebtoken');

const middleware = async (req, res, next) => {
    try {
        
        const token = req.header('Authorization').split(" ")[1];
        console.log(token)
        if (!token) {
            return res.status(401).json({success: false, msg: "Please Provide Token"});
        } 
        const decoded = jwt.verify(token, "secret");
        
        req.User = decoded;
        next();
    
    } catch (err) {
        res.status(401).json({success: false, msg: "Unauthorized"});
    }
}

module.exports = middleware;