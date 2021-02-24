using RealStatePS.Data.DB;
using RealStatePS.Entity;
using RealStatePS.Repository;
using System.Collections.Generic;
using RealStatePS.Service.Contract;

namespace RealStatePS.Service
{
    public class PropertyTypeService : Repository<PropertyType>, IPropertyTypeService
    {
        public PropertyTypeService(RealStatePS_DB repositoryContext)
            : base(repositoryContext)
        {
        }

        public IEnumerable<PropertyType> GetAllPropertyTypes() =>
        GetAll();

    }
}
