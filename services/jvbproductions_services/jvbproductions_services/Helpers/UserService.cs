using jvbproductions_services.Interfaces;
using jvbproductions_services.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jvbproductions_services.Helpers
{
    public class UserService: IUserService
    {

        private readonly JoeGuitarContext db;

        public UserService(JoeGuitarContext context)
        {
            this.db = context;
        }

        public bool UserExists(string fireBaseId)
        {
            var user = db.Users.FirstOrDefault(u => u.FireBaseId == fireBaseId);
            return user != null;
        }

        public User GetUser(string fireBaseId)
        {
            return db.Users.FirstOrDefault(u => u.FireBaseId == fireBaseId);
        }

        public User UpdateUserCredit(string fireBaseId, int currentCredit, int creditMutation)
        {
            int newCredit = currentCredit + creditMutation;

            var user = db.Users.FirstOrDefault(u => u.FireBaseId == fireBaseId);
            user.Credits = newCredit;

            var entry = db.Entry(user);
            entry.State = EntityState.Modified;
            db.SaveChanges();

            return user;
        }

        public User CreateNewUser(string fireBaseId)
        {
            var user = new User() { Credits = 100, isAdmin = false, FireBaseId=fireBaseId };
            db.Users.Add(user);
            db.SaveChanges();

            return user;
        }
    }
}
