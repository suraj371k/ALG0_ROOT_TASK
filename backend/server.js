import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './config/db.js'
import authRoutes from './routes/auth.routes.js'
const app = express()
dotenv.config()

app.use(cors())
app.use(urlencoded({extended: true}))
app.use(express.json())

app.get('/' , (req , res) => {
    res.send(`<h1>Api is working</h1>`)
})
//routes
app.use('/api/auth' , authRoutes)

connectDb()

app.listen(5000 , () => {
    console.log("app is running on 5000")
})