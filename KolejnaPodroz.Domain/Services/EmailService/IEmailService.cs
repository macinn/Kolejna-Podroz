using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Domain.Services.EmailService
{
    public interface IEmailService
    {
        public Task SendEmail(string subject, string toEmail, string username, string message);
    }
}
