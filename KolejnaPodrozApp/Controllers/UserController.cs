using KolejnaPodroz.DataAccess.Repository.IRepository;
using KolejnaPodroz.Domain.Models;
using KolejnaPodroz.Domain.Services.EmailService;
using KolejnaPodroz.Domain.Services.TicketService;
using KolejnaPodrozApp.Models.Balance;
using Microsoft.AspNetCore.Mvc;

namespace KolejnaPodrozApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public ActionResult<AccountInfo> Get(string auth0Id)
        {
            var user = _unitOfWork.User.Get(u => u.Auth0Id == auth0Id);

            if(user == null)
                return NotFound("User not found.");
            return Ok(user.AccountInfo);
        }

        [HttpGet("GetUserBalance")]
        public ActionResult<AccountInfo> GetUserBalance(string auth0Id)
        {
            var user = _unitOfWork.User.Get(u => u.Auth0Id == auth0Id);

            if (user == null)
                return NotFound("User not found.");
            return Ok(user.AccountInfo.Balance);
        }

        [HttpPost("ExchangeLoyaltyPoints")]
        public ActionResult<AccountInfo> ExchangeLoyaltyPoints(ExchangeLoyaltyPointsRequest request)
        {
            var user = _unitOfWork.User.Get(u => u.Auth0Id == request.Auth0Id);

            if (user == null)
                return NotFound("User not found.");

            if(user.AccountInfo.LoyaltyPoints >=  request.LoyaltyPoints)
            {
                user.AccountInfo.LoyaltyPoints -= request.LoyaltyPoints;
                user.AccountInfo.Balance += request.LoyaltyPoints;
                _unitOfWork.User.Update(user);
                _unitOfWork.Save();
            }
            else
            {
                return BadRequest();
            }

            return Ok(user.AccountInfo.Balance);
        }
    }
}
