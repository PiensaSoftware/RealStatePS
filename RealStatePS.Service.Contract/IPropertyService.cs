
using RealStatePS.Entity;
using System.Collections.Generic;

namespace RealStatePS.Service.Contract
{
    public interface IPropertyService
    {
        IEnumerable<Property> GetAllProperties();
        IEnumerable<Property> GetTopProperties(int number);
        Property GetPropertyById(long propertyId);
        IEnumerable<Property> GetPropertiesByUser(long userProfileId);
        Property CreateProperty(Property propertyId);
        Property UpdateProperty(Property property);
        void DeleteProperty(Property property);
        IEnumerable<Property> GetPaginationProperties(int page);
        IEnumerable<Property> GetSearchProperties(string word);
        IEnumerable<Property> GetSearchFilterProperties(Property model);
    }
}
