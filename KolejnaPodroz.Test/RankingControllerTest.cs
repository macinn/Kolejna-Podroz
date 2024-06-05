using Moq;
using Xunit;
using KolejnaPodroz.DataAccess.Repository.IRepository;
using KolejnaPodroz.Domain.Models;
using KolejnaPodroz.Domain.Services.RankingService;
using KolejnaPodrozApp.Controllers;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System;

namespace KolejnaPodroz.Test
{
    public class RankingControllerTest
    {
        private readonly Mock<IUnitOfWork> _unitOfWorkMock = new Mock<IUnitOfWork>();
        private readonly Mock<IRankingService> _rankingServiceMock = new Mock<IRankingService>();

        [Fact]
        public void Get_ReturnsOkResult_WithUserRankings()
        {
            // Arrange
            var userRankings = new List<UserRanking>
        {
            new UserRanking
            {
                Name = "Test User",
                TravelTime = 100.0,
                TicketsBought = 10,
                TravelRank = 1,
                TicketsRank = 1
            }
        };
            _unitOfWorkMock.Setup(u => u.User.GetAll()).Returns(new List<User>());
            _rankingServiceMock.Setup(r => r.GetUserRanking(It.IsAny<IEnumerable<User>>())).Returns(userRankings);

            var controller = new RankingController(_unitOfWorkMock.Object, _rankingServiceMock.Object);

            // Act
            var result = controller.Get();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<List<UserRanking>>(okResult.Value);
            Assert.Equal(userRankings, returnValue);
        }

        [Fact]
        public void Get_ReturnsBadRequest_WhenExceptionThrown()
        {
            // Arrange
            _unitOfWorkMock.Setup(u => u.User.GetAll()).Throws(new Exception("Test exception"));

            var controller = new RankingController(_unitOfWorkMock.Object, _rankingServiceMock.Object);

            // Act
            var result = controller.Get();

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result.Result);
            Assert.Equal("Test exception", badRequestResult.Value);
        }
    }
}
