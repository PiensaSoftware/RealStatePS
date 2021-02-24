using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealStatePS.Models
{
    public class PasswordRecoverModel
    {
        public string Password { get; set; }
        public string Code { get; set; }
    }
}
