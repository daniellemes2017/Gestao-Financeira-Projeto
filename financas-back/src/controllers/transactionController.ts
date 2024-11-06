// src/controllers/transactionController.ts
import { Request, Response } from 'express';
import knex from '../database/knex';

interface CustomRequest extends Request {
  userId?: number;
}


export const addTransacao = async (req: CustomRequest, res: Response) => {
  const { tipo, valor, descricao, data } = req.body;
  const id_usuario = req.userId;

  
  if (!tipo || !valor || !descricao || !data) {
    res.status(400).json('Todos os campos são obrigatórios');
    return;
  }

  if (typeof tipo !== 'string' || !['receita', 'despesa'].includes(tipo)) {
    res.status(400).json('Tipo de transação inválido');
    return;
  }

  if (isNaN(valor) || valor <= 0) {
    res.status(400).json('O valor deve ser um número positivo');
    return;
  }

  try {
    
    const [novoId] = await knex('transacoes').insert({
      tipo,
      valor,
      descricao,
      data,
      id_usuario,
    });

    
    const novaTransacao = await knex('transacoes').where({ id: novoId }).first();

    res.status(201).json(novaTransacao);
  } catch (error) {
    console.error('Erro ao adicionar transação:', error);
    res.status(500).json('Erro ao adicionar transação');
  }
};


export const listarTransacoes = async (req: CustomRequest, res: Response) => {
  const id_usuario = req.userId;

  try {
    const transacoes = await knex('transacoes').where({ id_usuario });
    res.status(200).json(transacoes);
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    res.status(500).json('Erro ao buscar transações');
  }
};


export const editarTransacao = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const { tipo, valor, descricao, data } = req.body;
  const id_usuario = req.userId;

  try {
    
    const transacao = await knex('transacoes').where({ id, id_usuario }).first();
    if (!transacao) {
      res.status(404).json('Transação não encontrada ou não pertence ao usuário');
    }

   
    await knex('transacoes').where({ id }).update({
      tipo,
      valor,
      descricao,
      data,
      updated_at: knex.fn.now(),
    });

    res.status(200).json('Transação atualizada com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar transação:', error);
    res.status(500).json('Erro ao atualizar transação');
  }
};


export const deletarTransacao = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const id_usuario = req.userId;

  try {
    
    const transacao = await knex('transacoes').where({ id, id_usuario }).first();
    if (!transacao) {
      res.status(404).json('Transação não encontrada ou não pertence ao usuário');
    }

    
    await knex('transacoes').where({ id }).del();
    res.status(200).json('Transação excluída com sucesso');
  } catch (error) {
    console.error('Erro ao excluir transação:', error);
    res.status(500).json('Erro ao excluir transação');
  }
};
