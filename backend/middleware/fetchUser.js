var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Rroronova$zoro'; 
const fetchuser = (req,res,next)=>{
    // get user from jwt token and add the id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: " Authenticate With Valid Token"})
    }
    try{
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    }catch(error){
        res.status(401).send({error: " Authenticate With Valid Token"})
    }
}


module.exports = fetchuser;