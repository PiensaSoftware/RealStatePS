
using RealStatePS.Entity;
using System.Collections.Generic;

namespace RealStatePS.Service.Contract
{
    public interface IPropertyImageService
    {
        IEnumerable<PropertyImage> GetAllPropertyImages();
        PropertyImage GetPropertyImageById(int propertyImageId);
        IEnumerable<PropertyImage> GetPropertyImagesByPropertyId(long propertyId);
        IEnumerable<PropertyImage> FindAllPropertyImages(long propertyId);
        PropertyImage CreatePropertyImage(PropertyImage propertyImage);
        PropertyImage UpdatePropertyImage(PropertyImage propertyImage);
        void DeletePropertyImage(PropertyImage propertyImage);
        void DeletePropertyImages(IEnumerable<PropertyImage> propertyImages);
    }
}
