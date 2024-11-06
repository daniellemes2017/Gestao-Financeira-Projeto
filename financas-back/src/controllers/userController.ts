// src/controllers/userController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import knex from '../database/knex';


interface CustomRequest extends Request {
  userId?: number;
}


export const getUsuario = async (req: CustomRequest, res: Response): Promise<void> => {
  const id_usuario = req.userId;

  try {
    const usuario = await knex('usuarios').where({ id: id_usuario }).first();
    if (!usuario) {
      res.status(404).json('Usuário não encontrado');
      return;
    }

    const { id, nome, email } = usuario;
    res.status(200).json({ id, nome, email });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json('Erro ao buscar usuário');
  }
};


export const register = async (req: Request, res: Response): Promise<void> => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    res.status(400).send('Todos os campos são obrigatórios');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).send('E-mail inválido');
    return;
  }

  if (senha.length < 8) {
    res.status(400).send('A senha deve ter pelo menos 8 caracteres');
    return;
  }

  const hash = await bcrypt.hash(senha, 10);

  try {
    await knex('usuarios').insert({ nome, email, senha: hash });
    res.status(201).send('Usuário registrado com sucesso');
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).send('Erro ao registrar usuário');
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    res.status(400).send('E-mail e senha são obrigatórios');
    return;
  }

  try {
    const usuario = await knex('usuarios').where({ email }).first();
    if (!usuario) {
      res.status(404).send('Usuário não encontrado');
      return;
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      res.status(401).send('Senha incorreta');
      return;
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).send('Erro no login');
  }
};

