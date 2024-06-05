using Moq;
using Xunit;
using KolejnaPodroz.DataAccess.Repository.IRepository;
using KolejnaPodroz.Domain.Models;
using KolejnaPodroz.Domain.Services.EmailService;
using KolejnaPodrozApp.Controllers;
using KolejnaPodrozApp.Models.Balance;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;

namespace KolejnaPodroz.Test
{
    public class UserControllerTest
    {
        private readonly Mock<IUnitOfWork> _unitOfWorkMock = new Mock<IUnitOfWork>();
        private readonly Mock<IEmailService> _emailServiceMock = new Mock<IEmailService>();

        [Fact]
        public void Get_ReturnsOkResult_WithAccountInfo()
        {
            // Arrange
            var user = new User { Auth0Id = "test", AccountInfo = new AccountInfo() };
            _unitOfWorkMock.Setup(u => u.User.Get(It.IsAny<Expression<Func<User, bool>>>())).Returns(user);

            var controller = new UserController(_unitOfWorkMock.Object, _emailServiceMock.Object);

            // Act
            var result = controller.Get("test");

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<AccountInfo>(okResult.Value);
            Assert.Equal(user.AccountInfo, returnValue);
        }

        [Fact]
        public void Get_ReturnsNotFound_WhenUserNotFound()
        {
            // Arrange
            _unitOfWorkMock.Setup(u => u.User.Get(It.IsAny<Expression<Func<User, bool>>>())).Returns((User)null);

            var controller = new UserController(_unitOfWorkMock.Object, _emailServiceMock.Object);

            // Act
            var result = controller.Get("test");

            // Assert
            Assert.IsType<NotFoundObjectResult>(result.Result);
        }

        [Fact]
        public void GetUserBalance_ReturnsOkResult_WithBalance()
        {
            // Arrange
            var user = new User { Auth0Id = "test", AccountInfo = new AccountInfo { Balance = 100.0m } };
            _unitOfWorkMock.Setup(u => u.User.Get(It.IsAny<Expression<Func<User, bool>>>())).Returns(user);

            var controller = new UserController(_unitOfWorkMock.Object, _emailServiceMock.Object);

            // Act
            var result = controller.GetUserBalance("test");

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<decimal>(okResult.Value);
            Assert.Equal(user.AccountInfo.Balance, returnValue);
        }

        [Fact]
        public void GetUserBalance_ReturnsNotFound_WhenUserNotFound()
        {
            // Arrange
            _unitOfWorkMock.Setup(u => u.User.Get(It.IsAny<Expression<Func<User, bool>>>())).Returns((User)null);

            var controller = new UserController(_unitOfWorkMock.Object, _emailServiceMock.Object);

            // Act
            var result = controller.GetUserBalance("test");

            // Assert
            Assert.IsType<NotFoundObjectResult>(result.Result);
        }

        [Fact]
        public void ExchangeLoyaltyPoints_ReturnsOkResult_WithUpdatedAccountInfo()
        {
            // Arrange
            var user = new User { Auth0Id = "test", AccountInfo = new AccountInfo { LoyaltyPoints = 100, Balance = 0.0m } };
            _unitOfWorkMock.Setup(u => u.User.Get(It.IsAny<Expression<Func<User, bool>>>())).Returns(user);

            var controller = new UserController(_unitOfWorkMock.Object, _emailServiceMock.Object);
            var request = new ExchangeLoyaltyPointsRequest { Auth0Id = "test", LoyaltyPoints = 50 };

            // Act
            var result = controller.ExchangeLoyaltyPoints(request);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<AccountInfo>(okResult.Value);
            Assert.Equal(50, returnValue.LoyaltyPoints);
        }

        [Fact]
        public void ExchangeLoyaltyPoints_ReturnsBadRequest_WhenNotEnoughLoyaltyPoints()
        {
            // Arrange
            var user = new User { Auth0Id = "test", AccountInfo = new AccountInfo { LoyaltyPoints = 10, Balance = 0.0m } };
            _unitOfWorkMock.Setup(u => u.User.Get(It.IsAny<Expression<Func<User, bool>>>())).Returns(user);

            var controller = new UserController(_unitOfWorkMock.Object, _emailServiceMock.Object);
            var request = new ExchangeLoyaltyPointsRequest { Auth0Id = "test", LoyaltyPoints = 50 };

            // Act
            var result = controller.ExchangeLoyaltyPoints(request);

            // Assert
            Assert.IsType<BadRequestResult>(result.Result);
        }

        [Fact]
        public void TopUpBalance_ReturnsOkResult_WithUpdatedAccountInfo()
        {
            // Arrange
            var user = new User { Auth0Id = "test", AccountInfo = new AccountInfo { Balance = 100.0m, Email = "test@test.com" } };
            _unitOfWorkMock.Setup(u => u.User.Get(It.IsAny<Expression<Func<User, bool>>>())).Returns(user);

            var controller = new UserController(_unitOfWorkMock.Object, _emailServiceMock.Object);
            var request = new BalanceTopUpRequest { Auth0Id = "test", Amount = 50.0m };

            // Act
            var result = controller.TopUpBalance(request);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<AccountInfo>(okResult.Value);
            Assert.Equal(150.0m, returnValue.Balance);
        }

        [Fact]
        public void TopUpBalance_SendsEmail_WhenCalled()
        {
            // Arrange
            var user = new User { Auth0Id = "test", AccountInfo = new AccountInfo { Balance = 100.0m, Email = "test@test.com" } };
            _unitOfWorkMock.Setup(u => u.User.Get(It.IsAny<Expression<Func<User, bool>>>())).Returns(user);

            var controller = new UserController(_unitOfWorkMock.Object, _emailServiceMock.Object);
            var request = new BalanceTopUpRequest { Auth0Id = "test", Amount = 50.0m };

            // Act
            var result = controller.TopUpBalance(request);

            // Assert
            _emailServiceMock.Verify(e => e.SendEmail(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()), Times.Once);
        }
    }
}
