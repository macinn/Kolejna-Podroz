using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Domain.Models
{
    public class Advertisment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string Company {  get; set; }
        public byte[] Image { get; set; }
    }
}
