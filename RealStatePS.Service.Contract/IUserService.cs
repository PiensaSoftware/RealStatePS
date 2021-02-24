
using RealStatePS.Entity;
using System.Collections.Generic;

namespace RealStatePS.Service.Contract
{
    public interface IUserService
    {
        IEnumerable<UserProfile> GetAllUsersProfile();
        UserProfile GetUserProfileById(long userProfileId);
        UserProfile CreateUserProfile(UserProfile userProfile);
        UserProfile UpdateUserProfile(UserProfile userProfile);
        void DeleteUserProfile(UserProfile userProfile);
        UserProfile FindUsersProfileForUserId(string userId);
    }
}
