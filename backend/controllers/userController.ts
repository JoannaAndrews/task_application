import { LoginBody, RegisterBody, UpdatePasswordBody, UpdateProfileBody, UserRecord } from "../types/index";
import { Request, Response } from "express";
import { FieldValue } from 'firebase-admin/firestore';
import { auth, usersCollection } from "../firebase";
import { AuthedRequest } from '../types/index'


const TOKEN_EXPIRES = '24h';

//Register a User
async function signInWithEmailPassword(email: string, password: string): Promise<string> {

  const apiKey = process.env.FIREBASE_WEB_API_KEY;
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

  const response = await fetch(url,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    });

  const data = await response.json() as
    {
      idToken?: string,
      error?: { message: string }
    };
  console.error('Identity Toolkit response:', data); // add this


  if (!response.ok || !data.idToken) {
    throw new Error(`API Req failed w/ status ${response.status}`)
  }

  return data.idToken;
}

//Register a User
export async function registerUser(req: Request, res: Response): Promise<void> {

  const { name, email, password, confirmPassword } = req.body as RegisterBody;

  if (!name || !email || !password || !confirmPassword) {
    res.status(400).json({ success: false, message: 'All fields are required.' });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({ success: false, message: 'Passwords do not match.' });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    return;
  }

  try {
    const userRecord = await auth.createUser({ email, password, displayName: name });
    const now = FieldValue.serverTimestamp();
    const userDoc: Omit<UserRecord, 'createdAt' | 'updatedAt'> & {
      createdAt: FirebaseFirestore.FieldValue;
      updatedAt: FirebaseFirestore.FieldValue;
    } = {
      uid: userRecord.uid,
      name,
      email,
      createdAt: now,
      updatedAt: now,
    };

    await usersCollection.doc(userRecord.uid).set(userDoc);

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      data: { uid: userRecord.uid, name, email },
    });

  } catch (error: any) {

    if (error.code === 'auth/email-already-exists') {
      res.status(409).json({ success: false, message: 'Email is already in use.' });
    } else {
      console.error('registerUser error:', error);
      res.status(500).json({ success: false, message: 'Registration failed.' });
    }

  }

}

// To Login a User
export async function loginUser(req: Request, res: Response): Promise<void> {

  const { email, password } = req.body as LoginBody;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "Both fields are required."
    });
    return;
  }

  try {

    const idToken = await signInWithEmailPassword(email, password);

    const decoded = await auth.verifyIdToken(idToken);

    const user = await usersCollection.doc(decoded.uid).get();
    const profile = user.data() as UserRecord | undefined;


    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        idToken,
        uid: decoded.uid,
        name: profile?.name ?? '',
        email: decoded.email ?? email,
      },
    });

  } catch (error: any) {

    console.error('loginUser full error:', error.message); // add this

    const isInvalidCredentials =
      error.message?.includes('INVALID_PASSWORD') ||
      error.message?.includes('EMAIL_NOT_FOUND') ||
      error.message?.includes('INVALID_LOGIN_CREDENTIALS');

    if (isInvalidCredentials) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
    } else {
      console.error('loginUser error:', error);
      res.status(500).json({ success: false, message: 'Login failed.' });
    }


  }

}

// to get login user details
export async function getCurrentUser(req: AuthedRequest, res: Response): Promise<void> {
  try {

    const uid = req.uid!;

    const user = await usersCollection.doc(uid).get();

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found"
      });
      return;
    }

    const { uid: _uid, ...profile } = user.data() as UserRecord;

    res.json({ success: true, data: { uid, ...profile } });
  }

  catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user"
    });
  }
}

//to update a user profile
export async function updateProfile(req: AuthedRequest, res: Response): Promise<void> {

  const uid = req.uid!;
  const { name, email } = req.body as UpdateProfileBody;

  if (!name || !email) {
    res.status(400).json(
      { success: false, message: "Valid email and name are required" }
    );
    return;
  }


  try {

    //Updating Firebase auth record
    const authUpdate: { displayName?: string; email?: string } = {};
    if (name) authUpdate.displayName = name;
    if (email) authUpdate.displayName = email;
    await auth.updateUser(uid, authUpdate);

    //Updating firestore document
    const firestoreUpdate: Record<string, any> = { updatedAt: FieldValue.serverTimestamp() };
    if (name) firestoreUpdate.name = name;
    if (email) firestoreUpdate.email = email;
    await usersCollection.doc(uid).update(firestoreUpdate);

    res.status(200).json({
      success: true,
      message: "Profile updated sucessfully"
    });

  }
  catch (error: any) {
    if (error.code === 'auth/email-already-exists') {
      res.status(409).json({ success: false, message: 'Email is already in use.' });
    } else {
      console.error('updateProfile error:', error);
      res.status(500).json({ success: false, message: 'Failed to update profile.' });
    }
  }
}

// to change user password
export async function updatePassword(req: AuthedRequest, res: Response) {

  const uid = req.uid!;
  const { newPassword } = req.body as UpdatePasswordBody;

  if (!newPassword) {
    res.status(400).json({ success: false, message: 'newPassword is required.' });
    return;
  }

  if (newPassword.length < 6) {
    res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    return;
  }


  try {

    await auth.updateUser(uid, { password: newPassword });

    res.status(200).json({
      success: true,
      message: "Password changed"
    });

  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update password"
    });
  }
}