
import jwt from "jsonwebtoken"

export const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if(authHeader && authHeader.startsWith("Bearer")){
      token = authHeader.split(" ")[1]
     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
          if(err){
            return res.status(401).json({ status: "error", data: "Token Expired or Invalid" });
          }          
          req.user = decoded.user
          next();
        
      })
    }else {
        return res.status(404).json({ status: "error", data: "Token Not Found" });
      }
  
}
