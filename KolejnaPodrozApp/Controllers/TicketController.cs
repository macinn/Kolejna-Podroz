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

            _unitOfWork.Save();

            return Ok(ticket);
        }

        [HttpPost("AcceptTicket")]
        public ActionResult<Ticket> AcceptTicket(AcceptTicketPostRequest request, String? email = null)
        {
            var ticket = _unitOfWork.Ticket.Get(t => t.Id == request.TicketId);
            
            if (ticket == null)
            {
                return NotFound();
            }

            ticket.TicketStatus = TicketStatus.ACCEPTED;

            User? user = null;
            if (request.UserAuth0Id != null)
            {
                user = _unitOfWork.User.GetAll(u => u.Auth0Id == request.UserAuth0Id).FirstOrDefault();
            }

            if (user != null)
            {
                _emailService.SendEmail("Ticket", user.AccountInfo.Email, "KolejnaPodroz", "TODO: MAIL MESSAGE").Wait();
                user.AccountInfo.LoyaltyPoints += ticket.Connection.Points;
                user.AccountInfo.TicketsBought += 1;
                var travelTime = ticket.Connection.ArrivalTime - ticket.Connection.DepartureTime;
                user.AccountInfo.TravelTime += (int)travelTime.TotalMinutes;
                _unitOfWork.User.Update(user);
            }
            else if(email != null)
            {
                _emailService.SendEmail("Ticket", email, "KolejnaPodroz", "TODO: MAIL MESSAGE").Wait();
            }

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

        [HttpGet]
        public ActionResult<IEnumerable<Ticket>> Get(string auth0Id)
        {
            var tickets = _unitOfWork.Ticket.GetAll(t => t.User != null && t.User.Auth0Id == auth0Id);
            return Ok(tickets);

        }

    }
}
