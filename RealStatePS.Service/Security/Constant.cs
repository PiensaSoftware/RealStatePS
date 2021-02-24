using System;
using System.Collections.Generic;
using System.Text;

namespace RealStatePS.Service.Security
{
    public static class Constant
    {
        public static class Strings
        {
            public static class JwtClaimIdentifiers
            {
                public const string Rol = "rol", Id = "id";
            }

            public static class JwtClaims
            {
                public const string ApiAccess = "api_access";
            }
        }
    }
}
