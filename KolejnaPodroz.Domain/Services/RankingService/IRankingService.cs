using KolejnaPodroz.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Domain.Services.RankingService
{
    public interface IRankingService
    {
        public List<UserRanking> GetUserRanking(IEnumerable<User> users);
    }
}
