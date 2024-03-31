using KolejnaPodroz.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.DataAccess.Repository.IRepository
{
    public interface ITicketRepository : IRepository<Ticket>
    {
        void Update(Ticket ticket);
    }
}
