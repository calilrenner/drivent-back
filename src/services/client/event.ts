/* eslint-disable no-console */
import Event from '@/entities/Event';
import Day from '@/entities/Day';
import Setting from '@/entities/Setting';
import UserEvent from '@/entities/UserEvent';
import ConflictError from '@/errors/ConflictError';
import { EventsByUser } from '@/interfaces/event';
import { FormattedEvent } from '@/interfaces/formattedEvent';

export async function getEventInfo() {
    return await Setting.getEventSettings();
}

export async function postUserEvent(userEvent: EventsByUser) {
    const { userId, eventId } = userEvent;
    const event = await Event.findEvent(eventId);
    const userEvents = (await UserEvent.findUserEvent(userId)).filter(
        (ev) => ev.event.dayId === event.dayId,
    );
    const userEventsHours = userEvents.map((ev) => ({
        begin: ev.event.beginHour,
        final: ev.event.finalHour,
    }));

    for (let i = 0; i < userEventsHours.length; i++) {
        if (
            +event.beginHour >= +userEventsHours[i].begin &&
            +event.beginHour < +userEventsHours[i].final
        ) {
            throw new ConflictError(`O seguinte evento está em conflito com o evento selecionado.
                Evento : ${
    userEvents[i].event.name
} (${userEventsHours[i].begin
    .toString()
    .replace('.', 'h')
    .replace('h5', 'h3')} - ${userEventsHours[i].final
    .toString()
    .replace('.', 'h')
    .replace('h5', 'h3')})
            `);
        }

        if (
            +event.finalHour >= +userEventsHours[i].begin &&
            +event.finalHour < +userEventsHours[i].final
        ) {
            throw new ConflictError(`O seguinte evento está em conflito com o evento selecionado.
                Evento : ${
    userEvents[i].event.name
} (${userEventsHours[i].begin
    .toString()
    .replace('.', 'h')
    .replace('h5', 'h3')} - ${userEventsHours[i].final
    .toString()
    .replace('.', 'h')
    .replace('h5', 'h3')}
        `);
        }

        if (
            +event.beginHour <= +userEventsHours[i].begin &&
            +event.finalHour >= +userEventsHours[i].final
        ) {
            throw new ConflictError(`O seguinte evento está em conflito com o evento selecionado.
            Evento : ${
    userEvents[i].event.name
} (${userEventsHours[i].begin
    .toString()
    .replace('.', 'h')
    .replace('h5', 'h3')} - ${userEventsHours[i].final
    .toString()
    .replace('.', 'h')
    .replace('h5', 'h3')}
        `);
        }
    }

    const newEvent = await UserEvent.createUserEvent(userEvent);

    return newEvent;
}

export async function updateUserEvent(userEvent: EventsByUser) {
    const { userId, eventId } = userEvent;
    const deleteEvent = await UserEvent.updateEvent(userId, eventId);

    return deleteEvent;
}

export async function getEventsByDayId(dayId: number, userId: number) {
    const dayData = await Day.getEventsByDayId(dayId);

    const userEvents = (await UserEvent.find()).map((ue) => ue.eventId);
    const userEventsAmount = (eventId: number) => {
        return userEvents.filter((ev) => ev === eventId).length;
    };
    const HandleHighlightedEvents = (
        await UserEvent.findEventsByUserId(userId)
    ).map((ev) => ev.event.id);

    const firstTrailEvents: FormattedEvent[] = [];
    const secondTrailEvents: FormattedEvent[] = [];
    const thirdTrailEvents: FormattedEvent[] = [];

    dayData.forEach(async (ev: Event) => {
        let beginTimeString = '';
        if (ev.beginHour < 10) beginTimeString += '0';
        beginTimeString += `${ev.beginHour}`.replace('.5', ':3').replace('.0', ':0');

        let endTimeString = '';
        if (ev.finalHour < 10) endTimeString += '0';
        endTimeString += `${ev.finalHour}`.replace('.5', ':3').replace('.0', ':0');

        const formattedEvent = {
            id: ev.id,
            name: ev.name,
            startTime: beginTimeString,
            endTime: endTimeString,
            duration: ev.finalHour - ev.beginHour,
            vacancies: ev.vacancies - userEventsAmount(ev.id),
            reservedByThisUser: HandleHighlightedEvents.includes(ev.id) && true,
        };
        if (ev.trailId === 1) firstTrailEvents.push(formattedEvent);
        if (ev.trailId === 2) secondTrailEvents.push(formattedEvent);
        if (ev.trailId === 3) thirdTrailEvents.push(formattedEvent);
    });

    const trails = [
        { id: 1, trailName: 'Auditório Principal', events: firstTrailEvents },
        { id: 2, trailName: 'Auditório Lateral', events: secondTrailEvents },
        { id: 3, trailName: 'Sala de Workshop', events: thirdTrailEvents },
    ];
    return trails;
}
