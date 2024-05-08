using KolejnaPodroz.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Domain.Services.TicketService
{
    public interface ITicketService
    {
        Ticket CreateTicket(Connection Connection, User user, decimal Price, int Wagon, int Seat, TicketType ticketType);
    }
}
