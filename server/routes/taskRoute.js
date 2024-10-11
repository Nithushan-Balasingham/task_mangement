import express from "express";
import { taskDataValidation } from "../middleware/dataValidation.js";
import { addTask, deleteTask, getSingleTask, getTasks, updateTask } from "../controllers/taskController.js";
import { validateToken } from "../middleware/validateToken.js";

const taskRouter = express.Router();

taskRouter.route("/tasks").post( validateToken,taskDataValidation, addTask)
taskRouter.route("/tasks").get( validateToken, getTasks)
taskRouter.route("/tasks/:id").get(validateToken,getSingleTask).put(validateToken, taskDataValidation, updateTask).delete(validateToken, deleteTask)

export default taskRouter