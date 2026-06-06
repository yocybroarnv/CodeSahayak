import type { Request, Response, NextFunction } from 'express';
import { verifyToken, type JWTPayload } from '../lib/jwt.js';
import { isBlacklisted } from '../lib/tokenBlacklist.js';

export interface AuthRequest extends Request {
  user?: JWTPayload;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const token = authHeader.substring(7);
    
    // Check if token has been revoked (logout blacklist)
    if (await isBlacklisted(token)) {
      res.status(401).json({ error: 'Token revoked — please login again' });
      return;
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};


export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: 'Insufficient permissions' });
      return;
    }

    next();
  };
};
