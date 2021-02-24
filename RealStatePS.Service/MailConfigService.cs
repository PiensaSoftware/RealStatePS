using RealStatePS.Data.DB;
using RealStatePS.Entity;
using RealStatePS.Repository;
using RealStatePS.Service.Contract;

namespace RealStatePS.Service
{
    public class MailConfigService : Repository<MailConfig>, IMailConfigService
    {
        public MailConfigService(RealStatePS_DB repositoryContext)
            : base(repositoryContext)
        {
        }

        public MailConfig FindMailConfigForIsActive() =>
        Find(w => w.IsActive);
    }
}
