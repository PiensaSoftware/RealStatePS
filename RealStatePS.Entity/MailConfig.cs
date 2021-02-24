using System;
using System.Collections.Generic;

namespace RealStatePS.Entity
{
    public partial class MailConfig
    {
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int? TimeOut { get; set; }
    }
}
