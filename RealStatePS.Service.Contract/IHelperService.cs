using Microsoft.AspNetCore.Hosting;
using RealStatePS.Entity;
using System.Collections.Generic;

namespace RealStatePS.Service.Contract
{
    public interface IHelperService
    {
        bool MailSender(MailConfig config, Mail mail, List<Receiver> receiver);
        string GetTemplateHTML(string name, IHostingEnvironment _env);
        string Replace(string text, List<KeyValuePair<string, string>> words);
        string Encrypt(string plainText, string passPhrase);
        string Decrypt(string cipherText, string passPhrase);
        string Base64Encode(string plainText);
        string Base64Decode(string base64Encoded);
    }
}
