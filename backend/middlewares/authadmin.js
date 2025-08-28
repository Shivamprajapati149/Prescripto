import jwt from 'jsonwebtoken';

//admin authentication middleware

const authAdmin = (req, res, next) => {
    try{
        const {atoken} = req.headers;
        if(!atoken){
            return  res.json({sucess:false, message:"No Authorized, please login first"}) 
        }

        const token_decoded = jwt.verify(atoken, process.env.JWT_SECRET)
        if(token_decoded !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.json({sucess:false, message:"No Authorized, please login again"})
        }
            next()  ;
        

    }catch(error){
        console.log(error)
         res.json({sucess:false, message:"Error in admin login"})  
  
    
    }

}

export default authAdmin