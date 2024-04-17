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
        public DbSet<Station> Stations { get; set; }
        public DbSet<User> Users { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Connection>()
                .HasOne(i => i.From)
                .WithMany()
                .OnDelete(DeleteBehavior.ClientSetNull);
            modelBuilder.Entity<Connection>()
                .HasOne(i => i.Destination)
                .WithMany()
                .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}
