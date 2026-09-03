import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required:true
    },
    status:{
        type: String,
        enum: ['active','inactive'],
        default: 'active'
    }
},{timestamps: true})

const Course = mongoose.model('Course', courseSchema)

export default Course
