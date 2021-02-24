using RealStatePS.Data.DB;
using RealStatePS.Entity;
using RealStatePS.Repository;
using System.Collections.Generic;
using RealStatePS.Service.Contract;

namespace RealStatePS.Service
{
    public class UserService : Repository<UserProfile>, IUserService
    {
        public UserService(RealStatePS_DB repositoryContext)
            : base(repositoryContext)
        {
        }

        public IEnumerable<UserProfile> GetAllUsersProfile() =>
        GetAll();

        public UserProfile GetUserProfileById(long userProfileId) =>
        _context.Set<UserProfile>().Find(userProfileId);

        public UserProfile CreateUserProfile(UserProfile userProfile) =>
        Add(userProfile);

        public UserProfile UpdateUserProfile(UserProfile userProfile) =>
        Update(userProfile, userProfile.Id);

        public void DeleteUserProfile(UserProfile userProfile) =>
        Delete(userProfile);

        public UserProfile FindUsersProfileForUserId(string userId) =>
        Find(w=>w.UserId == userId);
    }
}
