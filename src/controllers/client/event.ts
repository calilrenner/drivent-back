import { Request, Response } from 'express';

import * as service from '@/services/client/event';

export async function get(req: Request, res: Response) {
    const eventInfo = await service.getEventInfo();
    res.send(eventInfo);
}

export async function postUserEvent(req: Request, res: Response) {
    const userEventInfo = req.body;

    const newUserEvent = await service.postUserEvent(userEventInfo);
    res.send(newUserEvent);
}

export async function updateUserEvent(req: Request, res: Response) {
    const updatedEvent = await service.updateUserEvent(req.body);
    res.send(updatedEvent);
}
