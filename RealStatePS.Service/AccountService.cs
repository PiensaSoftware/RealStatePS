using Microsoft.Extensions.Options;
using RealStatePS.Entity;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using RealStatePS.Service.Contract;

namespace RealStatePS.Service
{
    public class AccountService : IAccountService
    {
        private readonly JWT _jwtOptions;

        public AccountService(IOptions<JWT> jwtOptions)
        {
            _jwtOptions = jwtOptions.Value;
            ThrowIfInvalidOptions(_jwtOptions);
        }

        public string GenerateEncodedToken(string userName, ClaimsIdentity identity)
        {
            var claims = new[]
            {
                 new Claim(JwtRegisteredClaimNames.Sub, userName),
                 new Claim(JwtRegisteredClaimNames.Jti,  _jwtOptions.JtiGenerator),
                 new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(_jwtOptions.IssuedAt).ToString(), ClaimValueTypes.Integer64),
                 identity.FindFirst(Security.Constant.Strings.JwtClaimIdentifiers.Rol),
                 identity.FindFirst(Security.Constant.Strings.JwtClaimIdentifiers.Id)
             };

            var jwt = new JwtSecurityToken(
                issuer: _jwtOptions.Issuer,
                audience: _jwtOptions.Audience,
                claims: claims,
                notBefore: _jwtOptions.NotBefore,
                expires: _jwtOptions.Expiration,
                signingCredentials: _jwtOptions.SigningCredentials);

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }
        public ClaimsIdentity GenerateClaimsIdentity(string userName, string id)
        {
            return new ClaimsIdentity(new GenericIdentity(userName, "Token"), new[]
            {
                new Claim(Security.Constant.Strings.JwtClaimIdentifiers.Id, id)
            });
        }
        private static long ToUnixEpochDate(DateTime date) =>
            (long)Math.Round((date.ToUniversalTime() -
                               new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero))
                              .TotalSeconds);
        private static void ThrowIfInvalidOptions(JWT options)
        {
            if (options == null) throw new ArgumentNullException(nameof(options));

            if (options.ValidFor <= TimeSpan.Zero)
                throw new ArgumentException("Must be a non-zero TimeSpan.", nameof(JWT.ValidFor));

            if (options.SigningCredentials == null)
                throw new ArgumentNullException(nameof(JWT.SigningCredentials));

            if (options.JtiGenerator == null)
                throw new ArgumentNullException(nameof(JWT.JtiGenerator));
        }
    }
}
