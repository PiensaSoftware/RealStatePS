using System;
using System.Collections.Generic;

namespace RealStatePS.Entity
{
    public partial class PasswordRecover
    {
        public long Id { get; set; }
        public DateTime Date { get; set; }
        public string Email { get; set; }
        public string Code { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? RecoverDate { get; set; }
        public bool Status { get; set; }
    }
}
