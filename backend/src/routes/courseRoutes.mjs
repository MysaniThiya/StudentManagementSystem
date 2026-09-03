import express from 'express'
import Course from '../models/course.mjs'
import Student from '../models/student.mjs'
import mongoose from "mongoose"

const router = express.Router()

router.get('/', async(req,res)=>{
    const courses = await Course.find()
    res.send(courses)
})

router.post('/',async(req,res)=>{
    const course = new Course(req.body)
    const savedCourse = await course.save()
    res.status(201).send(savedCourse)
})

router.get('/:id',async (req,res)=>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({msg:"Invalid course ID"})
    }
    const course = await Course.findById(id)
    if(!course){
        return res.status(404).send({msg:"Course not found"})
    }
    res.send(course)
})

router.put('/:id', async(req,res)=>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({msg:"Invalid course ID"})
    }
    const course = await Course.findByIdAndUpdate(
        id,
        req.body,
        {new:true, runValidators:true})
    if(!course){
        return res.status(404).send({msg:"Course not found"})
    }
    res.send(course)
})

router.delete('/:id',async(req,res)=>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({msg:"Invalid course ID"})
    }

    const enrolledStudents = await Student.countDocuments({
        course:id
    })
    if (enrolledStudents > 0){
        return res.status(400).send({
            msg: "Cannot delete course with enrolled students"
        })
    }
    
    const course = await Course.findByIdAndDelete(id)
    if(!course){
        return res.status(404).send({msg:"Course not found"})
    }
    res.send({ msg: "Course deleted successfully"})
})

export default router