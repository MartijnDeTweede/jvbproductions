using jvbproductions_services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jvbproductions_services.Interfaces
{
    public interface IPackageService
    {
        bool PackageExists(string packageName);
        Package GetPackage(string packageName);
        void AddRecourceAccess(string userId, string resource);
        Access GetRecourseAccess(string userId, string resource);
        List<Package> GetAllPackages();
        List<Exercise> GetExcersisesForPackage(string PackageName);

    }
}
