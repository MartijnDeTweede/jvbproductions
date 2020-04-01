using jvbproductions_services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jvbproductions_services.Interfaces
{
    public interface IUserService
    {
        bool UserExists(string userId);
        User GetUser(string userId);
        User UpdateUserCredit(string userId, int currentCredit, int creditMutation);
        User CreateNewUser(string fireBaseId);
    }
}
