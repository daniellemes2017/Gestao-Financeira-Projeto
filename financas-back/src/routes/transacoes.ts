import { Router } from 'express';
import { addTransacao, listarTransacoes, editarTransacao, deletarTransacao } from '../controllers/transactionController';
import { verifyToken } from '../middlewares/authMiddleware';

const transacoesRoutes = Router();


transacoesRoutes.post('/transacoes', verifyToken, addTransacao);


transacoesRoutes.get('/transacoes', verifyToken, listarTransacoes);


transacoesRoutes.put('/transacoes/:id', verifyToken, editarTransacao);


transacoesRoutes.delete('/transacoes/:id', verifyToken, deletarTransacao);

export default transacoesRoutes;




