using jvbproductions_services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jvbproductions_services.Interfaces
{
    public interface IUserService
    {
        bool UserExists(string fireBaseId);
        User GetUser(string fireBaseId);
        User UpdateUserCredit(string fireBaseId, int currentCredit, int creditMutation);
        User CreateNewUser(string fireBaseId);

        bool UserIsAdmin(string fireBaseId);
    }
}
