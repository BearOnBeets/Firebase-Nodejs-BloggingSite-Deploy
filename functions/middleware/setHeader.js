const admin=require('../db').admin
const firebase=require('../db').db


const setHeader=(req,res,next)=>{
    req.headers.Authorization='Bearer '+req.cookies['token']
    next()
}

const decodeToken=async(req,res,next)=>{
    try{
    const token=req.headers.Authorization.split(' ')[1]
    const decodeValue=await admin.auth().verifyIdToken(token);
    if(decodeValue){
        next();
    }
    else
    {
        res.write('<body style="background-color:pink">')
        res.write("Unauthorized Access!!!!")
        res.end()
    }
    }catch(err)
    {
        res.write('<body style="background-color:pink">')
        res.write("Unauthorized Access!!!!!")
        res.end()
    }
}



module.exports={
    setHeader,decodeToken
}