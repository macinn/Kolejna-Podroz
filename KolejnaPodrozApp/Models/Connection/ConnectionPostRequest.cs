namespace KolejnaPodrozApp.Models.Connection
{
    using KolejnaPodroz.Domain.Models;
    public class ConnectionPostRequest
    {
        public int Id;
        public int StartStationId;
        public int EndStationId;
        public int ProviderId;
        public DateTime DepartureTime;
        public int TravelTime;
    }
}
