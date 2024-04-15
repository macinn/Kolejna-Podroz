using KolejnaPodroz.DataAccess.Repository.IRepository;
using KolejnaPodroz.Domain.Models;
using KolejnaPodroz.Domain.Services.ConnectionService;
using KolejnaPodrozApp.Models.Connection;
using KolejnaPodrozApp.Models.Login;
using Microsoft.AspNetCore.Mvc;

namespace KolejnaPodrozApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public LoginController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Connection>> Get()
        {
            return Ok();
        }

        [HttpPost]
        public IActionResult Post(UserInfo userInfo)
        {
            var existingUser = _unitOfWork.User.GetAll(u => u.Auth0Id == userInfo.sub).FirstOrDefault();
            if (existingUser == null)
            {
                var user = userInfo.MakeUser();

                _unitOfWork.User.Add(user);
                _unitOfWork.Save();
            }
            else
            {
                if (userInfo.role != existingUser.AccountInfo.Role.ToString())
                {
                    existingUser.AccountInfo.Role = UserInfo.ConvertRole(userInfo.role);
                    _unitOfWork.User.Update(existingUser);
                    _unitOfWork.Save();
                }
            }
            return Ok();
        }
    }
}
