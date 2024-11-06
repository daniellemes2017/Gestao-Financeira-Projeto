// src/routes/auth.ts
import { Router } from 'express';
import { register, login, getUsuario } from '../controllers/userController';
import { verifyToken } from '../middlewares/authMiddleware';

const authRoutes = Router();


authRoutes.get('/usuario', verifyToken, getUsuario);


authRoutes.post('/register', register);


authRoutes.post('/login', login);

export default authRoutes;

