using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Domain.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public Connection Connection { get; set; }
        public decimal Price { get; set; }
        public int Wagon { get; set; }
        public int Seat { get; set; }
        public DateTime ExpirationTime { get; set; }
        public User User { get; set; }
    }
}
