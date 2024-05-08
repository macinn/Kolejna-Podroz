namespace KolejnaPodrozApp.Models.Ticket
{
    public class AcceptTicketPostRequest
    {
        public int TicketId { get; set; }
        public string UserAuth0Id { get; set; }
    }
}
