using KolejnaPodroz.Domain.Models;

namespace KolejnaPodrozApp.Models.Ticket
{
    public class TicketPostRequest
    {
        public int ConnectionId { get; set; }
        public string UserAuth0Id { get; set; }
        public decimal Price { get; set; }
        public int Wagon {  get; set; }
        public int Seat { get; set; }
        public TicketType TicketType { get; set; }
    }
}
