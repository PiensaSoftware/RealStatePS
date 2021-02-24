using RealStatePS.Data.DB;
using RealStatePS.Entity;
using RealStatePS.Repository;
using System.Collections.Generic;
using RealStatePS.Service.Contract;

namespace RealStatePS.Service
{
    public class PropertyImageService : Repository<PropertyImage>, IPropertyImageService
    {
        public PropertyImageService(RealStatePS_DB repositoryContext)
            : base(repositoryContext)
        {
        }
        public IEnumerable<PropertyImage> GetAllPropertyImages() =>
        GetAll();

        public PropertyImage GetPropertyImageById(int propertyImageId) =>
        _context.Set<PropertyImage>().Find(propertyImageId);

        public IEnumerable<PropertyImage> GetPropertyImagesByPropertyId(long propertyId) =>
        FindAll(w => w.PropertyId == propertyId);

        public PropertyImage CreatePropertyImage(PropertyImage propertyImage) =>
        Add(propertyImage);

        public PropertyImage UpdatePropertyImage(PropertyImage propertyImage) =>
        Update(propertyImage, propertyImage.Id);

        public void DeletePropertyImage(PropertyImage propertyImage) =>
        Delete(propertyImage);

        public void DeletePropertyImages(IEnumerable<PropertyImage> propertyImages) =>
        DeleteRange(propertyImages);

        public IEnumerable<PropertyImage> FindAllPropertyImages(long propertyId) =>
        FindAll(w => w.PropertyId == propertyId);

    }
}
