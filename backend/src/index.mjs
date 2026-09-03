import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import courseRouter from './routes/courseRoutes.mjs'
import studentRouter from './routes/studentRoutes.mjs'

const app = express()

const PORT = 3000

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/student-management')
    .then(()=>{
        console.log('Database connected')
    })
    .catch((err)=>{
        console.log(err)
    })

app.get('/',(req,res)=>{
    res.send("Student Management System API")
})

app.use('/api/courses', courseRouter)
app.use('/api/students', studentRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
