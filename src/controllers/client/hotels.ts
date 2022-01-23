import { Request, Response } from 'express';
import * as hotelsService from '../../services/client/hotels';

export async function getHotels(req: Request, res: Response) {
    const hotels = await hotelsService.getHotels();

    if (hotels.length > 0) {
        return res.send(hotels);
    }
    return res.send({ message: 'Não há hotéis cadastrados' });
}
