namespace KolejnaPodrozApp.Models.Connection
{
    public class ConnectionPostRequest
    {
        public int StartStationId { get; set; }
        public int EndStationId { get; set; }
        public int ProviderId { get; set; }
        public string DepartureTime { get; set; }
        public int TravelTime { get; set; }
        public int Points { get; set; }
        public decimal Price { get; set; }
    }
}
