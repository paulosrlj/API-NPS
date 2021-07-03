import { Router } from 'express';

import userController from './controllers/UserController';
import surveysController from './controllers/SurveyController';

const router = Router();

router.post('/users', userController.create);

router.get('/surveys', surveysController.show);
router.post('/surveys', surveysController.create);

export default router;
