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
    public class ConnectionRepository : Repository<Connection>, IConnectionRepository
    {
        private ApplicationDbContext _db;
        public ConnectionRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _db = dbContext;
        }
        public void Update(Connection connection)
        {
            _db.Connections.Update(connection);
        }

        public override IEnumerable<Connection> GetAll(Expression<Func<Connection, bool>> filter)
        {
            var query = _db.Set<Connection>()
                .Include(i => i.From)
                .Include(i => i.Destination)
                .Include(i => i.Provider)
                .Where(filter);
            return query.ToList();
        }
    }
}
