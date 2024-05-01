using KolejnaPodroz.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Domain.Services.TicketService
{
    public class TicketService : ITicketService
    {
        public Ticket CreateTicket(Connection Connection, User user, decimal Price, int Wagon, int Seat)
        {
            Ticket ticket = new Ticket
            {
                Connection = Connection,
                User = user,
                Price = Price,
                Wagon = Wagon,
                Seat = Seat,
                ExpirationTime = DateTime.MaxValue,
            };
            return ticket;
        }
    }
}
