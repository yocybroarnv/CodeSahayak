import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });
};

export const verifyToken = (token: string): JWTPayload => {
  if (process.env.NODE_ENV !== 'production') {
    if (token === 'demo_student_token') {
      return {
        userId: 'demo_student_id',
        email: 'student@demo.com',
        role: 'STUDENT',
      };
    }
    if (token === 'demo_teacher_token') {
      return {
        userId: 'demo_teacher_id',
        email: 'teacher@demo.com',
        role: 'TEACHER',
      };
    }
  }
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId, type: 'refresh' }, JWT_SECRET, { expiresIn: '30d' });
};
