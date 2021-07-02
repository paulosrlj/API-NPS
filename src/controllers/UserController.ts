import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import UsersRepository from '../repositories/UserRepository';

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const userRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await userRepository.findOne({ email });
    if (userAlreadyExists)
      return res.status(400).json({ error: 'user already exists' });

    const user = userRepository.create({
      name,
      email,
    });

    await userRepository.save(user);

    return res.status(200).json({ user });
  }
}

export default new UserController();
