using KolejnaPodroz.DataAccess.Repository.IRepository;
using KolejnaPodroz.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace KolejnaPodrozApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConnectionController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ConnectionController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Connection>> Get()
        {
            var connections = _unitOfWork.Connection.GetAll();
            return Ok(connections);
        }
    }
}
