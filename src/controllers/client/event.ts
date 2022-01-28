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

export async function getEventsByDayId(req: Request, res: Response) {
    const dayId = +req.params.id;
    const trails = await service.getEventsByDayId(dayId);
    res.send(trails);
}
