using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Domain.Models
{
    public class Statistics
    {
        public int Id { get; set; }
        public int NumberOfTrips { get; set; }
        public int LateTrains { get; set; }
        public Ticket MostExpensiveTicket { get; set; }
        public User User { get; set; }
    }
}
