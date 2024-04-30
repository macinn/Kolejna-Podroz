using KolejnaPodroz.DataAccess.Repository.IRepository;
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

        public TicketController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public IActionResult Post(TicketPostRequest request)
        {
            return Ok(request);
        }
    }
}
