using KolejnaPodroz.DataAccess.Repository.IRepository;
using KolejnaPodroz.Domain.Models;
using KolejnaPodroz.Domain.Services.ProviderService;
using KolejnaPodroz.Domain.Services.StationService;
using KolejnaPodrozApp.Models.Station;
using Microsoft.AspNetCore.Mvc;

namespace KolejnaPodrozApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StationController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IStationService _stationService;

        public StationController(IUnitOfWork unitOfWork, IStationService stationService)
        {
            _unitOfWork = unitOfWork;
            _stationService = stationService;
        }
        
        [HttpPost]
        public ActionResult Post(StationPostRequest request)
        {
            var station = _stationService.CreateStation(request.Name, request.Description, request.Code, request.City);
            _unitOfWork.Station.Add(station);
            // TODO: fluent validation
            _unitOfWork.Save();
            return Ok(station);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Station>> Get()
        {
            var stations = _unitOfWork.Station.GetAll();

            if (stations.Count() == 0)
            {
                return NotFound();
            }

            return Ok(stations);

        }
    }
}
