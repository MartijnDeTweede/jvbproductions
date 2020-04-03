using jvbproductions_services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jvbproductions_services.Interfaces
{
    public interface IAdminService
    {
        void AddPackage(Package package);
        void AddExercise(Exercise exercise);
        void UpdatePackage(Package package);
        void UpdateExercise(Exercise exercise);
        Task DeletePackageAsync(string title);
        void DeleteExercise(Exercise exercise);
    }
}
