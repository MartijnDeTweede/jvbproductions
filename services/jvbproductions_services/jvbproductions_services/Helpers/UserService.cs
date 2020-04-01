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

        public bool UserExists(string userId)
        {
            var user = db.Users.Find(userId);
            return user != null;
        }

        public User GetUser(string userId)
        {
            return db.Users.Find(userId);
        }

        public User UpdateUserCredit(string userId, int currentCredit, int creditMutation)
        {
            int newCredit = currentCredit + creditMutation;

            var user = db.Users.Find(userId);
            user.Credits = newCredit;

            var entry = db.Entry(user);
            entry.State = EntityState.Modified;
            db.SaveChanges();

            return user;
        }

        public User CreateNewUser()
        {
            var user = new User() { Credits = 100, isAdmin = false };
            db.Users.Add(user);
            db.SaveChanges();

            return user;
        }
    }
}
