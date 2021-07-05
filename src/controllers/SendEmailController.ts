import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { resolve } from 'path';

import SurveysRepository from '../repositories/SurveysRepository';
import SurveysUsersRepository from '../repositories/SurveysUsersRepository';
import UsersRepository from '../repositories/UserRepository';
import SendEmailService from '../services/SendEmailService';

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
    const surveyExists = await surveysRepository.findOne({ id: survey_id });
    if (!surveyExists)
      return res.status(400).json({ error: 'Survey does not exists' });
    // verificar se survey_user no bd
    const path = resolve(__dirname, '..', 'views', 'emails', 'npsEmail.hbs');
    const variables = {
      name: userExists.name,
      title: surveyExists.title,
      description: surveyExists.description,
      link: process.env.URL_MAIL,
      id: '',
    };

    const surveyUserExist = await surveysUsersRepository.findOne({
      where: { user_id: userExists.id, value: null },
      relations: ['user', 'survey'],
    });

    if (surveyUserExist) {
      variables.id = surveyUserExist.id;
      // enviar o email

      await SendEmailService.execute(
        email,
        surveyExists.title,
        variables,
        path,
      );

      return res.status(200).json(surveyUserExist);
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: userExists.id,
      survey_id,
    });

    await surveysUsersRepository.save(surveyUser);

    // enviar o email
    variables.id = surveyUser.id;

    await SendEmailService.execute(email, surveyExists.title, variables, path);

    return res.status(200).json(surveyUser);
  }
}

export default new SendEmailController();
