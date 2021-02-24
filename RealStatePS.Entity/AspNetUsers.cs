using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace RealStatePS.Entity
{
    public partial class AspNetUsers:IdentityUser
    {
        public AspNetUsers()
        {
            UserProfile = new HashSet<UserProfile>();
        }

        public ICollection<UserProfile> UserProfile { get; set; }
    }
}
