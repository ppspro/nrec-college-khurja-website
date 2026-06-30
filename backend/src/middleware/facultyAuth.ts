import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Faculty from '../models/Faculty';

export interface FacultyAuthRequest extends Request {
  faculty?: {
    id: string;
    email: string;
    departmentId: string;
    isHod: boolean;
  };
}

export const protectFaculty = async (req: FacultyAuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.facultyToken) {
      token = req.cookies.facultyToken;
    }

    if (!token) {
      res.status(401).json({ success: false, message: 'Not authorized as faculty, token missing' });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET || 'secret';
    const decoded = jwt.verify(token, jwtSecret) as { id: string; email: string; role?: string };

    if (decoded.role && decoded.role !== 'faculty') {
      res.status(403).json({ success: false, message: 'Forbidden: Invalid token role' });
      return;
    }

    const faculty = await Faculty.findById(decoded.id).select('-password');
    if (!faculty || !faculty.isActive) {
      res.status(401).json({ success: false, message: 'Faculty account is inactive or not found' });
      return;
    }

    req.faculty = {
      id: faculty._id.toString(),
      email: faculty.email,
      departmentId: faculty.department.toString(),
      isHod: faculty.isHod || false,
    };

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Not authorized, token validation failed' });
  }
};
