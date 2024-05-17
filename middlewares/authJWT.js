import jwt from 'jsonwebtoken';
const SecretKey="asddas%^&*(1234ASDF";
const verifyToken=(req,res,next)=>{
   const bearer=req.headers['authorization'];
   console.log(bearer)
   if(typeof bearer !== 'undefined'){
      const token=bearer.split(' ')[1];
      jwt.verify(token,SecretKey,(err,data)=>{
        if(err){
            res.json({"err":1,"msg":"Token expire"});
        }
        else{
            next();
        }
      })
   }
   else{
    res.json({"err":1,"msg":"Token not found"});
   }
}
export default verifyToken;