namespace KolejnaPodrozApp.Models.Provider
{
    public class ProviderPostRequest
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public string Website { get; set; }
        public string PhoneNumber { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
    }
}
