using Bogus;
using KolejnaPodroz.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Mysqlx.Crud;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace KolejnaPodroz.Integration.Test.Fixtures
{
    internal class DataFixture
    {
        public static List<Domain.Models.Connection> GetConnections(int count, bool useNewSeed = false)
        {
            return GetConnectionsFaker(useNewSeed).Generate(count);
        }

        public static Faker<Domain.Models.Connection> GetConnectionsFaker(bool useNewSeed = false)
        {
            var stationFaker = new Faker<Station>()
            .RuleFor(s => s.Name, f => f.Address.City())
            .RuleFor(s => s.Description, f => f.Lorem.Sentence())
            .RuleFor(s => s.Code, f => f.Random.AlphaNumeric(5).ToUpper())
            .RuleFor(s => s.City, f => f.Address.City());

            var providerFaker = new Faker<Provider>()
                .RuleFor(p => p.Name, f => f.Company.CompanyName())
                .RuleFor(p => p.Description, f => f.Lorem.Paragraph())
                .RuleFor(p => p.Website, f => f.Internet.Url())
                .RuleFor(p => p.PhoneNumber, f => f.Phone.PhoneNumber())
                .RuleFor(p => p.City, f => f.Address.City())
                .RuleFor(p => p.Address, f => f.Address.FullAddress());

            var stations = stationFaker.Generate(10);
            var providers = providerFaker.Generate(5);

            var connectionFaker = new Faker<Domain.Models.Connection>()
                .RuleFor(c => c.From, f => f.PickRandom(stations))
                .RuleFor(c => c.Destination, f => f.PickRandom(stations))
                .RuleFor(c => c.DepartureTime, f => f.Date.Future())
                .RuleFor(c => c.ArrivalTime, (f, c) => c.DepartureTime.AddHours(f.Random.Double(1, 5)))
                .RuleFor(c => c.Provider, f => f.PickRandom(providers))
                .RuleFor(c => c.Points, f => f.Random.Int(1, 100))
                .RuleFor(c => c.Price, f => f.Finance.Amount(10, 100));;

            return connectionFaker;
        }
    }
}
