
using RealStatePS.Entity;
using System.Collections.Generic;

namespace RealStatePS.Service.Contract
{
    public interface IPropertyOperationService
    {
        IEnumerable<PropertyOperation> GetAllPropertyOperations();
    }
}
