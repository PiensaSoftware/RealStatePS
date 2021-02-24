using RealStatePS.Data.DB;
using RealStatePS.Entity;
using RealStatePS.Repository;
using RealStatePS.Service.Contract;

namespace RealStatePS.Service
{
    public class TemporalViewUsersService : Repository<TemporalViewUsers>, ITemporalViewUsersService
    {
        public TemporalViewUsersService(RealStatePS_DB repositoryContext)
            : base(repositoryContext)
        {
        }

        public TemporalViewUsers FindForUserId(string userId) =>
        Find(w => w.UserId == userId);
    }
}
