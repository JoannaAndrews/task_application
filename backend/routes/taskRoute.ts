import express from 'express';
import authMiddleware from '../middleware/auth.ts';
import { addTask, getAllTasks, updateTask, deleteTask } from '../controllers/taskController.ts'

const taskRouter = express.Router();

taskRouter.post("/add", authMiddleware, addTask);
taskRouter.get("/get", authMiddleware, getAllTasks);
taskRouter.put("/update/:taskId", authMiddleware, updateTask);
taskRouter.delete("/delete/:taskId", authMiddleware, deleteTask);

export default taskRouter;