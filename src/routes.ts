import { Router } from 'express';

import userController from './controllers/UserController';

const router = Router();

router.get('/users', userController.create);

router.post('/users', (req, res) => {
  console.log(req.body);

  const { name } = req.body;
  return res.status(400).json({ message: 'Olá post', name });
});

export default router;
