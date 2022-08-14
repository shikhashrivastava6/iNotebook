const jwt = require('jsonwebtoken');
const JWT_Sec = "heyCoolDude";


const fetchUser = (req, res, next) => {
// Get the user from jwt token and add id to req object
const token = req.header('auth-token')
if(!token){
    res.status(401).send({error : "Please authenticate using valid token"})
}
try{
const data = jwt.verify(token, JWT_Sec);
req.user = data.user;
next();
}catch{
    res.status(401).send({error : "Please authenticate using valid token"})
}
}

module.exports = fetchUser;