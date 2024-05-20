using FluentAssertions;
using KolejnaPodroz.Domain.Models;
using KolejnaPodroz.Integration.Test.Fixtures;
using KolejnaPodroz.Integration.Test.Helpers;
using KolejnaPodrozApp.Models.Connection;
using KolejnaPodrozApp.Models.Station;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Integration.Test.Tests
{
    public class ConnectionTests : IClassFixture<DockerWebApplicationFactoryFixture>
    {
        private readonly DockerWebApplicationFactoryFixture _factory;
        private readonly HttpClient _client;

        public ConnectionTests(DockerWebApplicationFactoryFixture factory)
        {
            _factory = factory;
            _client = _factory.CreateClient();
        }

        [Fact]
        public async Task SearchConnectionWithValidData_Should_Return_All_Valid_Connections()
        {
            // Arrange
            var connection = new ConnectionPostRequest { StartStationId = 1, EndStationId = 2, ProviderId = 1, DepartureTime = "2024-05-19T12:00:00", TravelTime = 45, Points = 8, Price = 12 };

            // Act

            // add connection
            var requestPost = await _client.PostAsync("/api/Connection/AdminPost", HttpHelper.GetJsonHttpContent(connection));

            // get connection
            var response = await _client.GetAsync($"/api/Connection?StartStationId={connection.StartStationId}&EndStationId={connection.EndStationId}&DepartureTime={connection.DepartureTime}");
            var connectionResponse = await response.Content.ReadFromJsonAsync<IEnumerable<Connection>>();

            // Assert
            requestPost.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);
            connectionResponse.Should().NotBeNull();
            connectionResponse.Should().HaveCountGreaterThan(0);
        }
        [Fact]
        public async Task Add_Station_And_Connection_Should_Be_Valid()
        {
            // Arrange
            var station = new StationPostRequest { Name = "abc", City = "Warsaw",  Description = "desc", Code = "120-SA"};
            
            // Act

            // add station 
            var requestPostStation = await _client.PostAsync("/api/Station/", HttpHelper.GetJsonHttpContent(station));

            // get stations

            var stations = await _client.GetAsync("/api/Station/");
            var stationResponse = await stations.Content.ReadFromJsonAsync<IEnumerable<Station>>();
            var st = stationResponse?.FirstOrDefault(s => s.Code == station.Code);

            st.Should().NotBeNull();

            // add connection
            var connection = new ConnectionPostRequest { StartStationId = st.Id, EndStationId = 2, ProviderId = 1, DepartureTime = "2024-05-19T12:00:00", TravelTime = 45, Points = 8, Price = 12 };
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
