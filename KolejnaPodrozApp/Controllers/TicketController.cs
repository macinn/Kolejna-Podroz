using KolejnaPodroz.DataAccess.Repository.IRepository;
using KolejnaPodroz.Domain.Models;
using KolejnaPodroz.Domain.Services.EmailService;
using KolejnaPodroz.Domain.Services.TicketService;
using KolejnaPodrozApp.Models.Login;
using KolejnaPodrozApp.Models.Ticket;
using Microsoft.AspNetCore.Mvc;

namespace KolejnaPodrozApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITicketService _ticketService;
        private readonly IEmailService _emailService;

        public TicketController(IUnitOfWork unitOfWork, ITicketService ticketService, IEmailService emailService)
        {
            _unitOfWork = unitOfWork;
            _ticketService = ticketService;
            _emailService = emailService;
        }

        [HttpPost]
        public IActionResult Post(TicketPostRequest request)
        {
            User? user = null;
            if(request.UserAuth0Id != null)
            {
                user = _unitOfWork.User.GetAll(u => u.Auth0Id == request.UserAuth0Id).FirstOrDefault();
            }

            Connection connection = _unitOfWork.Connection.GetAll(c => c.Id == request.ConnectionId).FirstOrDefault();

            Ticket ticket = _ticketService.CreateTicket(connection, user, request.Price, request.Wagon, request.Seat, request.TicketType);

            _unitOfWork.Ticket.Add(ticket);

            if (user != null)
            {
                user.AccountInfo.LoyaltyPoints += connection.Points;
                _unitOfWork.User.Update(user);
            }

            _unitOfWork.Save();

            return Ok(ticket);
        }

        [HttpPost("AcceptTicket/{ticketId}")]
        public ActionResult<Ticket> AcceptTicket(int ticketId)
        {
            var ticket = _unitOfWork.Ticket.Get(t => t.Id == ticketId);

            if (ticket == null)
            {
                return NotFound();
            }

            ticket.TicketStatus = TicketStatus.ACCEPTED;

            _emailService.SendEmail("Ticket", "lukas0495@gmail.com", "luki", "ticket").Wait();

            _unitOfWork.Save();

            return Ok(ticket);

        }

        [HttpGet("GetTicketPrice/{ticketId}")]
        public ActionResult<decimal> GetTicketPrice(int ticketId)
        {
            var ticket = _unitOfWork.Ticket.Get(t => t.Id == ticketId);

            if (ticket == null)
            {
                return NotFound();
            }

            return Ok(ticket.Price);

        }

    }
}
