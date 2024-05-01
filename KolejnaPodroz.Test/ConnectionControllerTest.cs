using System.Linq.Expressions;
using KolejnaPodroz.DataAccess.Repository.IRepository;
using Moq;
using KolejnaPodroz.Domain.Models;
using KolejnaPodrozApp.Models.Connection;
using KolejnaPodrozApp.Controllers;
using Microsoft.AspNetCore.Mvc;
using KolejnaPodroz.Domain.Services.ConnectionService;


namespace KolejnaPodroz.Test
{
    public class ConnectionControllerTest
    {
        private static readonly Mock<IUnitOfWork> UnitOfWorkMock = new Mock<IUnitOfWork>();
        private static readonly Mock<IConnectionService> IConnectionService = new Mock<IConnectionService>();
        private static readonly IConnectionService _connectionService = new ConnectionService();
        private readonly ConnectionController _controller = new ConnectionController(UnitOfWorkMock.Object, _connectionService);
        
        
        [Fact]
        public void Get_ReturnsOkResult_WhenConnectionsExist()
        {
            var request = new ConnectionRequest { StartStationId = 1, EndStationId = 2, DepartureTime = DateTime.Now.ToString() };
            var connections = new List<Connection> { new Connection(), new Connection() };
            UnitOfWorkMock.Setup(u => u.Connection.GetAll(It.IsAny<Expression<Func<Connection, bool>>>())).Returns(connections);

            var result = _controller.Get(request.StartStationId, request.EndStationId, request.DepartureTime);

            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnConnections = Assert.IsType<List<Connection>>(okResult.Value);
            Assert.Equal(2, returnConnections.Count);
        }
        
        [Fact]
        public void Get_ReturnsNotFound_WhenConnectionsDoNotExist()
        {
            var request = new ConnectionRequest { StartStationId = 1, EndStationId = 2, DepartureTime = DateTime.Now.ToString() };
            var connections = new List<Connection>();
            UnitOfWorkMock.Setup(u => u.Connection.GetAll(It.IsAny<Expression<Func<Connection, bool>>>())).Returns(connections);
            
            var result = _controller.Get(request.StartStationId, request.EndStationId, request.DepartureTime);

            Assert.IsType<NotFoundResult>(result.Result);
        }
        
        [Fact]
        public void Get_ReturnsBadRequest_WhenExceptionIsThrown()
        {
            var request = new ConnectionRequest { StartStationId = 1, EndStationId = 2, DepartureTime = DateTime.Now.ToString() };
            UnitOfWorkMock.Setup(u => u.Connection.GetAll(It.IsAny<Expression<Func<Connection, bool>>>())).Throws(new Exception());

            var result = _controller.Get(request.StartStationId, request.EndStationId, request.DepartureTime);

            Assert.IsType<BadRequestObjectResult>(result.Result);
        }

        [Fact]
        public void Post_ReturnsOkResult_WhenRequestIsValid()
        {
            var request = new ConnectionPostRequest
            {
                StartStationId = 1,
                EndStationId = 2,
                ProviderId = 3,
                DepartureTime = DateTime.Now.ToString(),
                TravelTime = 60
            };

            UnitOfWorkMock.Setup(u => u.Station.Get(It.IsAny<Expression<Func<Station, bool>>>())).Returns(new Station());
            UnitOfWorkMock.Setup(u => u.Provider.Get(It.IsAny<Expression<Func<Provider, bool>>>())).Returns(new Provider());

            var result = _controller.Post(request);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var connection = Assert.IsType<Connection>(okResult.Value);
        }

        [Fact]
        public void Post_ReturnsBadRequest_WhenExceptionIsThrown()
        {
            var request = new ConnectionPostRequest
            {
                StartStationId = 1,
                EndStationId = 2,
                ProviderId = 3,
                DepartureTime = DateTime.Now.ToString(),
                TravelTime = 60
            };

            UnitOfWorkMock.Setup(u => u.Station.Get(It.IsAny<Expression<Func<Station, bool>>>())).Throws(new Exception());

            var result = _controller.Post(request);

            Assert.IsType<BadRequestObjectResult>(result);
        }
    }
}