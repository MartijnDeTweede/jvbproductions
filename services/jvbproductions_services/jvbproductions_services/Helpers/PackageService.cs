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

        public Exercise GetExersise(string exercisename)
        {
            var exerciseFound = db.Exercises.FirstOrDefault(exercise => exercise.ExerciseName == exercisename);
            return exerciseFound;
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
            return db.Packages.Include("Song").ToList();
        }

        public List<Exercise> GetExcersisesForPackage(string packageName) {
            List<Exercise> allExcersises = new List<Exercise>();
            return db.Exercises.Where(exercise => exercise.LessonName == packageName).ToList();
        }
    }
}
