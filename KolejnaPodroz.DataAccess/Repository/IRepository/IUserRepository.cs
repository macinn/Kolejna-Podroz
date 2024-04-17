using KolejnaPodroz.Domain.Models;

namespace KolejnaPodroz.DataAccess.Repository.IRepository
{
    public interface IUserRepository : IRepository<User>
    {
        void Update(User user);
    }
}
