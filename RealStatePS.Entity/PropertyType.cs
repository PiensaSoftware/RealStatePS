using System;
using System.Collections.Generic;

namespace RealStatePS.Entity
{
    public partial class PropertyType
    {
        public PropertyType()
        {
            Property = new HashSet<Property>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Creator { get; set; }
        public DateTime Created { get; set; }
        public string Modifier { get; set; }
        public DateTime? Modified { get; set; }

        public ICollection<Property> Property { get; set; }
    }
}
