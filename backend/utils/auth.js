import bcrypt from 'bcryptjs';
import config from './config.js'
import jwt from 'jsonwebtoken'

const hashData = async (data) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data, salt);
};


const compareHash = async(hash,str)=>{
    return await bcrypt.compare(str,hash)
}

const createToken = (payload)=>{
    let token = jwt.sign(payload,config.JWT_SECRET,{
        expiresIn:config.JWT_EXPIRY
    })
    return token
}

const decodeToken=(token)=>{
     return jwt.decode(token)
} 

export default{
    hashData,
    compareHash,
    createToken,
    decodeToken
}