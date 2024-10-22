﻿using KolejnaPodroz.DataAccess.Data;
using KolejnaPodroz.DataAccess.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.DataAccess.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationDbContext _db;
        public IConnectionRepository Connection { get; private set; }
        public IProviderRepository Provider { get; private set; }
        public ITicketRepository Ticket { get; private set; }
        public IStationRepository Station { get; private set; }
        public IUserRepository User { get; private set; }

        public UnitOfWork(ApplicationDbContext db)
        {
            _db = db;

            Connection = new ConnectionRepository(_db);
            Provider = new ProviderRepository(_db);
            Ticket = new TicketRepository(_db);
            Station = new StationRepository(_db);
            User = new UserRepository(_db);
        }
        public void Save()
        {
            _db.SaveChanges();
        }
    }
}
