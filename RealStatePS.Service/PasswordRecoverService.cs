using RealStatePS.Data.DB;
using RealStatePS.Entity;
using RealStatePS.Repository;
using RealStatePS.Service.Contract;

namespace RealStatePS.Service
{
    public class PasswordRecoverService : Repository<PasswordRecover>, IPasswordRecoverService
    {
        public PasswordRecoverService(RealStatePS_DB repositoryContext)
            : base(repositoryContext)
        {
        }

        public PasswordRecover CreatePasswordRecover(PasswordRecover passwordRecover) =>
        Add(passwordRecover);

        public PasswordRecover FindPasswordRecoverForCode(string code) =>
        Find(w => w.Code == code);

        public PasswordRecover UpdatePasswordRecover(PasswordRecover passwordRecover) =>
        Update(passwordRecover, passwordRecover.Id);
    }
}
