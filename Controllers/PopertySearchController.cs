using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RealStatePS.Entity;
using RealStatePS.Models;
using RealStatePS.Service.Contract;

namespace RealStatePS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PopertySearchController : ControllerBase
    {
        private readonly IPropertyService _propertyService;
        private readonly IPropertyImageService _propertyImageService;

        public PopertySearchController(
            IPropertyService propertyService,
            IPropertyImageService propertyImageService)
        {
            _propertyService = propertyService;
            _propertyImageService = propertyImageService;
        }

        [AllowAnonymous]
        [HttpGet]
        public MethodResponse<List<Property>> Get(string word)
        {
            var result = new MethodResponse<List<Property>> { Code = 100, Message = "Success", Result = null };
            try
            {
                result.Result = _propertyService.GetSearchProperties(word)
                  .ToList();

                foreach (var property in result.Result)
                {
                    property.PropertyImage = _propertyImageService.FindAllPropertyImages(property.Id)
                        .ToList();
                }
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Code = -100;
                result.Result = null;
            }
            return result;
        }

        [AllowAnonymous]
        [HttpPost]
        public MethodResponse<List<Property>> Post([FromBody] PropertyModel model)
        {
            var result = new MethodResponse<List<Property>> { Code = 100, Message = "Success", Result = null };
            try
            {
                result.Result = _propertyService.GetSearchFilterProperties(new Property
                {
                    PropertyTypeId = model.PropertyTypeId ?? 0,
                    PropertyOperationId = model.PropertyOperationId ?? 0,
                    State = model.State ?? "",
                    Municipality = model.Municipality ?? "",
                    Settlement = model.Settlement ?? "",
                    Price = model.Price ?? 0
                })
                .ToList();

                foreach (var property in result.Result)
                {
                    property.PropertyImage = _propertyImageService.FindAllPropertyImages(property.Id)
                        .ToList();
                }
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