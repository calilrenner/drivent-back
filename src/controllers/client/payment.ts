import { Request, Response } from 'express';
import * as paymentService from '../../services/client/payment';

export async function saveTicket(req: Request, res: Response) {
    const data = await paymentService.order(req.body);
    res.send(data);
}
