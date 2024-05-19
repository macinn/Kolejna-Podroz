using KolejnaPodroz.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Domain.Services.RankingService
{
    public class RankingService : IRankingService
    {
        public List<UserRanking> GetUserRanking(IEnumerable<User> users)
        {
            var travelRanking = users.OrderByDescending(u => u.AccountInfo.TravelTime)
                                      .Select((u, index) => new { User = u, Rank = index + 1 })
                                      .ToDictionary(x => x.User, x => x.Rank);

            var ticketsRanking = users.OrderByDescending(u => u.AccountInfo.TicketsBought)
                                       .Select((u, index) => new { User = u, Rank = index + 1 })
                                       .ToDictionary(x => x.User, x => x.Rank);

            List<UserRanking> userRankings = users.Select(u => new UserRanking
            {
                Name = $"{u.AccountInfo.Name} {u.AccountInfo.Surname} ({u.AccountInfo.Email})",
                TravelTime = (double)u.AccountInfo.TravelTime / 60,
                TicketsBought = u.AccountInfo.TicketsBought,
                TravelRank = travelRanking[u],
                TicketsRank = ticketsRanking[u]
            }).ToList();

            return userRankings;
        }
    }
}
