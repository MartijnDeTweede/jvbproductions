using System;
using System.Collections.Generic;
using jvbproductions_services.DTO;
using jvbproductions_services.Helpers;
using jvbproductions_services.Interfaces;
using jvbproductions_services.Models;
using jvbproductions_services.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace jvbproductions_services.Controllers
{

    [ApiController]
    public class LessonController : Controller
    {
        private readonly IPackageService packageService;

        public LessonController(IPackageService packageService)
        {
            this.packageService = packageService;
        }

        //GET api/lesson/GetAllLessons
        [HttpGet]
        [Route("api/lesson/getAllPackages")]
        //public ActionResult<List<PackageModel>> GetAllPackages()
        public ActionResult<List<Package>> GetAllPackages()
        {
            List<Package> allLessons = new List<Package>();
            try
            {
                allLessons = packageService.GetAllPackages();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
            return allLessons;
        }

        //GET api/lesson/GetExcersisesForLesson
        [HttpGet]
        [Route("api/lesson/GetExcersisesForPackage/{packageName}")]
        public ActionResult<List<Exercise>> GetExcersisesForPackage(string packageName)
        {
            List<Exercise> allExcersises = new List<Exercise>();
            try
            {
                allExcersises = packageService.GetExcersisesForPackage(packageName);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
            return allExcersises;
        }



        // GET api/lesson/RequestLessonAccess
        [HttpGet]
        [Route("api/lesson/RequestResourceAccess/{userId}/{lessonName}")]
        public ActionResult<AccessViewModel> RequestResourceAccess(string userId, string lessonName)
        {
            var lesson = packageService.GetPackage(lessonName);
            AccessViewModel accesViewModel = new AccessViewModel();

            if(lesson.LessonType == "Free")
            {
                accesViewModel.Status = "Allowed";
            }

            try
            {
                var acces = packageService.GetRecourseAccess(userId, lessonName);

                if(acces != null)
                {
                    accesViewModel.Status = "Not bought";
                } else
                {
                    accesViewModel.Status = "Allowed";
                }

            }
            catch (Exception e)
            {
                accesViewModel.Status = "Error";
            }
            return accesViewModel;
        }

    }
}