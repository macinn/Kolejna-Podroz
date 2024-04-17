using KolejnaPodroz.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Domain.Services.ProviderService
{
    public class ProviderService : IProviderService
    {
        public Provider CreateProvider(string name, string? description, string website, string phoneNumber, string city, string address)
        {
            return new Provider
            {
                Name = name,
                Description = description,
                Website = website,
                PhoneNumber = phoneNumber,
                City = city,
                Address = address
            };
        }
    }
}
