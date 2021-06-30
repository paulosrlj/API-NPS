import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../entities/User';

export default class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const userRepository = getRepository();

    return res.status(400).json({ message: 'Olá', name });
  }
}
