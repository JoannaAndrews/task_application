import express from 'express';
import authMiddleware from '../middleware/auth';
import { addTask, getAllTasks, updateTask, deleteTask } from '../controllers/taskController'

const taskRouter = express.Router();

taskRouter.post("/add", authMiddleware, addTask);
taskRouter.get("/get", authMiddleware, getAllTasks);
taskRouter.put("/update/:taskId", authMiddleware, updateTask);
taskRouter.delete("/delete/:taskId", authMiddleware, deleteTask);

export default taskRouter;