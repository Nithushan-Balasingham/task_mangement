
import { validationResult } from 'express-validator';
import { TaskModel } from '../config/connectDb.js';
import { where } from 'sequelize';


export const addTask = async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    console.error("Validation Errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { title, description, priority, due_date } = req.body;

  try {
    const task = await TaskModel.create({
      title,
      description,
      priority,
      due_date,
      userId: req.user.id,
    });
    return res.status(201).json(task); 
  } catch (err) {
    console.error("Database Error:", err.message); 
    return res.status(500).json({ error: err.message });
  }
};

  export const getTasks = async(req,res)=>{
    try {
        const tasks = await TaskModel.findAll({where:{userId:req.user.id}})
        res.status(200).json(tasks)
        console.log(tasks)
    } catch (error) {
        console.error("Error" , error.message)
        return res.status(500).json({error:"Server Error"})
    }
}

export const getSingleTask = async(req,res)=>{
  try {
    const {id} = req.params;
    const userId = req.user.id
    console.log(id, userId)
    const task = await TaskModel.findOne({
      where:{
        id: id,
        userId: userId
      },
    });
    if(!task){
      return res.status(404).json({message:"Not Found"})
    }
    return res.status(200).json(task)
  } catch (error) {
    console.error("Error" , error.message)
    return res.status(500).json({error:"Server Error"})
  }
}

export const updateTask = async (req, res) => {
  const { id } = req.params; 
  const userId = req.user.id; 
  const { title, description, priority, due_date } = req.body; 

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Validation Errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const task = await TaskModel.findOne({
      where: {
        id: id,
        userId: userId 
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    const updatedTask = await task.update({
      title,
      description,
      priority,
      due_date,
    });

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error.message);
    return res.status(500).json({ error: error.message });
  }
};


export const deleteTask = async (req, res) => {
  const { id } = req.params; 
  const userId = req.user.id; 

  try {
    const task = await TaskModel.findOne({
      where: {
        id: id,
        userId: userId
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    await task.destroy();

    return res.status(200).json({ message: "Task is deleted successfully." });
  } catch (error) {
    console.error("Internal Server", error.message);
    return res.status(500).json({ error: error.message });
  }
};
