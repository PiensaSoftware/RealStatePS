﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RealStatePS.Entity;
using RealStatePS.Models;
using RealStatePS.Service.Contract;

namespace RealStatePS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        private readonly IPropertyService _propertyService;
        private readonly IPropertyImageService _propertyImageService;
        private readonly IHostingEnvironment _env;
        private readonly IUserService _userService;
        private readonly string _httpContextAccessor;

        public PropertyController(
            IPropertyService propertyService,
            IPropertyImageService propertyImageService,
            IHostingEnvironment env,
            UserManager<AspNetUsers> userManager,
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

        [HttpPost]
        public MethodResponse<long> Post([FromBody] PropertyModel model)
        {
            var result = new MethodResponse<long> { Code = 100, Message = "Success", Result = 0 };
            try
            {
                var userId = _httpContextAccessor;
                var userProfile = _userService.FindUsersProfileForUserId(userId);

                var r = _propertyService.CreateProperty(new Property
                {
                    Title = model.Title,
                    Description = model.Description,
                    IsActive = true,
                    Bathrooms = model.Bathrooms,
                    Bedrooms = model.Bedrooms,
                    Level = model.Level,
                    MetersBuilt = model.MetersBuilt,
                    MetersLand = model.MetersLand,
                    Garage = model.Garage,
                    Email = model.Email,
                    PhoneOne = model.PhoneOne,
                    PhoneTwo = model.PhoneTwo,
                    Street = model.Street,
                    Number = model.Number,
                    Settlement = model.Settlement,
                    Municipality = model.Municipality,
                    State = model.State,
                    Price = (decimal)model.Price,
                    PropertyOperationId = (int)model.PropertyOperationId,
                    PropertyTypeId = (int)model.PropertyTypeId,
                    UserProfileId = userProfile.Id,
                    VideoLink = model.VideoLink,
                    WebSite = model.WebSite,
                    Created = DateTime.Now,
                    Creator = userId
                });

                result.Result = r.Id;
                model.Id = result.Result;
                ProcessImages(model);
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Code = -100;
                result.Result = 0;
            }
            return result;
        }

        [AllowAnonymous]
        [HttpGet]
        public MethodResponse<List<Property>> Get(int page)
        {
            var result = new MethodResponse<List<Property>> { Code = 100, Message = "Success", Result = null };
            try
            {
                result.Result = _propertyService.GetPaginationProperties(page)
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

        [HttpPut]
        public MethodResponse<Property> Put([FromBody] PropertyModel model)
        {
            var result = new MethodResponse<Property> { Code = 100, Message = "Success", Result = null };
            try
            {
                var userId = _httpContextAccessor;
                var userProfile = _userService.FindUsersProfileForUserId(userId);

                result.Result = _propertyService.UpdateProperty(new Property
                {
                    Id = model.Id,
                    Title = model.Title,
                    Description = model.Description,
                    IsActive = model.IsActive,
                    Bathrooms = model.Bathrooms,
                    Bedrooms = model.Bedrooms,
                    Level = model.Level,
                    MetersBuilt = model.MetersBuilt,
                    MetersLand = model.MetersLand,
                    Garage = model.Garage,
                    Email = model.Email,
                    PhoneOne = model.PhoneOne,
                    PhoneTwo = model.PhoneTwo,
                    Street = model.Street,
                    Number = model.Number,
                    Settlement = model.Settlement,
                    Municipality = model.Municipality,
                    State = model.State,
                    Price = (decimal)model.Price,
                    PropertyOperationId = (int)model.PropertyOperationId,
                    PropertyTypeId = (int)model.PropertyTypeId,
                    UserProfileId = model.UserProfileId,
                    VideoLink = model.VideoLink,
                    WebSite = model.WebSite,
                    Created = model.Created,
                    Creator = model.Creator,
                    Modified = DateTime.Now,
                    Modifier = userId
                });
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Code = -100;
                result.Result = null;
            }
            return result;
        }
        public void ProcessImages(PropertyModel model)
        {
            if (model.Image1 != "")
                SaveImage(model.Image1.Split(",")[1], 1, model.Id);
            if (model.Image2 != "")
                SaveImage(model.Image2.Split(",")[1], 2, model.Id);
            if (model.Image3 != "")
                SaveImage(model.Image3.Split(",")[1], 3, model.Id);
            if (model.Image4 != "")
                SaveImage(model.Image4.Split(",")[1], 4, model.Id);
            if (model.Image5 != "")
                SaveImage(model.Image5.Split(",")[1], 5, model.Id);
            if (model.Image6 != "")
                SaveImage(model.Image6.Split(",")[1], 6, model.Id);
            if (model.Image7 != "")
                SaveImage(model.Image7.Split(",")[1], 7, model.Id);
            if (model.Image8 != "")
                SaveImage(model.Image8.Split(",")[1], 8, model.Id);
            if (model.Image9 != "")
                SaveImage(model.Image9.Split(",")[1], 9, model.Id);
            if (model.Image10 != "")
                SaveImage(model.Image10.Split(",")[1], 10, model.Id);
        }
        public void SaveImage(string image64, int order, long propertyId)
        {
            var pathProd = Path.Combine("clientapp", "dist");
            var path = Path.Combine("assets", "images", "properties");
            var image = $"{propertyId}-{order}.jpg";
            if (!Directory.Exists(Path.Combine(_env.WebRootPath, pathProd, path)))
                Directory.CreateDirectory(path);

            byte[] imageBytes = Convert.FromBase64String(image64);
            System.IO.File.WriteAllBytes(Path.Combine(_env.WebRootPath, pathProd, path, image), imageBytes);

            _propertyImageService.CreatePropertyImage(new PropertyImage
            {
                Order = order,
                PropertyId = propertyId,
                Url = Path.Combine(path, image),
                Created = DateTime.Now,
                Creator = "SYSTEM"
            });
        }
    }
}