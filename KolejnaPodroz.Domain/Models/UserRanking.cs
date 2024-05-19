using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Domain.Models
{
    public class UserRanking
    {
        public string Name { get; set; }
        public double TravelTime { get; set; }
        public int TicketsBought { get; set; }
        public int TravelRank { get; set; }
        public int TicketsRank { get; set; }
    }
}
