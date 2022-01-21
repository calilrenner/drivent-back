import Ticket from '@/entities/Ticket';
import ConflictError from '@/errors/ConflictError';
import NotFoundError from '@/errors/NotFoundError';
import TicketInfo from '@/interfaces/ticket';

export async function order(ticket: TicketInfo) {
    const handleCreatedTicket = await Ticket.findTicket({ ticket });

    if (handleCreatedTicket.length > 0) {
        throw new ConflictError('Só é possível criar um ticket por usuário.');
    }

    const createTicket = await Ticket.populateTicket(ticket);

    return createTicket;
}

export async function findTicket({ id }: { id: number }) {
    const ticket = await Ticket.findTicket({ id });

    if (ticket.length === 0) {
        throw new NotFoundError();
    }

    return ticket;
}
