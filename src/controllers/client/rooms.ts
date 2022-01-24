import { Request, Response } from 'express';
import * as roomsService from '../../services/client/rooms';

export async function postReservation(req: Request, res: Response) {
    await roomsService.postVacancyReservation(req.body);
    return res.sendStatus(201);
}
