import { TaskRecord, AddBody, UpdateTaskBody } from "../types/index.ts";
import { Request, Response } from "express";
import { FieldValue } from 'firebase-admin/firestore';
import { tasksCollection, auth } from "../firebase.js";
import { AuthedRequest } from '../types/index.js'


//Add a task
export async function addTask(req: AuthedRequest, res: Response): Promise<void> {

  const uid = req.uid!;

  const { title, description = "" } = req.body as AddBody;

  if (!title) {
    res.status(400).json({ success: false, message: 'Please enter a title' });
    return;
  }

  try {

    const now = FieldValue.serverTimestamp();

    //Let firestore generate the docuument id:
    const taskRef = tasksCollection.doc();

    const taskDoc: Omit<TaskRecord, 'createdAt' | 'updatedAt'> & {
      createdAt: FirebaseFirestore.FieldValue;
      updatedAt: FirebaseFirestore.FieldValue;
    } = {
      taskId: taskRef.id,
      uid,
      title,
      description,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };

    await taskRef.set(taskDoc);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: { taskId: taskRef.id, uid, title, description, completed: false },
    });


  } catch (error: any) {
    console.error("AddTask error: ", error);
    res.status(500).json({ success: false, message: "Failed to create task" });
  }

}

//Get Tasks
export async function getAllTasks(req: AuthedRequest, res: Response): Promise<void> {

  const uid = req.uid!;

  try {
    const snapshot = await tasksCollection.where('uid', '==', uid)
      .orderBy('createdAt', 'desc')
      .get();

    const tasks = snapshot.docs.map(doc => ({
      taskId: doc.id,
      ...doc.data()
    }));

    res.json({ success: true, data: tasks });
  } catch (error) {
    console.error("getTask error: ", error);
    res.status(500).json({ success: false, message: "Failed to get tasks" });
  }

}

//Add a task
export async function updateTask(req: AuthedRequest, res: Response): Promise<void> {

  const uid = req.uid!;

  const { taskId } = req.params as { taskId: string };
  const { title, description, completed } = req.body as UpdateTaskBody;

  if (!title && description === undefined && completed === undefined) {
    res.status(400).json({ success: false, message: "Provide at least 1 field to update" });
    return;
  }

  try {
    const taskRef = tasksCollection.doc(taskId);
    const taskSnap = await taskRef.get();

    if (!taskSnap.exists) {
      res.status(404).json({ success: false, message: 'Task not found' });
      return;
    }

    const task = taskSnap.data() as TaskRecord;
    if (task.uid !== uid) {
      res.status(403).json({ success: false, message: "Not authorized to update this message" });
      return;
    }

    const updates: Record<string, any> = { updatedAt: FieldValue.serverTimestamp() };
    if (title != undefined) updates.title = title;
    if (description != undefined) updates.description = description;
    if (completed != undefined) updates.completed = completed;

    await taskRef.update(updates);
    res.status(200).json({ success: true, message: 'Task updated successfully.' });

  } catch (error) {
    console.error('updateTask error:', error);
    res.status(500).json({ success: false, message: 'Failed to update task.' });
  }

}

//Delete a task
export async function deleteTask(req: AuthedRequest, res: Response): Promise<void> {

  const uid = req.uid!;

  const { taskId } = req.params as { taskId: string };

  try {
    const taskRef = tasksCollection.doc(taskId);
    const taskSnap = await taskRef.get();

    if (!taskSnap.exists) {
      res.status(404).json({ success: false, message: 'Task not found' });
      return;
    }

    const task = taskSnap.data() as TaskRecord;
    if (task.uid !== uid) {
      res.status(403).json({ success: false, message: "Not authorized to delete this message" });
      return;
    }

    await taskRef.delete();
    res.status(200).json({ success: true, message: 'Task deleted successfully.' });

  } catch (error: any) {
    console.error('deleteTask error: ', error);
    res.status(500).json({ success: false, message: "Failed to delete task." });
  }


}
