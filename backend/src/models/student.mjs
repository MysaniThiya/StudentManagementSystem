import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required:true
    },
    enrollmentDate:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
},{timestamps: true})

const Student = mongoose.model("Student", studentSchema)

export default Student