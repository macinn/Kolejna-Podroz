using FluentAssertions;
using KolejnaPodroz.Domain.Models;
using KolejnaPodroz.Integration.Test.Fixtures;
using KolejnaPodroz.Integration.Test.Helpers;
using KolejnaPodrozApp.Models.Connection;
using KolejnaPodrozApp.Models.Provider;
using KolejnaPodrozApp.Models.Station;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Integration.Test.Tests
{
    public class ProviderTests : IClassFixture<DockerWebApplicationFactoryFixture>
    {
        private readonly DockerWebApplicationFactoryFixture _factory;
        private readonly HttpClient _client;

        public ProviderTests(DockerWebApplicationFactoryFixture factory)
        {
            _factory = factory;
            _client = _factory.CreateClient();
        }

        [Fact]
        public async Task Add_Provider_And_Get_Connection_Should_Be_Valid()
        {
            // Arrange
            var provider = new ProviderPostRequest { Name = "abc", Website = "aa.pl", Description = "desc", PhoneNumber = "123123123", City = "Warsaw", Address = "Wola" };
            
            // Act

            // add provider
            var requestPostProvider = await _client.PostAsync("/api/Provider/", HttpHelper.GetJsonHttpContent(provider));

            // add connection
            var connection = new ConnectionPostRequest { StartStationId = 1, EndStationId = 2, ProviderId = 1, DepartureTime = "2024-05-19T12:00:00", TravelTime = 45, Points = 8, Price = 12 };
            var requestPostConnection = await _client.PostAsync("/api/Connection/AdminPost", HttpHelper.GetJsonHttpContent(connection));

            // get connection
            var response = await _client.GetAsync($"/api/Connection?StartStationId={connection.StartStationId}&EndStationId={connection.EndStationId}&DepartureTime={connection.DepartureTime}");
            var connectionResponse = await response.Content.ReadFromJsonAsync<IEnumerable<Connection>>();

            // Assert
            requestPostConnection.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
            connectionResponse.Should().NotBeNull();
            connectionResponse.Should().HaveCountGreaterThan(0);
        }
    }
}
