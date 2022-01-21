import { Request, Response } from 'express';
import * as paymentService from '../../services/client/payment';

export async function saveTicket(req: Request, res: Response) {
    const data = await paymentService.order(req.body);
    res.send(data);
}

export async function findTicket(req: Request, res: Response) {
    const id = +req.params.id;
    const data = await paymentService.findTicket({ id });

    if (data.length > 0) {
        return res.send(data);
    }
    return res.send({ message: 'Ticket não disponível' });
}
