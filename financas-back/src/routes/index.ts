// src/routes/index.ts
import { Router } from 'express';
import authRoutes from './auth';
import transacoesRoutes from './transacoes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/api', transacoesRoutes);

export default router;







