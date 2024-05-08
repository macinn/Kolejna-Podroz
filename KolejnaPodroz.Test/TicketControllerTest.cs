using KolejnaPodroz.DataAccess.Repository.IRepository;
using KolejnaPodroz.Domain.Services.EmailService;
using KolejnaPodroz.Domain.Services.TicketService;
using KolejnaPodrozApp.Controllers;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Test
{
    public class TicketControllerTest
    {
        private static readonly Mock<IUnitOfWork> UnitOfWorkMock = new Mock<IUnitOfWork>();
        private static readonly ITicketService _ticketService = new TicketService();
        private static readonly IEmailService _emailService = new EmailService();
        private readonly TicketController _controller = new TicketController(UnitOfWorkMock.Object, _ticketService,_emailService);
    }
}
