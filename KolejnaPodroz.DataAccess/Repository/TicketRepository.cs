using KolejnaPodroz.DataAccess.Data;
using KolejnaPodroz.DataAccess.Repository.IRepository;
using KolejnaPodroz.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.DataAccess.Repository
{
    public class TicketRepository : Repository<Ticket>, ITicketRepository
    {
        private ApplicationDbContext _db;
        public TicketRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _db = dbContext;
        }
        public void Update(Ticket ticket)
        {
            _db.Tickets.Update(ticket);
        }
        public override IEnumerable<Ticket> GetAll(Expression<Func<Ticket, bool>> filter)
        {
            var query = _db.Set<Ticket>()
                .Include(t => t.User)
                .Include(t => t.Connection)
                .ThenInclude(c => c.Destination)
                .Include(t => t.Connection)
                .ThenInclude(c => c.From)
                .Where(filter);
            return query.ToList();
        }
        public override Ticket? Get(Expression<Func<Ticket, bool>> filter)
        {
            var query = _db.Set<Ticket>()
                .Include(t => t.User)
                .Include(t => t.Connection)
                .ThenInclude(c => c.Destination)
                .Include(t => t.Connection)
                .ThenInclude(c => c.From)
                .Where(filter);
            return query.FirstOrDefault();
        }
    }
}
