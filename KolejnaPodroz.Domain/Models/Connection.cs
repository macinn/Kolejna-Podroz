using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Domain.Models
{
    public class Connection
    {
        public int Id { get; set; }
        public string From { get; set; }
        public string Destination { get; set; }
        public decimal Price { get; set; }
        public int Wagon { get; set; }
        public int Seat { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public Provider Provider { get; set; }
    }
}
