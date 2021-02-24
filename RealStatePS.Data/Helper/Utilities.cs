using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Net.Mail;
using System.Reflection;
using System.Threading.Tasks;
using System.Net;
using System.Net.Security;

namespace RealStatePS.Data.Helper
{
    public static class Utilities
    {
        public static async Task<IEnumerable<T>> Execute<T>(this DbCommand command)
        {
            using (command)
            {
                if (command.Connection.State == System.Data.ConnectionState.Closed)
                    command.Connection.Open();
                try
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        return reader.MapToList<T>();
                    }
                }
                catch (Exception e)
                {
                    throw (e);
                }
                finally
                {
                    command.Connection.Close();
                }
            }
        }
        public static IEnumerable<T> MapToList<T>(this DbDataReader dr)
        {
            //ejemplople error
            var result = new List<T>();
            var props = typeof(T).GetRuntimeProperties();
            DataTable dt = new DataTable();
            dt.Load(dr);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                T entity = Activator.CreateInstance<T>();
                foreach (var prop in props)
                {
                    try
                    {
                        if (dt.Columns.Contains(prop.Name))
                        {
                            var val = dt.Rows[i][prop.Name.ToLower()];
                            prop.SetValue(entity, val == DBNull.Value ? null : val);
                        }
                    }
                    catch (Exception ex)
                    {
                    }
                }
                result.Add(entity);
            }
            return result;
        }

        public static async Task SendEmail(string host, int port, string username, string password, bool enableSsl, MailMessage message)
        {
            using (var client = new SmtpClient())
            {
                client.Host = host;
                client.Port = port;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(username, password);
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.EnableSsl = enableSsl;
                client.Timeout = 100000;

                ServicePointManager.ServerCertificateValidationCallback = delegate (object s,
                System.Security.Cryptography.X509Certificates.X509Certificate certificate,
                System.Security.Cryptography.X509Certificates.X509Chain chain,
                SslPolicyErrors sslPolicyErrors)
                {
                    return true;
                };

                await client.SendMailAsync(message);
            }
        }
    }
}
