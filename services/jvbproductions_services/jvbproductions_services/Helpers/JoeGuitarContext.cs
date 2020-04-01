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
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<Package> Packages { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Exercise>().ToTable("Exercises");
            modelBuilder.Entity<Package>().ToTable("Packages");
            modelBuilder.Entity<User>().ToTable("Users");
        }
    }
}
