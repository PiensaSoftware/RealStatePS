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
    public class PropertyOperationController : ControllerBase
    {
        private readonly IPropertyOperationService _propertyOperationService;

        public PropertyOperationController(IPropertyOperationService propertyOperationService)
        {
            _propertyOperationService = propertyOperationService;
        }

        [HttpGet]
        public MethodResponse<List<PropertyOperation>> Get()
        {
            var result = new MethodResponse<List<PropertyOperation>> { Code = 100, Message = "Success", Result = null };
            try
            {
                result.Result = _propertyOperationService.GetAllPropertyOperations()
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