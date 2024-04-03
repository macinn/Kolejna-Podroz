using KolejnaPodroz.DataAccess.Repository.IRepository;
using KolejnaPodroz.Domain.Models;
using KolejnaPodrozApp.Models.Connection;
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
        public ActionResult<IEnumerable<Connection>> Get(ConnectionRequest request)
        {
            try
            {
                var connections = _unitOfWork.Connection.GetAll(c => (c.From.Id == request.StartStationId && 
                    c.Destination.Id == request.EndStationId && 
                    c.DepartureTime >= request.DepartureTime));

                if(connections.Count() == 0)
                {
                    return NotFound();
                }

                return Ok(connections);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult Post(ConnectionPostRequest request)
        {
            try
            {
                Connection connection = new Connection();
                connection.From = _unitOfWork.Station.Get(s => s.Id == request.StartStationId);
                connection.Destination = _unitOfWork.Station.Get(s => s.Id == request.EndStationId);
                connection.Provider = _unitOfWork.Provider.Get(p => p.Id == request.ProviderId);
                connection.DepartureTime = request.DepartureTime;
                connection.ArrivalTime = request.DepartureTime.AddMinutes(request.TravelTime);

                _unitOfWork.Connection.Add(connection);
                return Ok(connection);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
