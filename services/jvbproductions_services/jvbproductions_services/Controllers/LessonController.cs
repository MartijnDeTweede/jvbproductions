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
                return BadRequest(e);
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
                return BadRequest(e);
            }
            return allExcersises;
        }



        // GET api/lesson/RequestLessonAccess
        [HttpGet]
        [Route("api/lesson/RequestResourceAccess/{userId}/{recourceName}")]
        public ActionResult<AccessViewModel> RequestResourceAccess(string userId, string recourceName)
        {
            var package = packageService.GetPackage(recourceName);

            var exercise = packageService.GetExersise(recourceName);
            AccessViewModel accesViewModel = new AccessViewModel();

            if(package?.LessonType == "Free" || exercise?.LessonType == "Free")
            {
                accesViewModel.Status = "Allowed";
                return accesViewModel;
            }

            try
            {
                var acces = packageService.GetRecourseAccess(userId, recourceName);

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