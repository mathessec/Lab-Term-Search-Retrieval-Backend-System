import express from 'express'
const app = express()
import appRoutes from './routes/index.js'
import 'dotenv/config'
import cors from 'cors'

// act as the license from the front to backend connnecticity 
app.use(cors())

app.use(express.json())
//url encoded to convert the encoded data consist of @. to normal form
// app.use(express.urlencoded())

app.use(appRoutes)

app.listen(process.env.PORT,()=>console.log("App listening port:"+process.env.PORT))

