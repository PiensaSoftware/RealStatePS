using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealStatePS.Entity;
using RealStatePS.Service.Contract;

namespace RealStatePS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyPublishedController : ControllerBase
    {
        private readonly IPropertyService _propertyService;
        private readonly IPropertyImageService _propertyImageService;
        private readonly IHostingEnvironment _env;
        private readonly IUserService _userService;
        private readonly string _httpContextAccessor;

        public PropertyPublishedController(
            IPropertyService propertyService,
            IPropertyImageService propertyImageService,
            IHostingEnvironment env,
            IUserService userService,
            IHttpContextAccessor httpContextAccessor)
        {
            _env = env;
            _propertyService = propertyService;
            _propertyImageService = propertyImageService;
            _userService = userService;
            _httpContextAccessor = httpContextAccessor.HttpContext.User.Identities.First().Claims.Count() > 0 ?
               httpContextAccessor.HttpContext.User.Identities.First().Claims.First(w => w.Type == "id").Value :
               null;
        }

        [Authorize]
        [HttpGet]
        public MethodResponse<List<Property>> Get(int page)
        {
            var result = new MethodResponse<List<Property>> { Code = 100, Message = "Success", Result = null };
            try
            {
                var userId = _httpContextAccessor;
                var userProfile = _userService.FindUsersProfileForUserId(userId);

                result.Result = _propertyService.GetPropertiesByUser(userProfile.Id)
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