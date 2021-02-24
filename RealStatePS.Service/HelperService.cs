using Microsoft.AspNetCore.Hosting;
using RealStatePS.Entity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Mail;
using System.Net.Mime;
using System.Security.Cryptography;
using System.Text;
using RealStatePS.Service.Contract;

namespace RealStatePS.Service
{
    public class HelperService : IHelperService
    {
        public bool MailSender(MailConfig config, Mail mail, List<Receiver> receiver)
        {
            var client = new SmtpClient()
            {
                Port = config.Port,
                Host = config.Host,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new System.Net.NetworkCredential(config.Email, config.Password)
            };

            foreach (var item in receiver)
            {
                var message = new MailMessage(config.Email, item.Email, mail.Subject, mail.Content);
                if (mail.Files?.Count > 0)
                    foreach (var file in mail.Files)
                    {
                        file.File.Seek(0, SeekOrigin.Begin);
                        Attachment attachment = new Attachment(file.File, file.Name, file.MediaType);
                        ContentDisposition disposition = attachment.ContentDisposition;
                        disposition.CreationDate = DateTime.Now;
                        disposition.ModificationDate = DateTime.Now;
                        disposition.ReadDate = DateTime.Now;
                        disposition.FileName = Path.GetFileName(file.Name);
                        disposition.Size = file.File.Length;
                        disposition.DispositionType = DispositionTypeNames.Attachment;
                        message.Attachments.Add(attachment);
                    }
                message.IsBodyHtml = true;
                message.BodyEncoding = UTF8Encoding.UTF8;
                message.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
                System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate (object s,
                System.Security.Cryptography.X509Certificates.X509Certificate certificate,
                System.Security.Cryptography.X509Certificates.X509Chain chain,
                System.Net.Security.SslPolicyErrors sslPolicyErrors)
                {
                    return true;
                };
                client.Send(message);
            }
            return true;
        }
        public string GetTemplateHTML(string name, IHostingEnvironment _env)
        {
            using (var sr = new StreamReader(Path.Combine(_env.ContentRootPath, "Templates",$"{name}.html")))
            {
                string result = sr.ReadToEnd();
                sr.Close();
                return result;
            }
        }
        public string Replace(string text, List<KeyValuePair<string, string>> words)
        {
            words.ForEach(f => text.Replace(f.Key, f.Value));
            return text;
        }
        public string Encrypt(string plainText, string passPhrase)
        {
            var key = Encoding.UTF8.GetBytes(passPhrase);

            using (var aesAlg = Aes.Create())
            {
                using (var encryptor = aesAlg.CreateEncryptor(key, aesAlg.IV))
                {
                    using (var msEncrypt = new MemoryStream())
                    {
                        using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                        using (var swEncrypt = new StreamWriter(csEncrypt))
                        {
                            swEncrypt.Write(plainText);
                        }

                        var iv = aesAlg.IV;

                        var decryptedContent = msEncrypt.ToArray();

                        var result = new byte[iv.Length + decryptedContent.Length];

                        Buffer.BlockCopy(iv, 0, result, 0, iv.Length);
                        Buffer.BlockCopy(decryptedContent, 0, result, iv.Length, decryptedContent.Length);

                        return Convert.ToBase64String(result);
                    }
                }
            }
        }
        public string Decrypt(string cipherText, string passPhrase)
        {
            var fullCipher = Convert.FromBase64String(cipherText);

            var iv = new byte[16];
            var cipher = new byte[fullCipher.Length - iv.Length];

            Buffer.BlockCopy(fullCipher, 0, iv, 0, iv.Length);
            Buffer.BlockCopy(fullCipher, iv.Length, cipher, 0, fullCipher.Length - iv.Length); 
            var key = Encoding.UTF8.GetBytes(passPhrase);

            using (var aesAlg = Aes.Create())
            {
                using (var decryptor = aesAlg.CreateDecryptor(key, iv))
                {
                    string result;
                    using (var msDecrypt = new MemoryStream(cipher))
                    {
                        using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {
                            using (var srDecrypt = new StreamReader(csDecrypt))
                            {
                                result = srDecrypt.ReadToEnd();
                            }
                        }
                    }
                    return result;
                }
            }
        }
        public string Base64Encode(string plainText)
        {
            var plainTextBytes = Encoding.UTF8.GetBytes(plainText);
            return Convert.ToBase64String(plainTextBytes);
        }
        public string Base64Decode(string base64Encoded)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64Encoded);
            return Encoding.UTF8.GetString(base64EncodedBytes);
        }
    }
}
