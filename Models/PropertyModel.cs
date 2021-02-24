using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealStatePS.Models
{
    public class PropertyModel
    {
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
        public decimal? Price { get; set; }
        public string Email { get; set; }
        public string PhoneOne { get; set; }
        public string PhoneTwo { get; set; }
        public string WebSite { get; set; }
        public string VideoLink { get; set; }
        public int? PropertyOperationId { get; set; }
        public int? PropertyTypeId { get; set; }
        public bool IsActive { get; set; }
        public string Creator { get; set; }
        public DateTime Created { get; set; }
        public string Modifier { get; set; }
        public DateTime? Modified { get; set; }
        public string Image1 { get; set; }
        public string Image2 { get; set; }
        public string Image3 { get; set; }
        public string Image4 { get; set; }
        public string Image5 { get; set; }
        public string Image6 { get; set; }
        public string Image7 { get; set; }
        public string Image8 { get; set; }
        public string Image9 { get; set; }
        public string Image10 { get; set; }
    }
}
