using KolejnaPodroz.DataAccess.Repository.IRepository;
using KolejnaPodroz.Domain.Models;
using KolejnaPodroz.Domain.Services.RankingService;
using Microsoft.AspNetCore.Mvc;

namespace KolejnaPodrozApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RankingController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRankingService _rankingService;

        public RankingController(IUnitOfWork unitOfWork, IRankingService rankingService)
        {
            _unitOfWork = unitOfWork;
            _rankingService = rankingService;
        }

        [HttpGet] 
        public ActionResult<IEnumerable<UserRanking>> Get() 
        {
            try
            {
                var users = _unitOfWork.User.GetAll();
                var userRankings = _rankingService.GetUserRanking(users);
                return Ok(userRankings);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
