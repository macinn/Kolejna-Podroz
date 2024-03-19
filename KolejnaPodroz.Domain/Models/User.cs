using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Domain.Models
{
    public class User
    {
        public int Id { get; set; }
        public AccountInfo AccountInfo { get; set; }
    }
}
