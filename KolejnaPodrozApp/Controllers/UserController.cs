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
        private readonly IEmailService _emailService;
        private const decimal LoyaltyPointsExchangeRate = 0.01m;

        public UserController(IUnitOfWork unitOfWork, IEmailService emailService)
        {
            _unitOfWork = unitOfWork;
            _emailService = emailService;
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

        [HttpGet("LoyaltyPointsExchangeRate")]
        public ActionResult<decimal> GetLoyaltyPointsExchangeRate()
        {
            return Ok(LoyaltyPointsExchangeRate);
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
                user.AccountInfo.Balance += request.LoyaltyPoints * LoyaltyPointsExchangeRate;
                _unitOfWork.User.Update(user);
                _unitOfWork.Save();
            }
            else
            {
                return BadRequest();
            }

            return Ok(user.AccountInfo);
        }

        [HttpPost("TopUpBalance")]
        public ActionResult<AccountInfo> TopUpBalance(BalanceTopUpRequest request)
        {
            var user = _unitOfWork.User.Get(u => u.Auth0Id == request.Auth0Id);

            if (user == null)
                return NotFound("User not found.");

            _emailService.SendEmail("Balance top up pending!", 
                user.AccountInfo.Email, 
                "KolejnaPodroz", 
                "Prosze przelać pieniążki!").Wait();

            user.AccountInfo.Balance += request.Amount;
            _unitOfWork.User.Update(user);
            _unitOfWork.Save();

            return Ok(user.AccountInfo);
        }

    }
}
