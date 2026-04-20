import { firestore } from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';


export interface AuthedRequest extends Request {
  uid?: string;
}

export interface UserRecord {
  uid: string;
  name: string;
  email: string;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
}

//Type expected for a POST request to register a new user
export interface RegisterBody {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

//Type expected for a POST request to log in a new user
export interface LoginBody {
  email: string;
  password: string;
}

//Type expected for a POST request to update a user profile
export interface UpdateProfileBody {
  name?: string;
  email?: string;
}

//Type expected for PUT request to update password
export interface UpdatePasswordBody {
  newPassword: string;
}

export interface TaskRecord {
  taskId: string;
  uid: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
}

export interface AddBody {
  title: string;
  description?: string;
}

export interface UpdateTaskBody {
  title?: string;
  description?: string;
  completed?: boolean;
}