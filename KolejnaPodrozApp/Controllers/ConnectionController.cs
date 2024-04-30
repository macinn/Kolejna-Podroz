using KolejnaPodroz.DataAccess.Repository.IRepository;
using KolejnaPodroz.Domain.Models;
using KolejnaPodroz.Domain.Services.ConnectionService;
using KolejnaPodrozApp.Models.Connection;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using Connection = KolejnaPodroz.Domain.Models.Connection;

namespace KolejnaPodrozApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConnectionController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConnectionService _connectionService;

        public ConnectionController(IUnitOfWork unitOfWork, IConnectionService connectionService)
        {
            _unitOfWork = unitOfWork;
            _connectionService = connectionService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Connection>> Get([FromQuery] int StartStationId, [FromQuery] int EndStationId, [FromQuery] string DepartureTime)

        {
            try
            {
                DateTime departureTime = DateTime.Parse(DepartureTime);
                var connections = _unitOfWork.Connection.GetAll(c => (c.From.Id == StartStationId && 
                    c.Destination.Id == EndStationId && 
                    c.DepartureTime >= departureTime));

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

        [HttpGet("AdminGet")]
        public ActionResult AdminGetConnection()
        {
            var connections = _unitOfWork.Connection.GetAll();

            return Ok(connections);
        }

        [HttpPost]
        public ActionResult Post(ConnectionPostRequest request)
        {
            try
            {
                var from = _unitOfWork.Station.Get(s => s.Id == request.StartStationId);
                var destination = _unitOfWork.Station.Get(s => s.Id == request.EndStationId);
                var provider = _unitOfWork.Provider.Get(p => p.Id == request.ProviderId);
                DateTime departureTime = DateTime.Parse(request.DepartureTime);
                var arrivalTime = departureTime.AddMinutes(request.TravelTime);

                Connection connection = _connectionService.CreateConnection(from, destination, departureTime, arrivalTime, provider, request.Points);

                //_unitOfWork.Connection.Add(connection); -- Raczej nie dodajemy do bazy Connections od usera! 
                return Ok(connection);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("AdminPost")]
        public ActionResult AdminPostConnection(ConnectionPostRequest request)
        {
            var from = _unitOfWork.Station.Get(s => s.Id == request.StartStationId);
            var destination = _unitOfWork.Station.Get(s => s.Id == request.EndStationId);
            var provider = _unitOfWork.Provider.Get(p => p.Id == request.ProviderId);
            DateTime departureTime = DateTime.Parse(request.DepartureTime);
            var arrivalTime = departureTime.AddMinutes(request.TravelTime);

            Connection connection = _connectionService.CreateConnection(from, destination, departureTime, arrivalTime, provider, request.Points);
            // TODO: fluent validation\

            _unitOfWork.Connection.Add(connection);
            _unitOfWork.Save();
            return Ok(connection);
        }
    }
}
