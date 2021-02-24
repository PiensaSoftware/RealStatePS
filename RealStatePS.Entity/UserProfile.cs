using System;
using System.Collections.Generic;

namespace RealStatePS.Entity
{
    public partial class UserProfile
    {
        public UserProfile()
        {
            Property = new HashSet<Property>();
        }

        public long Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string SecondLastName { get; set; }
        public string PhoneOne { get; set; }
        public string PhoneTwo { get; set; }
        public bool IsActive { get; set; }
        public DateTime Created { get; set; }
        public string Creator { get; set; }
        public DateTime? Modified { get; set; }
        public string Modifier { get; set; }
        public string WebSite { get; set; }
        public string Company { get; set; }
        public string ImageURL { get; set; }
        public AspNetUsers User { get; set; }
        public ICollection<Property> Property { get; set; }
    }
}
