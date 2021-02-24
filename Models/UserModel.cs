using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealStatePS.Models
{
    public class UserModel
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string SecondLastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneOne { get; set; }
        public string PhoneTwo { get; set; }
        public bool IsActive { get; set; }
        public string Company { get; set; }
        public string WebSite { get; set; }
        public string Avatar { get; set; }
    }
}
