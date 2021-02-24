using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RealStatePS.Entity;
using RealStatePS.Models;
using RealStatePS.Service.Contract;
using RealStatePS.Service.Security;

namespace RealStatePS.Controllers
{

    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly UserManager<AspNetUsers> _userManager;
        private readonly IUserService _userService;
        private readonly IHelperService _helperService;
        private readonly ITemporalViewUsersService _temporalViewUsersService;
        private readonly IPasswordRecoverService _passwordRecoverService;
        private readonly IMailConfigService _mailConfigService;
        private readonly IHostingEnvironment _env;

        public AccountController(
            UserManager<AspNetUsers> userManager,
            IAccountService accountService,
            IUserService userService,
            IHelperService helperService,
            ITemporalViewUsersService temporalViewUsersService,
            IPasswordRecoverService passwordRecoverService,
            IMailConfigService mailConfigService,
            IHostingEnvironment env)
        {
            _accountService = accountService;
            _userManager = userManager;
            _userService = userService;
            _helperService = helperService;
            _temporalViewUsersService = temporalViewUsersService;
            _passwordRecoverService = passwordRecoverService;
            _mailConfigService = mailConfigService;
            _env = env;
        }

        [Route("api/Login")]
        [HttpPost]
        public MethodResponse<CurrentUser> Post([FromBody]LoginModel model)
        {
            var result = new MethodResponse<CurrentUser> { Code = 100, Message = "Success", Result = null };
            try
            {
                var identity = GetClaimsIdentity(model.Email, model.Password).Result;
                if (identity != null)
                {
                    var user = _userManager.FindByEmailAsync(model.Email).Result;
                    var userProfile = _userService.FindUsersProfileForUserId(user.Id);

                    if (!userProfile.IsActive)
                    {
                        result.Code = -50;
                        result.Message = "Cuenta inactiva";
                    }
                    else
                    {
                        var temporalViewUser = _temporalViewUsersService.FindForUserId(user.Id);
                        result.Result = Token.GenerateJwt(
                            identity,
                            _accountService,
                            model.Email,
                            new JWT { },
                            userProfile.Name,
                            temporalViewUser != null ? true : false);
                    }
                }
                else
                {
                    result.Message = "Datos de acceso invalidos.";
                    result.Code = -100;
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

        [Route("api/AccountActivate")]
        [HttpPost]
        public MethodResponse<bool> Post([FromBody] string code)
        {
            var result = new MethodResponse<bool> { Code = 100, Message = "Success", Result = false };
            try
            {
                var data = _helperService.Decrypt(_helperService.Base64Decode(code), "E585C8DF278CD5931069B522E695D4F2");
                var dataSplit = data.Split(",");

                var user = _userManager.FindByEmailAsync(dataSplit[1]).Result;
                var userProfile = _userService.FindUsersProfileForUserId(user.Id);

                if (!userProfile.IsActive)
                {
                    userProfile.IsActive = true;
                    _userService.UpdateUserProfile(userProfile);
                    result.Result = true;
                }
                else
                    result.Code = -50;
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Code = -100;
                result.Result = false;
            }
            return result;
        }

        [Route("api/PasswordRecover")]
        [HttpPost]
        public MethodResponse<bool> PostPasswordRecover([FromBody] string email)
        {
            var result = new MethodResponse<bool> { Code = 100, Message = "Success", Result = false };
            try
            {
                var user = _userManager.FindByEmailAsync(email).Result;
                if (user != null)
                {
                    var timeNow = DateTime.Now;
                    string stringData = $"{timeNow.ToString()},{user.Id},{user.UserName},{user.Email}";
                    var code = _helperService.Base64Encode(_helperService.Encrypt(stringData, "E585C8DF278CD5931069B522E695D4F2"));
                    var recover = _passwordRecoverService.CreatePasswordRecover(new PasswordRecover
                    {
                        Date = timeNow,
                        Email = email,
                        Status = false,
                        DueDate = timeNow.AddHours(24),
                        Code = code
                    });

                    var template = _helperService.GetTemplateHTML("RecoverPassword", _env);
                    template = template.Replace("#url#", code);
                    var mailConfig = _mailConfigService.FindMailConfigForIsActive();

                    _helperService.MailSender(new MailConfig
                    {
                        Email = mailConfig.Email,
                        Host = mailConfig.Host,
                        Name = mailConfig.Name,
                        Password = mailConfig.Password,
                        Port = mailConfig.Port
                    }, new Mail
                    {
                        Subject = "Restablecer Contraseña Online Propiedades",
                        Content = template
                    }, new List<Receiver> {
                        new Receiver{
                            Email = user.Email,
                            Name = user.UserName
                        }
                    });

                }
                else
                    result.Code = -50;
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Code = -100;
                result.Result = false;
            }
            return result;
        }

        [Route("api/PasswordRecover")]
        [HttpGet]
        public MethodResponse<bool> Get(string code)
        {
            var result = new MethodResponse<bool> { Code = 100, Message = "Success", Result = false };
            try
            {
                var passwordRecover = _passwordRecoverService.FindPasswordRecoverForCode(code);
                if (passwordRecover.DueDate > DateTime.Now & passwordRecover.Status == false)
                    result.Result = true;
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Code = -100;
                result.Result = false;
            }
            return result;
        }

        [Route("api/NewPassword")]
        [HttpPost]
        public MethodResponse<bool> Post([FromBody] PasswordRecoverModel model)
        {
            var result = new MethodResponse<bool> { Code = 100, Message = "Success", Result = false };
            try
            {
                var data = _helperService.Decrypt(_helperService.Base64Decode(model.Code), "E585C8DF278CD5931069B522E695D4F2");
                var dataSplit = data.Split(",");
                var user = _userManager.FindByEmailAsync(dataSplit[3]).Result;
                var resultRemove = _userManager.RemovePasswordAsync(user).Result;
                var resultChange = _userManager.AddPasswordAsync(user, model.Password).Result;

                var passwordRecover = _passwordRecoverService.FindPasswordRecoverForCode(model.Code);
                passwordRecover.RecoverDate = DateTime.Now;
                passwordRecover.Status = true;
                _passwordRecoverService.UpdatePasswordRecover(passwordRecover);
                result.Result = true;
            }
            catch (Exception ex)
            {
                result.Message = ex.Message;
                result.Code = -100;
                result.Result = false;
            }
            return result;
        }
        private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            var userToVerify = await _userManager.FindByNameAsync(userName);

            if (userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);

            if (await _userManager.CheckPasswordAsync(userToVerify, password))
            {
                return await Task.FromResult(_accountService.GenerateClaimsIdentity(userName, userToVerify.Id));
            }
            return await Task.FromResult<ClaimsIdentity>(null);
        }
    }
}