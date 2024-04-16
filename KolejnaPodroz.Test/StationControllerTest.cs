using KolejnaPodroz.DataAccess.Repository.IRepository;
using KolejnaPodroz.Domain.Models;
using KolejnaPodroz.Domain.Services.StationService;
using KolejnaPodrozApp.Controllers;
using KolejnaPodrozApp.Models.Connection;
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
    public class StationControllerTest
    {
        private readonly Mock<IUnitOfWork> _unitOfWork;
        private readonly IStationService _stationService;
        public StationControllerTest()
        {
            _unitOfWork = new Mock<IUnitOfWork>();
            _stationService = new StationService();
        }

        [Fact]
        public void Post_ReturnsOkResult_WhenStationIsValid()
        {
            // Arrange
            var request = new StationPostRequest {Name = "A", Description = "B", City = "Warsaw", Code = "1" };
            var controller = new StationController(_unitOfWork.Object, _stationService);
            _unitOfWork.Setup(u => u.Station.GetAll(It.IsAny<Expression<Func<Station, bool>>>())).Throws(new Exception());

            // Act
            var response = controller.Post(request);

            // Assert
            Assert.IsType<OkObjectResult>(response);
        }

        [Fact]
        public void Get_ReturnsOkResult()
        {
            // Arrange
            var request = new StationPostRequest { Name = "A", Description = "B", City = "Warsaw", Code = "1" };
            var controller = new StationController(_unitOfWork.Object, _stationService);
            _unitOfWork.Setup(u => u.Station.GetAll(It.IsAny<Expression<Func<Station, bool>>>())).Throws(new Exception());

            // Act
            var response = controller.Get();

            // Assert
            Assert.IsType<NotFoundResult>(response.Result);
        }
    }
}
