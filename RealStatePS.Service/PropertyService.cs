using RealStatePS.Data.DB;
using RealStatePS.Entity;
using RealStatePS.Repository;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using RealStatePS.Service.Contract;

namespace RealStatePS.Service
{
    public class PropertyService : Repository<Property>, IPropertyService
    {
        public PropertyService(RealStatePS_DB repositoryContext)
            : base(repositoryContext)
        {
        }

        public IEnumerable<Property> GetAllProperties() =>
        GetAll();

        public Property GetPropertyById(long propertyId) =>
        _context.Set<Property>().Find(propertyId);

        public IEnumerable<Property> GetPropertiesByUser(long userProfileId) =>
        FindAll(w => w.UserProfileId == userProfileId);

        public Property CreateProperty(Property property) =>
        Add(property);

        public Property UpdateProperty(Property property) =>
        Update(property, property.Id);

        public void DeleteProperty(Property property) =>
        Delete(property);

        public IEnumerable<Property> GetTopProperties(int number) =>
        GetAll().Where(w => w.IsActive == true)
                .OrderByDescending(g => g.Created)
                .Take(10);

        public IEnumerable<Property> GetPaginationProperties(int page)
        {
            DbCommand cmd = LoadCmd("GetPaginationProperties");
            cmd = AddParameter(cmd, "Page", page);
            return ExecuteSP(cmd);
        }

        public IEnumerable<Property> GetSearchProperties(string word)
        {
            DbCommand cmd = LoadCmd("GetSearchProperties");
            cmd = AddParameter(cmd, "Word", word);
            return ExecuteSP(cmd);
        }

        public IEnumerable<Property> GetSearchFilterProperties(Property model)
        {
            DbCommand cmd = LoadCmd("GetSearchFilterProperties");
            cmd = AddParameter(cmd, "Type", model.PropertyTypeId);
            cmd = AddParameter(cmd, "Operation", model.PropertyOperationId);
            cmd = AddParameter(cmd, "State", model.State);
            cmd = AddParameter(cmd, "Municipality", model.Municipality);
            cmd = AddParameter(cmd, "Settlement", model.Settlement);
            cmd = AddParameter(cmd, "Price", model.Price);
            return ExecuteSP(cmd);
        }
    }
}
