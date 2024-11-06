import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; 
interface CustomRequest extends Request {
  userId?: number;
}

export function verifyToken(req: CustomRequest, res: Response, next: NextFunction): void {
  const token = req.headers['authorization']?.split(' ')[1]; 
  if (!token) {
    res.status(401).send('Acesso negado. Nenhum token fornecido.');
    return;
  }

  if (!process.env.JWT_SECRET) {
    console.error("Erro: JWT_SECRET não está definido.");
    res.status(500).send('Erro no servidor. Contate o administrador.');
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number };
    req.userId = decoded.id; 
    next(); 
  } catch (error) {
    console.error('Erro ao verificar o token:', error);
    res.status(401).send('Token inválido.');
  }
}

