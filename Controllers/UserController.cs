using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RealStatePS.Entity;
using RealStatePS.Models;
using RealStatePS.Service.Contract;

namespace RealStatePS.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly UserManager<AspNetUsers> _userManager;
        private readonly IHelperService _helperService;
        private readonly IMailConfigService _mailConfigService;
        private readonly IHostingEnvironment _env;
        public UserController(
            UserManager<AspNetUsers> userManager,
            IUserService userService,
            IHelperService helperService,
            IMailConfigService mailConfigService,
            IHostingEnvironment env)
        {
            _userManager = userManager;
            _userService = userService;
            _helperService = helperService;
            _mailConfigService = mailConfigService;
            _env = env;
        }

        [Route("api/User")]
        [HttpPost]
        public MethodResponse<UserProfile> Post([FromBody] UserModel model)
        {
            var result = new MethodResponse<UserProfile> { Code = 100, Message = "Success", Result = null };
            try
            {
                var user = new AspNetUsers
                {
                    Email = model.Email,
                    UserName = model.Email
                };

                var r = _userManager.CreateAsync(user, model.Password);
                if (r.Result.Succeeded)
                {
                    string pictureURL = string.Empty;
                    if (model.Avatar.Length > 0)
                        pictureURL = SaveImage(model.Avatar.Split(",")[1], $"{user.Id}.jpg");

                    result.Result = _userService.CreateUserProfile(new UserProfile
                    {
                        UserId = user.Id,
                        Name = model.Name,
                        LastName = model.LastName,
                        SecondLastName = model.SecondLastName,
                        IsActive = false,
                        PhoneOne = model.PhoneOne,
                        PhoneTwo = model.PhoneTwo,
                        Company = model.Company,
                        WebSite = model.WebSite,
                        ImageURL = pictureURL,
                        Creator = "ANON",
                        Created = DateTime.Now
                    });

                    var stringData = $"{DateTime.Now.ToString()},{model.Email},{model.Password}";
                    var mailConfig = _mailConfigService.FindMailConfigForIsActive();
                    var code = _helperService.Base64Encode(_helperService.Encrypt(stringData, "E585C8DF278CD5931069B522E695D4F2"));
                    var template = _helperService.GetTemplateHTML("Register", _env);
                    template = template.Replace("#url#", code);

                    _helperService.MailSender(new MailConfig
                    {
                        Email = mailConfig.Email,
                        Host = mailConfig.Host,
                        Name = mailConfig.Name,
                        Password = mailConfig.Password,
                        Port = mailConfig.Port
                    }, new Mail
                    {
                        Subject = "Registro Online Propiedades",
                        Content = template
                    }, new List<Receiver> {
                        new Receiver{
                            Email = model.Email,
                            Name = model.Name
                        }
                    });
                }
                else
                {
                    string errors = string.Empty;
                    r.Result.Errors.ToList().ForEach(f => errors += $"{f.Description}, ");

                    result.Code = -100;
                    result.Message = errors.Remove(errors.Length - 1);
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

        [Route("api/User")]
        [HttpGet]
        public MethodResponse<UserProfile> Get(string id)
        {
            var result = new MethodResponse<UserProfile> { Code = 100, Message = "Success", Result = null };
            try
            {
                var user = _userManager.FindByIdAsync(id).Result;
                result.Result = _userService.FindUsersProfileForUserId(user.Id);
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Code = -100;
                result.Result = null;
            }
            return result;
        }

        [Route("api/Users")]
        [HttpGet]
        public MethodResponse<List<UserModel>> Get()
        {
            var result = new MethodResponse<List<UserModel>> { Code = 100, Message = "Success", Result = null };
            try
            {
                result.Result = _userService.GetAllUsersProfile().Select(s => new UserModel
                {
                    Id = s.Id,
                    Avatar = s.ImageURL,
                    Name = s.Name,
                    LastName = s.LastName,
                    SecondLastName = s.SecondLastName,
                    IsActive = s.IsActive,
                    UserId = s.UserId,
                    Email = _userManager.FindByIdAsync(s.UserId).Result.Email
                }).ToList();
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Code = -100;
                result.Result = null;
            }
            return result;
        }

        private string SaveImage(string image64, string name)
        {
            var path = Path.Combine(_env.WebRootPath, "clientapp", "dist", "assets", "images", "profile");
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            var pathFile = Path.Combine(path, name);
            byte[] imageBytes = Convert.FromBase64String(image64);
            System.IO.File.WriteAllBytes(pathFile, imageBytes);

            return pathFile;
        }
    }
}
