import { randomUUID } from 'crypto';

const generateUUID = () => {
    return randomUUID();
};

const generateRandomString = (length) => {
  const characters = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm"

  let str = ""

  for (let i = 0; i < length; i++) 
    str += characters[Math.floor(Math.random() * 100) % 62]
 
 return str
}

export {generateRandomString,generateUUID}
