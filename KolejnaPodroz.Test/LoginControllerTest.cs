using KolejnaPodroz.DataAccess.Repository.IRepository;
using KolejnaPodroz.Domain.Models;
using KolejnaPodrozApp.Controllers;
using KolejnaPodrozApp.Models.Login;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Linq.Expressions;

namespace KolejnaPodroz.Test
{
    public class LoginControllerTest
    {
        private static readonly Mock<IUnitOfWork> UnitOfWorkMock = new Mock<IUnitOfWork>();
        private readonly LoginController _controller = new LoginController(UnitOfWorkMock.Object);


        [Fact]
        public void Post_AddUserToDb_WhenItDoesntExist()
        {
            var request = new UserInfo
            {
                name = "john doe",
                given_name = "john",
                family_name = "doe",
                email = "john@doe.com",
                sub = "googleAuth1",
                phone_number = "1234567890",
                role = "User"
            };

            var user = new User();
            user.Auth0Id = "googleAuth2";

            var users = new List<User> { user };
            UnitOfWorkMock.Setup(u => u.User.GetAll(It.IsAny<Expression<Func<User, bool>>>())).Returns(users.Where(u => u.Auth0Id == request.sub));

            var result = _controller.Post(request);

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("User added", okResult.Value);
        }

        [Fact]
        public void Post_UpdateUserRole_WhenItIsDiffrent()
        {
            var request = new UserInfo
            {
                name = "john doe",
                given_name = "john",
                family_name = "doe",
                email = "john@doe.com",
                sub = "googleAuth1",
                phone_number = "1234567890",
                role = "User"
            };

            var user = new User();
            user.Auth0Id = "googleAuth1";
            user.AccountInfo = new AccountInfo();
            user.AccountInfo.Role = Role.None;

            var users = new List<User> { user };
            UnitOfWorkMock.Setup(u => u.User.GetAll(It.IsAny<Expression<Func<User, bool>>>())).Returns(users.Where(u => u.Auth0Id == request.sub));

            var result = _controller.Post(request);

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("User updated", okResult.Value);
        }

        [Fact]
        public void Post_DoNothing_WhenUserHasCorrectRole()
        {
            var request = new UserInfo
            {
                name = "john doe",
                given_name = "john",
                family_name = "doe",
                email = "john@doe.com",
                sub = "googleAuth1",
                phone_number = "1234567890",
                role = "Admin"
            };

            var user = new User();
            user.Auth0Id = "googleAuth1";
            user.AccountInfo = new AccountInfo();
            user.AccountInfo.Role = Role.Admin;

            var users = new List<User> { user };
            UnitOfWorkMock.Setup(u => u.User.GetAll(It.IsAny<Expression<Func<User, bool>>>())).Returns(users.Where(u => u.Auth0Id == request.sub));

            var result = _controller.Post(request);

            var okResult = Assert.IsType<OkResult>(result);
        }
    }
}
