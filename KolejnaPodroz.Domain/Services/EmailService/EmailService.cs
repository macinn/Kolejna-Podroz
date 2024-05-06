using SendGrid.Helpers.Mail;
using SendGrid;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Domain.Services.EmailService
{
    public class EmailService : IEmailService
    {
        private readonly string fromEmail = "kolejna.podroz.pw@gmail.com";
        private readonly string apiKey = "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";
        public async Task SendEmail(string subject, string toEmail, string username, string message)
        {
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(fromEmail, "KolejnaPodroz");
            var to = new EmailAddress(toEmail, username);
            var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, message, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
    }
}
