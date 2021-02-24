using RealStatePS.Entity;

namespace RealStatePS.Service.Contract
{
    public interface ITemporalViewUsersService
    {
        TemporalViewUsers FindForUserId(string userId);
    }
}
