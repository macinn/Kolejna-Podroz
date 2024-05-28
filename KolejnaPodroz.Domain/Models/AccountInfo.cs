using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Domain.Models
{
    public class AccountInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public Role Role { get; set; }
        public int LoyaltyPoints {  get; set; }
        public int TravelTime { get; set; }
        public int TicketsBought { get; set; }
        public decimal Balance { get; set; }
    }
}
