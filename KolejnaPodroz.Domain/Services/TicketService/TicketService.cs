using KolejnaPodroz.Domain.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Domain.Services.TicketService
{
    public class TicketService : ITicketService
    {
        private const double STUDENT_DISCOUNT = 0.5;
        private const double SENIOR_DISCOUNT = 0.7;

        public Ticket CreateTicket(Connection Connection, User user, decimal Price, int Wagon, int Seat, TicketType ticketType)
        {
            Ticket ticket = new Ticket
            {
                Connection = Connection,
                User = user,
                Price = CalculatePrice(Price, ticketType),
                Wagon = Wagon,
                Seat = Seat,
                ExpirationTime = DateTime.MaxValue,
                TicketType = ticketType,
                TicketStatus = TicketStatus.WAITING
            };
            return ticket;
        }

        public decimal CalculatePrice(decimal Price, TicketType ticketType)
        {
            switch (ticketType)
            {
                case TicketType.Normal:
                    return Price;
                case TicketType.Student:
                    return Price * (decimal)STUDENT_DISCOUNT;
                case TicketType.Senior:
                    return Price * (decimal)SENIOR_DISCOUNT;
                default: return Price;
            }
        }
    }
}
