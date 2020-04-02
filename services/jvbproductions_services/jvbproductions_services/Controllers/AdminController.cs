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
        private readonly IUserService userService;

        public AdminController(IAdminService adminService, IPackageService packageService, IUserService userService)
        {
            this.adminService = adminService;
            this.packageService = packageService;
            this.userService = userService;
        }

        // Post api/admin/addLesson
        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        [Route("api/admin/addPackage/")]
        public ActionResult<List<Package>> addPackage([FromBody] PackageDTO dto)
        {
            if(!userService.UserIsAdmin(dto.UserId)) { return Unauthorized(); }
            List<Package> allLessons = new List<Package>();

            try
            {
                adminService.AddPackage(dto.Package);
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
            if (!userService.UserIsAdmin(dto.UserId)) { return Unauthorized(); }

            List<Package> allLessons = new List<Package>();
            try
            {
                adminService.UpdatePackage(dto.Package);
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
            if (!userService.UserIsAdmin(dto.UserId)) { return Unauthorized(); }

            List<Package> allLessons = new List<Package>();
            try
            {
                adminService.DeletePackageAsync(dto.Package.Song.Title);
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
            if (!userService.UserIsAdmin(dto.UserId)) { return Unauthorized(); }
            List<Exercise> allExcersises = new List<Exercise>();
            try
            {
                adminService.AddExercise(dto.Exercise);
                allExcersises = packageService.GetExcersisesForPackage(dto.Exercise.LessonName);
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
            if (!userService.UserIsAdmin(dto.UserId)) { return Unauthorized(); }
            List<Exercise> allExcersises = new List<Exercise>();

            try
            {
                adminService.UpdateExercise(dto.Exercise);
                allExcersises = packageService.GetExcersisesForPackage(dto.Exercise.LessonName);
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
            if (!userService.UserIsAdmin(dto.UserId)) { return Unauthorized(); }
            List<Exercise> allExcersises = new List<Exercise>();

            try
            {
                adminService.DeleteExercise(dto.Exercise);
                allExcersises = packageService.GetExcersisesForPackage(dto.Exercise.LessonName);
            }
            catch (Exception e)
            {
                BadRequest(e);
            }
            return allExcersises;
        }
    }
}