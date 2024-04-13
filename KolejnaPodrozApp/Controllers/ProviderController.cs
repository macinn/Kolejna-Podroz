using KolejnaPodroz.DataAccess.Repository.IRepository;
using KolejnaPodroz.Domain.Models;
using KolejnaPodroz.Domain.Services.ProviderService;
using KolejnaPodrozApp.Models.Connection;
using KolejnaPodrozApp.Models.Provider;
using Microsoft.AspNetCore.Mvc;

namespace KolejnaPodrozApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdiverController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IProviderService _providerService;

        public ProdiverController(IUnitOfWork unitOfWork, IProviderService providerService)
        {
            _unitOfWork = unitOfWork;
            _providerService = providerService;
        }

        
        [HttpPost]
        public ActionResult Post(ProviderPostRequest request)
        {
            var provider = _providerService.CreateProvider(request.Name, request.Description, request.Website, request.PhoneNumber, request.City, request.Address);
            _unitOfWork.Provider.Add(provider);
            // TODO: fluent validation
            _unitOfWork.Save();
            return Ok(provider);
        }
    }
}
