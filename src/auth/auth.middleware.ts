import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthPayload } from 'src/auth/interfaces/auth-payload';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(400).json({ message: 'Não autenticado' });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
      (req as any).user = payload;
      next();
    } catch {
      return res.status(401).json({ message: 'Token inválido' });
    }
  }
}