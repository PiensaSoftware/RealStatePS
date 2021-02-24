using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using RealStatePS.Entity;
using RealStatePS.Service.Contract;

namespace RealStatePS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyTypeController : ControllerBase
    {
        private readonly IPropertyTypeService _propertyTypeService;

        public PropertyTypeController(IPropertyTypeService propertyTypeService)
        {
            _propertyTypeService = propertyTypeService;
        }

        [HttpGet]
        public MethodResponse<List<PropertyType>> Get()
        {
            var result = new MethodResponse<List<PropertyType>> { Code = 100, Message = "Success", Result = null };
            try
            {
                result.Result = _propertyTypeService.GetAllPropertyTypes()
                    .ToList();
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Code = -100;
                result.Result = null;
            }
            return result;
        }
    }
}