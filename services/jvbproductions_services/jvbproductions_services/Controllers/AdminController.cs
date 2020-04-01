using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using jvbproductions_services.DTO;
using jvbproductions_services.Helpers;
using jvbproductions_services.Interfaces;
using jvbproductions_services.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace jvbproductions_services.Controllers
{
    public class AdminController : Controller
    {
        private readonly IAdminService adminService;
        private readonly IPackageService packageService;

        public AdminController(IAdminService adminService, IPackageService packageService)
        {
            this.adminService = adminService;
            this.packageService = packageService;
        }

        // Post api/admin/addLesson
        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        [Route("api/admin/addPackage/")]
        public ActionResult<List<Package>> addPackage([FromBody] PackageDTO dto)
        {
            var package = dto.Package;
            List<Package> allLessons = new List<Package>();
            try
            {
                adminService.AddPackage(package);
                allLessons = packageService.GetAllPackages();
            }
            catch (Exception e)
            {
                BadRequest(e);
            }
            return allLessons;
        }

        // Post api/admin/updateLesson
        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        [Route("api/admin/updatePackage/")]
        public ActionResult<List<Package>> updatePackage([FromBody] PackageDTO dto)
        {
            var package = dto.Package;
            List<Package> allLessons = new List<Package>();
            try
            {
                adminService.UpdatePackage(package);
                allLessons = packageService.GetAllPackages();
            }
            catch (Exception e)
            {
                BadRequest(e);
            }

            return allLessons;
        }

        // Post api/admin/deleteLesson
        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        [Route("api/admin/deletePackage/")]
        public ActionResult<List<Package>> deletePackage([FromBody] PackageDTO dto)
        {
            var lessonName = dto.Package.Song.Title;
            List<Package> allLessons = new List<Package>();
            try
            {
                adminService.DeletePackageAsync(lessonName);
                allLessons = packageService.GetAllPackages();
            }
            catch (Exception e)
            {
                BadRequest(e);
            }
            return allLessons;
        }

        // Post api/admin/addExercise
        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        [Route("api/admin/addExercise/")]
        public ActionResult<List<Exercise>> addExercise([FromBody] ExerciseDTO dto)
        {
            List<Exercise> allExcersises = new List<Exercise>();
            var exercise = dto.Exercise;
            try
            {
                adminService.AddExercise(exercise);
                allExcersises = packageService.GetExcersisesForPackage(exercise.LessonName);
            }
            catch (Exception e)
            {
                BadRequest(e);
            }
            return allExcersises;
        }

        // Post api/admin/updateExercise
        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        [Route("api/admin/updateExercise/")]
        public ActionResult<List<Exercise>> updateExercise([FromBody] ExerciseDTO dto)
        {
            var exercise = dto.Exercise;
            List<Exercise> allExcersises = new List<Exercise>();

            try
            {
                adminService.UpdateExercise(exercise);
                allExcersises = packageService.GetExcersisesForPackage(exercise.LessonName);
            }
            catch (Exception e)
            {
                BadRequest(e);
            }
            return allExcersises;
        }

        // Post api/admin/deleteExercise
        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        [Route("api/admin/deleteExercise/")]
        public ActionResult<List<Exercise>> deleteExercise([FromBody] ExerciseDTO dto)
        {
            var exercise = dto.Exercise;
            List<Exercise> allExcersises = new List<Exercise>();

            try
            {
                adminService.DeleteExercise(exercise);
                allExcersises = packageService.GetExcersisesForPackage(exercise.LessonName);
            }
            catch (Exception e)
            {
                BadRequest(e);
            }
            return allExcersises;
        }
    }
}