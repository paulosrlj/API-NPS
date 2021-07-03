import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import SurveysRepository from '../repositories/SurveysRepository';

class SurveyController {
  async create(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;

    const surveysRepository = getCustomRepository(SurveysRepository);

    const survey = surveysRepository.create({
      title,
      description,
    });

    await surveysRepository.save(survey);
    return res.status(200).json(survey);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const surveysRepository = getCustomRepository(SurveysRepository);
    const allSurveys = await surveysRepository.find();

    return res.status(200).json(allSurveys);
  }
}

export default new SurveyController();
