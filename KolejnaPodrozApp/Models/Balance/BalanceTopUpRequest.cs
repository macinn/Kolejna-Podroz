namespace KolejnaPodrozApp.Models.Balance
{
    public class BalanceTopUpRequest
    {
        public string Auth0Id { get; set; }
        public decimal Amount { get; set; }
    }
}
