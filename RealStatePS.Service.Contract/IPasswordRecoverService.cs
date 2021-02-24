
using RealStatePS.Entity;

namespace RealStatePS.Service.Contract
{
    public interface IPasswordRecoverService
    {
        PasswordRecover CreatePasswordRecover(PasswordRecover passwordRecover);
        PasswordRecover FindPasswordRecoverForCode(string code);
        PasswordRecover UpdatePasswordRecover(PasswordRecover passwordRecover);
    }
}
