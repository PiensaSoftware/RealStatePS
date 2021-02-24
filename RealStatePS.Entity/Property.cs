using System;
using System.Collections.Generic;

namespace RealStatePS.Entity
{
    public partial class Property
    {
        public Property()
        {
            PropertyImage = new HashSet<PropertyImage>();
        }

        public long Id { get; set; }
        public long UserProfileId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string Settlement { get; set; }
        public string Municipality { get; set; }
        public string State { get; set; }
        public decimal? MetersLand { get; set; }
        public decimal? MetersBuilt { get; set; }
        public decimal? Bedrooms { get; set; }
        public decimal? Bathrooms { get; set; }
        public int? Garage { get; set; }
        public int Level { get; set; }
        public decimal Price { get; set; }
        public string Email { get; set; }
        public string PhoneOne { get; set; }
        public string PhoneTwo { get; set; }
        public string WebSite { get; set; }
        public string Company { get; set; }
        public string VideoLink { get; set; }
        public int PropertyOperationId { get; set; }
        public int PropertyTypeId { get; set; }
        public bool IsActive { get; set; }
        public string Creator { get; set; }
        public DateTime Created { get; set; }
        public string Modifier { get; set; }
        public DateTime? Modified { get; set; }
        public PropertyOperation PropertyOperation { get; set; }
        public PropertyType PropertyType { get; set; }
        public UserProfile UserProfile { get; set; }
        public ICollection<PropertyImage> PropertyImage { get; set; }
    }
}
