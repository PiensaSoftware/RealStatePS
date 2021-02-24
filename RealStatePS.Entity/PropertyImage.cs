using System;
using System.Collections.Generic;

namespace RealStatePS.Entity
{
    public partial class PropertyImage
    {
        public long Id { get; set; }
        public long PropertyId { get; set; }
        public int Order { get; set; }
        public string Url { get; set; }
        public string Creator { get; set; }
        public DateTime Created { get; set; }
        public string Modifier { get; set; }
        public DateTime? Modified { get; set; }

        public Property Property { get; set; }
    }
}
