
using System.Security.Claims;

namespace RealStatePS.Service.Contract
{
    public interface IAccountService
    {
        string GenerateEncodedToken(string userName, ClaimsIdentity identity);
        ClaimsIdentity GenerateClaimsIdentity(string userName, string id);
    }
}
