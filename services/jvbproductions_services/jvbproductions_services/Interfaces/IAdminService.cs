using jvbproductions_services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jvbproductions_services.Interfaces
{
    public interface IAdminService
    {
        void AddPackage(PackageModel package);
        void AddExercise(ExerciseModel exercise);
        void UpdatePackage(PackageModel package);
        void UpdateExercise(ExerciseModel exercise);
        Task DeletePackageAsync(string title);
        void DeleteExercise(ExerciseModel exercise);
    }
}
