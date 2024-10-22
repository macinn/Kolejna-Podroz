﻿using KolejnaPodroz.DataAccess.Repository.IRepository;
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
        public ActionResult<Ticket> AcceptTicket([FromBody] AcceptTicketPostRequest request, [FromQuery] string? email = null)
        {
            var ticket = _unitOfWork.Ticket.Get(t => t.Id == request.TicketId);
            
            if (ticket == null)
            {
                return NotFound();
            }

            User? user = null;
            if (request.UserAuth0Id != null)
            {
                user = _unitOfWork.User.GetAll(u => u.Auth0Id == request.UserAuth0Id).FirstOrDefault();
            }

            if (user != null)   // zalogowany
            {
                if(user.AccountInfo.Balance < ticket.Price) // nie ma kasy
                {
                    return BadRequest();
                }

                // ma kase
                user.AccountInfo.Balance -= ticket.Price;
                ticket.TicketStatus = TicketStatus.ACCEPTED;
                _emailService.SendEmail("Ticket", user.AccountInfo.Email, "KolejnaPodroz", "TODO: MAIL MESSAGE").Wait();
                user.AccountInfo.LoyaltyPoints += ticket.Connection.Points;
                user.AccountInfo.TicketsBought += 1;
                var travelTime = ticket.Connection.ArrivalTime - ticket.Connection.DepartureTime;
                user.AccountInfo.TravelTime += (int)travelTime.TotalMinutes;
                _unitOfWork.User.Update(user);
            }
            else if(email != null)  // niezalogowany
            {
                ticket.TicketStatus = TicketStatus.UNPAID;
                _emailService.SendEmail("Ticket", email, "KolejnaPodroz", "Your ticket needs to be paid on account number: xxx").Wait();
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

        [HttpGet("GetActiveTickets")]
        public ActionResult<IEnumerable<Ticket>> GetActiveTickets(string auth0Id)
        {
            var activeTickets = _unitOfWork.Ticket.GetAll(t => t.User != null && t.User.Auth0Id == auth0Id && t.TicketStatus == TicketStatus.ACCEPTED && t.Connection.DepartureTime >= DateTime.Now);
            return Ok(activeTickets);
        }

        [HttpPut("CancelTicket")]
        public ActionResult<Ticket> CancelTicket(CancelTicketRequest cancelTicket)
        {
            var ticket = _unitOfWork.Ticket.Get(t => t.Id == cancelTicket.TicketId && t.TicketStatus == TicketStatus.ACCEPTED);

            if (ticket != null)
            {
                ticket.TicketStatus = TicketStatus.REJECTED;
                _unitOfWork.Ticket.Update(ticket);
                if(ticket.User != null)
                {
                    var user = _unitOfWork.User.Get(u => u.Id == ticket.User.Id);
                    if(user != null)
                    {
                        user.AccountInfo.LoyaltyPoints -= ticket.Connection.Points;
                        user.AccountInfo.TicketsBought -= 1;
                        user.AccountInfo.TravelTime -= (int)(ticket.Connection.ArrivalTime - ticket.Connection.DepartureTime).TotalMinutes;
                        _unitOfWork.User.Update(user);
                    }
                }
                _unitOfWork.Save();
                return Ok(ticket);
            }

            return NotFound(ticket);
        }
    }
}
