using KolejnaPodroz.DataAccess.Repository;
using KolejnaPodroz.DataAccess.Repository.IRepository;
using KolejnaPodroz.Domain.Models;
using KolejnaPodroz.Domain.Services.EmailService;
using KolejnaPodroz.Domain.Services.TicketService;
using KolejnaPodrozApp.Controllers;
using KolejnaPodrozApp.Models.Station;
using Microsoft.AspNetCore.Mvc;
using Moq;
using MySqlX.XDevAPI.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace KolejnaPodroz.Test
{
    public class TicketControllerTest
    {
        private static readonly Mock<IUnitOfWork> _unitOfWork = new Mock<IUnitOfWork>();
        private static readonly ITicketService _ticketService = new TicketService();
        private static readonly IEmailService _emailService = new EmailService();
        private readonly TicketController _controller = new TicketController(_unitOfWork.Object, _ticketService,_emailService);

        [Fact]
        public void GetByUserId_ReturnsZeroTickets()
        {
            // Arrange
            string auth0id = "invalid";
            var controller = new TicketController(_unitOfWork.Object, _ticketService, _emailService);
            var tickets = new List<Ticket>();
            _unitOfWork.Setup(u => u.Ticket.GetAll(It.IsAny<Expression<Func<Ticket, bool>>>())).Returns(tickets);

            // Act
            var response = controller.Get(auth0id);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(response.Result);
            var returnTickets = Assert.IsType<List<Ticket>>(okResult.Value);
            Assert.Empty(returnTickets);
        }
    }
}
