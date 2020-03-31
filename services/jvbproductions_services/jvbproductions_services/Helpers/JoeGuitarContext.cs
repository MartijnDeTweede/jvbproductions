using jvbproductions_services.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jvbproductions_services.Helpers
{
    public class JoeGuitarContext : DbContext
    {

        public JoeGuitarContext(DbContextOptions<JoeGuitarContext> options) : base(options)
        {

        }
        public DbSet<ExerciseModel> Exercises { get; set; }
        public DbSet<PackageModel> Packages { get; set; }
        public DbSet<UserModel> Users { get; set; }
    }
}
