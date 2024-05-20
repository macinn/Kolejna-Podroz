using FluentAssertions;
using KolejnaPodroz.Domain.Models;
using KolejnaPodroz.Integration.Test.Fixtures;
using KolejnaPodroz.Integration.Test.Helpers;
using KolejnaPodrozApp.Models.Login;
using KolejnaPodrozApp.Models.Ticket;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace KolejnaPodroz.Integration.Test.Tests
{
    public class TicketTests : IClassFixture<DockerWebApplicationFactoryFixture>
    {
        private readonly DockerWebApplicationFactoryFixture _factory;
        private readonly HttpClient _client;

        public TicketTests(DockerWebApplicationFactoryFixture factory)
        {
            _factory = factory;
            _client = _factory.CreateClient();
        }

        [Fact]
        public async Task Add_User_Can_See_His_Tickets()
        {
            // Arrange
            var userInfo = new UserInfo { email = "aa@aa.pl", family_name = "aa", given_name = "dd", phone_number = "111111111", name = "Test", role = "user", sub = "test-123" };

            // Act

            // create user
            var createUserResponse = await _client.PostAsync("/api/Login", HttpHelper.GetJsonHttpContent(userInfo));

            // add ticket for user
            TicketPostRequest ticketRequest = new TicketPostRequest { ConnectionId = 1,  UserAuth0Id = "test-123",  Price = 49.99m, Wagon = 2, Seat = 15, TicketType = TicketType.Normal };
            var addTicketResponse = await _client.PostAsync("/api/Ticket", HttpHelper.GetJsonHttpContent(ticketRequest));

            // get ticket by user id 
            var getTicketResponse = await _client.GetAsync($"/api/Ticket?auth0Id={userInfo.sub}");
            var response = await getTicketResponse.Content.ReadFromJsonAsync<IEnumerable<Ticket>>();

            // Assert
            getTicketResponse.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
            addTicketResponse.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
            createUserResponse.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
            response.Should().NotBeNull();
            response.Should().HaveCountGreaterThan(0);
        }

        [Fact]
        public async Task Ticket_Price_Should_Be_Valid()
        {
            // Arrange
            var userInfo = new UserInfo { email = "aa@aa.pl", family_name = "aa", given_name = "dd", phone_number = "111111111", name = "Test", role = "user", sub = "test-123" };

            // Act

            // create user
            var createUserResponse = await _client.PostAsync("/api/Login", HttpHelper.GetJsonHttpContent(userInfo));

            // add ticket for user
            TicketPostRequest ticketRequest = new TicketPostRequest { ConnectionId = 1, UserAuth0Id = "test-123", Price = 49.99m, Wagon = 2, Seat = 15, TicketType = TicketType.Normal };
            var addTicketResponse = await _client.PostAsync("/api/Ticket", HttpHelper.GetJsonHttpContent(ticketRequest));
            var responseTicket = await addTicketResponse.Content.ReadFromJsonAsync<Ticket>();
            responseTicket.Should().NotBeNull();

            // get ticket by id 
            var getPriceResponse = await _client.GetAsync($"/api/Ticket/GetTicketPrice/{responseTicket.Id}");
            var response = await getPriceResponse.Content.ReadFromJsonAsync<decimal>();

            // Assert
            getPriceResponse.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
            addTicketResponse.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
            createUserResponse.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
            response.Should().Be(ticketRequest.Price);
        }

    }
}
