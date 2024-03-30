using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        IConnectionRepository Connection { get; }
        IProviderRepository Provider { get; }
        ITicketRepository Ticket { get; }
        void Save();
    }
}
