using jvbproductions_services.Models;
using System;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using jvbproductions_services.Interfaces;

namespace jvbproductions_services.Helpers
{
    public class AdminService: IAdminService
    {
        private readonly JoeGuitarContext db;

        public AdminService(JoeGuitarContext context)
        {
            this.db = context;
        }
        public void AddPackage(Package package)
        {
            db.Packages.Add(package);
            db.SaveChanges();
        }

        public void AddExercise(Exercise exercise)
        {
            db.Exercises.Add(exercise);
            db.SaveChanges();
        }

        public void UpdatePackage(Package package)
        {
            var entry = db.Entry(package);
            entry.State = EntityState.Modified;
            db.SaveChanges();
        }

        public void UpdateExercise(Exercise exercise)
        {
            var entry = db.Entry(exercise);
            entry.State = EntityState.Modified;
            db.SaveChanges();
        }

        public async Task DeletePackageAsync(string title)
        {
            var lesson = await db.Packages.FirstOrDefaultAsync(package => package.Song.Title == title);
            db.Packages.Remove(lesson);
            db.SaveChanges();

        }

        public void DeleteExercise(Exercise exercise)
        {
            db.Exercises.Remove(exercise);
            db.SaveChanges();
        }
    }
}
