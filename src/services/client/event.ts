import Event from '@/entities/Event';
import Setting from '@/entities/Setting';
import UserEvent from '@/entities/UserEvent';
import { EventsByUser } from '@/interfaces/event';
Event;

export async function getEventInfo() {
    return await Setting.getEventSettings();
}

export async function postUserEvent(userEvent: EventsByUser) {
    const { userId, eventId } = userEvent;
    const userEventsHours = (await UserEvent.findUserEvent(userId)).map(
        (ev) => ({ begin: ev.event.beginHour, final: ev.event.finalHour }),
    );
    const event = await Event.findEvent(eventId);

    for (let i = 0; i < userEventsHours.length; i++) {
        if (
            event.beginHour >= userEventsHours[i].begin &&
            event.beginHour < userEventsHours[i].final
        ) {
            return 'Não foi dessa vez';
        }

        if (
            event.finalHour >= userEventsHours[i].begin &&
            event.finalHour < userEventsHours[i].final
        ) {
            return 'Não foi dessa vez';
        }
    }

    // console.log(userEvents, events);

    // const newEvent = await UserEvent.createUserEvent(userEvent);

    return userEvents;
}
