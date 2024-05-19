using KolejnaPodroz.Domain.Models;

namespace KolejnaPodrozApp.Models.Login
{
        public class UserInfo
        {
            public string? name { get; set; }
            public string? email { get; set; }
            public string? given_name { get; set; }
            public string? family_name { get; set; }
            public string? sub { get; set; }
            public string? phone_number { get; set; }
            public string? role { get; set; }

            public User MakeUser()
            {
                var user = new User();
                var accountInfo = new AccountInfo();
                accountInfo.Surname = family_name != null ? family_name : "";
                accountInfo.Email = email != null ? email : "";
                accountInfo.PhoneNumber = phone_number != null ? phone_number : ""; 
                accountInfo.Name = given_name != null ? given_name : (name != null? name: "");
                accountInfo.Role = ConvertRole(role);
                user.Auth0Id = sub != null ? sub : "";
                user.AccountInfo = accountInfo;
                return user;
            }
            public static Role ConvertRole(string? role)
            {
                if (role == null)
                {
                    return Role.None;
                }

                switch (role)
                {
                    case "User":
                        return Role.User;
                    case "Admin":
                        return Role.Admin;
                    default:
                        return Role.None;
                }

            }
        }
}
