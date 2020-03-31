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

        public AdminController(IAdminService adminService)
        {
            this.adminService = adminService;
        }

        // Post api/admin/addLesson
        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        [Route("api/admin/addPackage/")]
        public ActionResult<List<PackageModel>> addPackage([FromBody] PackageDTO dto)
        {
            var package = dto.Package;
            try
            {
                adminService.AddPackage(package);
            }
            catch (Exception e)
            {
                BadRequest(e);
            }
        
            // Return all lessons
            List<PackageModel> allLessons = new List<PackageModel>();
            var queryHelper = new QueryHelper();
            try
            {
                allLessons = queryHelper.getAllPackages();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
            return allLessons;
        }

        // Post api/admin/updateLesson
        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        [Route("api/admin/updatePackage/")]
        public ActionResult<List<PackageModel>> updatePackage([FromBody] PackageDTO dto)
        {

            var package = dto.Package;
            try
            {
                adminService.UpdatePackage(package);
            }
            catch (Exception e)
            {
                BadRequest(e);
            }

            // Return all lessons
            List<PackageModel> allLessons = new List<PackageModel>();
            var queryHelper = new QueryHelper();
            try
            {
                allLessons = queryHelper.getAllPackages();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
            return allLessons;
        }

        // Post api/admin/deleteLesson
        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        [Route("api/admin/deletePackage/")]
        public ActionResult<List<PackageModel>> deletePackage([FromBody] PackageDTO dto)
        {

            var lessonName = dto.Package.Song.Title;
            try
            {
                adminService.DeletePackageAsync(lessonName);
            }
            catch (Exception e)
            {
                BadRequest(e);
            }

            // Return all lessons
            List<PackageModel> allLessons = new List<PackageModel>();
            var queryHelper = new QueryHelper();
            try
            {
                allLessons = queryHelper.getAllPackages();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
            return allLessons;
        }

        // Post api/admin/addExercise
        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        [Route("api/admin/addExercise/")]
        public ActionResult<List<ExerciseModel>> addExercise([FromBody] ExerciseDTO dto)
        {
            var exercise = dto.Exercise;
            try
            {
                adminService.AddExercise(exercise);
            }
            catch (Exception e)
            {
                BadRequest(e);
            }

            // Return all lessons
            List<ExerciseModel> allExcersises = new List<ExerciseModel>();
            var queryHelper = new QueryHelper();
            try
            {
                allExcersises = queryHelper.getExcersisesForPackage(exercise.LessonName);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
            return allExcersises;
        }

        // Post api/admin/updateExercise
        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        [Route("api/admin/updateExercise/")]
        public ActionResult<List<ExerciseModel>> updateExercise([FromBody] ExerciseDTO dto)
        {
            var exercise = dto.Exercise;
            try
            {
                adminService.UpdateExercise(exercise);
            }
            catch (Exception e)
            {
                BadRequest(e);
            }

            // Return all lessons
            List<ExerciseModel> allExcersises = new List<ExerciseModel>();
            var queryHelper = new QueryHelper();
            try
            {
                allExcersises = queryHelper.getExcersisesForPackage(exercise.LessonName);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
            return allExcersises;
        }

        // Post api/admin/deleteExercise
        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        [Route("api/admin/deleteExercise/")]
        public ActionResult<List<ExerciseModel>> deleteExercise([FromBody] ExerciseDTO dto)
        {
            var exercise = dto.Exercise;
            try
            {
                adminService.DeleteExercise(exercise);
            }
            catch (Exception e)
            {
                BadRequest(e);
            }

            // Return all lessons
            List<ExerciseModel> allExcersises = new List<ExerciseModel>();
            var queryHelper = new QueryHelper();
            try
            {
                allExcersises = queryHelper.getExcersisesForPackage(exercise.LessonName);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
            return allExcersises;
        }
    }
}