const jwt = require('jsonwebtoken');
const config = require('config');

const auth  = (req,res,next) => {
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg:'token does not exist, autorization denied'});
    }
    let decode;
    try {
        
        decode = jwt.verify(token.split(' ')[1],config.get('SECRETKEY'));
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({msg:"token is not valid"});
    }
}


module.exports = auth;