import express from 'express'
import Student from '../models/student.mjs'
import mongoose from "mongoose"
import Course from "../models/course.mjs"

const router = express.Router()

router.get('/',async(req,res)=>{
    const students = await Student.find().populate('course')
    res.send(students) 
})

router.get('/:id',async(req,res)=>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({msg:"Invalid student ID"})
    }
    const student = await Student.findById(id).populate("course")
    if(!student){
        return res.status(404).send({msg:"Student not found"})
    }
    res.send(student)
})

router.post('/',async(req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.body.course)){
        return res.status(400).send({msg: "Invalid course ID"})
    }
    const course = await Course.findById(req.body.course)
    if(!course){
        return res.status(404).send({msg:"Course not found"})
    }

    const student = new Student(req.body)
    const savedStudent = await student.save()
    res.status(201).send(savedStudent)
})

router.put('/:id',async(req,res)=>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({msg:"Invalid student ID"})
    }

    if(req.body.course){
        if(!mongoose.Types.ObjectId.isValid(req.body.course)){
            return res.status(400).send({msg:"Invalid course ID"})
        }
        const course = await Course.findById(req.body.course)
        if(!course){
            return res.status(404).send({msg:"Course not found"})
        }
    }

    const student = await Student.findByIdAndUpdate(
        id,
        req.body,
        {new:true, runValidators:true}
    )
    if(!student){
        return res.status(404).send({msg:"Student not found"})
    }
    res.send(student)
})
/*new: true → return the updated document
runValidators: true → apply the schema validation during update*/

router.delete('/:id', async(req,res)=>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({msg:"Invalid student ID"})
    }
    const student = await Student.findByIdAndDelete(id)

    if(!student){
        return res.status(404).send({msg:"Student not found"})
    }

    res.send({msg:"Student deleted successfully"})
})

export default router