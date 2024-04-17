

using KolejnaPodroz.DataAccess.Repository.IRepository;
using KolejnaPodroz.Domain.Models;
using KolejnaPodroz.Domain.Services.ProviderService;
using KolejnaPodroz.Domain.Services.StationService;
using KolejnaPodrozApp.Controllers;
using KolejnaPodrozApp.Models.Provider;
using KolejnaPodrozApp.Models.Station;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Test
{
    public class ProviderControllerTest
    {
        private readonly Mock<IUnitOfWork> _unitOfWork;
        private readonly IProviderService _providerService;
        public ProviderControllerTest()
        {
            _unitOfWork = new Mock<IUnitOfWork>();
            _providerService = new ProviderService();
        }

        [Fact]
        public void Post_ReturnsOkResult_WhenStationIsValid()
        {
            // Arrange
            var request = new ProviderPostRequest { Name = "A", Description = "B", Website = "aa.pl", PhoneNumber = "888888888", City = "Warsaw", Address = "Wielunska" };
            var controller = new ProviderController(_unitOfWork.Object, _providerService);
            _unitOfWork.Setup(u => u.Provider.GetAll(It.IsAny<Expression<Func<Provider, bool>>>())).Throws(new Exception());

            // Act
            var response = controller.Post(request);

            // Assert
            Assert.IsType<OkObjectResult>(response);
        }
    }
}
