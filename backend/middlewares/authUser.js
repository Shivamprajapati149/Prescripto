import jwt from 'jsonwebtoken';

//admin authentication middleware

const authUser = (req, res, next) => {
    try{
        const {token} = req.headers;
        if(!token){
            return  res.json({sucess:false, message:"No Authorized, please login first"}) 
        }

        const token_decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = token_decoded.id; 
            next()  ;
        

    }catch(error){
        console.log(error)
         res.json({sucess:false, message:"Error in admin login"})  
  
    
    }

}

export default authUser