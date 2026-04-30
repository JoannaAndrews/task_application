import { Request, Response, NextFunction } from 'express';
import { auth } from '../firebase';
import { AuthedRequest } from '../types/index'

const authMiddleWare = async (req: AuthedRequest, res: Response, next: NextFunction): Promise<void> => {

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: "No token provided" });
    return;
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.uid = decodedToken.uid;

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid or Expired Token" });
  }
}

export default authMiddleWare;