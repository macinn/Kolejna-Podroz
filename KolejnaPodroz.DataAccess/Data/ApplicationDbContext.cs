using KolejnaPodroz.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.DataAccess.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Connection> Connections { get; set; }
        public DbSet<Provider> Providers { get; set; }
        public DbSet<Ticket> Tickets { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }

    }
}
