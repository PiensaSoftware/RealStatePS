using System;
using System.Collections.Generic;
using System.Text;

namespace RealStatePS.Entity
{
    public class CurrentUser
    {
        public string id { get; set; }
        public string auth_token { get; set; }
        public int expires_in { get; set; }
        public string name { get; set; }
        public bool ViewUsers { get; set; }
    }
}
