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
    public class UserRepository : Repository<User>, IUserRepository
    {
        private ApplicationDbContext _db;
        public UserRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _db = dbContext;
        }

        public void Update(User user)
        {
            _db.Users.Update(user);
        }

        public override IEnumerable<User> GetAll(Expression<Func<User, bool>> filter)
        {
            var query = _db.Set<User>()
                .Include(u => u.AccountInfo)
                .Where(filter);
            return query.ToList();
        }
        public override IEnumerable<User> GetAll()
        {
            var query = _db.Set<User>()
                .Include(u => u.AccountInfo);
            return query.ToList();
        }
        public override User? Get(Expression<Func<User, bool>> filter)
        {
            var query = _db.Set<User>()
                .Include(u => u.AccountInfo)
                .Where(filter);
            return query.FirstOrDefault();
        }
    }
}
