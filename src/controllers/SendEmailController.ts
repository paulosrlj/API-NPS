import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import SurveysRepository from '../repositories/SurveysRepository';
import SurveysUsersRepository from '../repositories/SurveysUsersRepository';
import UsersRepository from '../repositories/UserRepository';

class SendEmailController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { email, survey_id } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    // verificar se o usuário existe
    const userExists = await usersRepository.findOne({ email });
    if (!userExists)
      return res.status(400).json({ error: 'User does not exists' });
    // verificar se survey existe
    const surveuExists = await surveysRepository.findOne({ id: survey_id });
    if (!surveuExists)
      return res.status(400).json({ error: 'Survey does not exists' });
    // verificar se survey_user no bd
    const surveyUserExist = await surveysUsersRepository.findOne({
      where: { user_id: userExists.id, value: null },
      relations: ['user', 'survey'],
    });

    if (surveyUserExist) {
      //
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: surveyUserExist.id,
      survey_id,
    });

    await surveysUsersRepository.save(surveyUser);

    return res.status(200).json(surveyUser);
  }
}

export default new SendEmailController();
