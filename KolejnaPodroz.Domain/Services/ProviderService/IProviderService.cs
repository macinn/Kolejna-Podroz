using KolejnaPodroz.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Domain.Services.ProviderService
{
    public interface IProviderService
    {
        Provider CreateProvider(string name, string? description, string website, string phoneNumber, string city, string address);
    }
}
