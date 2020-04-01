using jvbproductions_services.Interfaces;
using jvbproductions_services.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace jvbproductions_services.Helpers
{
    public class PackageService: IPackageService
    {
        private string connString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=JvBProductions;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        private readonly JoeGuitarContext db;


        public PackageService(JoeGuitarContext context)
        {
            this.db = context;
        }

        public bool PackageExists(string packageName)
        {
            var packageFound = db.Packages.FirstOrDefault(package => package.Song.Title == packageName);

            return packageFound != null;
        }

        public Package GetPackage(string packageName)
        {
            var packageFound = db.Packages.FirstOrDefault(package => package.Song.Title == packageName);
            return packageFound;
        }

        public void AddRecourceAccess(string userId, string resource)
        {
            var access = new Access() { UserId = userId, Recource = resource };
            db.Access.Add(access);
            db.SaveChanges();
        }

        public Access GetRecourseAccess(string userId, string resource)
        {
            var accessFound = db.Access.FirstOrDefault(access => access.UserId == userId && access.Recource == resource);
            return accessFound;
        }

        public List<Package> GetAllPackages ()
        {
            return db.Packages.Select(row => row).ToList();
        }

        public List<Exercise> GetExcersisesForPackage(string packageName) {
            List<Exercise> allExcersises = new List<Exercise>();
            return db.Exercises.Where(exercise => exercise.LessonName == packageName).ToList();
        }
    }
}
