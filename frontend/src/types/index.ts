import { firestore } from 'firebase-admin';

export interface TaskRecord {
  taskId: string;
  uid: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
}

export interface UpdateTaskBody {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface AuthProfile {
  uid: string;
  name: string;
  email: string;
}

export interface LoginProps {
  onLogin: (profile: AuthProfile, idToken: string) => void;
  API_URL?: string;
}

export interface SignUpProps {
  onSignUp: (profile: AuthProfile, token: string) => void;
  API_URL?: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  api?: string;
}
