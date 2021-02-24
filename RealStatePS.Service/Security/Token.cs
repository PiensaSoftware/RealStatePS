
using RealStatePS.Entity;
using System.Linq;
using System.Security.Claims;

namespace RealStatePS.Service.Security
{
    public class Token
    {
        public static CurrentUser GenerateJwt(ClaimsIdentity identity, Contract.IAccountService _accountService, string userName, JWT jwtOptions, string name, bool viewUsers)
        {
            var response = new CurrentUser
            {
                id = identity.Claims.Single(c => c.Type == "id").Value,
                auth_token = _accountService.GenerateEncodedToken(userName, identity),
                expires_in = (int)jwtOptions.ValidFor.TotalSeconds,
                name = name,
                ViewUsers = viewUsers
            };
            return response;
        }
    }
}
