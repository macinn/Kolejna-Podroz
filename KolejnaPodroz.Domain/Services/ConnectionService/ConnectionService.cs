using KolejnaPodroz.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Domain.Services.ConnectionService
{
    public class ConnectionService : IConnectionService
    {
        public Connection CreateConnection(Station from, Station destination, DateTime departureTime, DateTime arrivalTime, Provider provider, int points)
        {
            return new Connection
            {
                From = from,
                Destination = destination,
                DepartureTime = departureTime,
                ArrivalTime = arrivalTime,
                Provider = provider,
                Points = points
            };
        }
    }
}
