using RealStatePS.Data.DB;
using RealStatePS.Entity;
using RealStatePS.Repository;
using System.Collections.Generic;
using RealStatePS.Service.Contract;

namespace RealStatePS.Service
{
    public class PropertyOperationService : Repository<PropertyOperation>, IPropertyOperationService
    {
        public PropertyOperationService(RealStatePS_DB repositoryContext)
            : base(repositoryContext)
        {
        }

        public IEnumerable<PropertyOperation> GetAllPropertyOperations() =>
        GetAll();

    }
}
