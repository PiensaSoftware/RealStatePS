
using RealStatePS.Entity;
using System.Collections.Generic;

namespace RealStatePS.Service.Contract
{
    public interface IPropertyTypeService
    {
        IEnumerable<PropertyType> GetAllPropertyTypes();
    }
}
