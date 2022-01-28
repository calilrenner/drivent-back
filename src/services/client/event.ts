import Event from '@/entities/Event';
import Setting from '@/entities/Setting';
import UserEvent from '@/entities/UserEvent';
import ConflictError from '@/errors/ConflictError';
import { EventsByUser } from '@/interfaces/event';
import { getManager } from 'typeorm';

export async function getEventInfo() {
    return await Setting.getEventSettings();
}

export async function postUserEvent(userEvent: EventsByUser) {
    const { userId, eventId } = userEvent;
    const event = await Event.findEvent(eventId);
    const userEventsHours = (await UserEvent.findUserEvent(userId))
        .filter((ev) => ev.event.dayId === event.dayId)
        .map((ev) => ({
            begin: ev.event.beginHour,
            final: ev.event.finalHour,
        }));

    for (let i = 0; i < userEventsHours.length; i++) {
        if (
            +event.beginHour >= +userEventsHours[i].begin &&
            +event.beginHour < +userEventsHours[i].final
        ) {
            throw new ConflictError('Horário conflitante');
        }

        if (
            +event.finalHour >= +userEventsHours[i].begin &&
            +event.finalHour < +userEventsHours[i].final
        ) {
            throw new ConflictError('Horário conflitante');
        }

        if (
            +event.beginHour <= +userEventsHours[i].begin &&
            +event.finalHour >= +userEventsHours[i].final
        ) {
            throw new ConflictError('Horário conflitante');
        }
    }

    const newEvent = await UserEvent.createUserEvent(userEvent);

    return newEvent;
}

export async function updateUserEvent(userEvent: EventsByUser) {
    const { userId, eventId, newEventId } = userEvent;

    const event = await getManager().query(
        'UPDATE user_events SET "eventId" = $1 WHERE "userId" = $2 AND "eventId" = $3',
        [newEventId, userId, eventId],
    );

    return event;
}
