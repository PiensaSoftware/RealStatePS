using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net.Mime;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RealStatePS.Entity;
using RealStatePS.Models;
using RealStatePS.Service.Contract;

namespace RealStatePS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyDetailController : ControllerBase
    {
        private readonly UserManager<AspNetUsers> _userManager;
        private readonly IPropertyService _propertyService;
        private readonly IPropertyImageService _propertyImageService;
        private readonly IHostingEnvironment _env;
        private readonly IHelperService _helperService;
        private readonly IMailConfigService _mailConfigService;

        public PropertyDetailController(
            UserManager<AspNetUsers> userManager,
            IPropertyService propertyService,
            IPropertyImageService propertyImageService,
            IHostingEnvironment env,
            IHelperService helperService,
            IMailConfigService mailConfigService)
        {
            _userManager = userManager;
            _propertyService = propertyService;
            _propertyImageService = propertyImageService;
            _env = env;
            _helperService = helperService;
            _mailConfigService = mailConfigService;
        }

        [HttpGet]
        public MethodResponse<Property> Get(long propertyId)
        {
            var result = new MethodResponse<Property> { Code = 100, Message = "Success", Result = null };
            try
            {
                result.Result = _propertyService.GetPropertyById(propertyId);
                result.Result.PropertyImage = _propertyImageService.FindAllPropertyImages(propertyId)
                       .ToList();

                foreach (var img in result.Result.PropertyImage)
                {
                    using (Image image = Image.FromFile(
                        Path.Combine(_env.WebRootPath, "clientapp", "dist", img.Url)))
                    {
                        using (MemoryStream m = new MemoryStream())
                        {
                            image.Save(m, image.RawFormat);
                            byte[] imageBytes = m.ToArray();
                            img.Url = "data:image/jpg;base64," + Convert.ToBase64String(imageBytes);
                        }
                    }
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

        [HttpPost]
        public MethodResponse<bool> Post([FromBody] SendDetailModel model)
        {
            var result = new MethodResponse<bool> { Code = 100, Message = "Success", Result = false };
            try
            {
                var pdfBinary = Convert.FromBase64String(model.PDF);
                Stream memoryStream = new MemoryStream();
                memoryStream.Write(pdfBinary, 0, pdfBinary.Length);

                var template = _helperService.GetTemplateHTML("SendDetail", _env);
                template = template.Replace("#url#", model.Id);

                var mail = new Mail
                {
                    Subject = "Propiedad publicada en Online Propiedades",
                    Content = template,
                    Files = new List<FileAttachment>() { new FileAttachment {
                        Name = model.Name,
                        File = memoryStream,
                        MediaType = MediaTypeNames.Application.Pdf } }
                };


                if (model.Email == null)
                {
                    var userId = User.Identities.First().Claims.First(w => w.Type == "id").Value;
                    var user = _userManager.FindByIdAsync(userId).Result;
                    model.Email = user.Email;
                }

                var mailConfig = _mailConfigService.FindMailConfigForIsActive();
                _helperService.MailSender(
                    mailConfig,
                    mail,
                    new List<Receiver> {
                        new Receiver{ Email = model.Email }
                    });
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
    }
}