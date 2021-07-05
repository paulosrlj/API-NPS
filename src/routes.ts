import { Router } from 'express';

import userController from './controllers/UserController';
import surveysController from './controllers/SurveyController';
import SendEmailController from './controllers/SendEmailController';

const router = Router();

router.post('/users', userController.create);

router.get('/surveys', surveysController.show);
router.post('/surveys', surveysController.create);

router.post('/sendMail', SendEmailController.execute);

export default router;
