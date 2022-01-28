/* eslint-disable no-console */
import Event from '@/entities/Event';
import Day from '@/entities/Day';
import Setting from '@/entities/Setting';
import { FormattedEvent } from '@/interfaces/formattedEvent';
Event;

export async function getEventInfo() {
    return await Setting.getEventSettings();
}

export async function getEventsByDayId(dayId: number) {
    const dayData = await Day.getEventsByDayId(dayId);

    const firstTrailEvents: FormattedEvent[] = [];
    const secondTrailEvents: FormattedEvent[] = [];
    const thirdTrailEvents: FormattedEvent[] = [];

    dayData.events.forEach((ev: Event) => {
        let beginTimeString = '';
        if (ev.beginHour < 10) beginTimeString += '0';
        beginTimeString += `${ev.beginHour}:`;
        if (ev.beginHour - Math.floor(ev.beginHour) > 0)
            beginTimeString += '30';
        else beginTimeString += '00';

        let endTimeString = '';
        if (ev.finalHour < 10) endTimeString += '0';
        endTimeString += `${ev.finalHour}:`;
        if (ev.finalHour - Math.floor(ev.finalHour) > 0) endTimeString += '30';
        else endTimeString += '00';

        const formattedEvent = {
            id: ev.id,
            name: ev.name,
            startTime: beginTimeString,
            endTime: endTimeString,
            duration: ev.finalHour - ev.beginHour,
            vacancies: ev.vacancies,
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
