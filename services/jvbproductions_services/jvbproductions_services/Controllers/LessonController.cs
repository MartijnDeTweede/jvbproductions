using System;
using System.Collections.Generic;
using jvbproductions_services.DTO;
using jvbproductions_services.Helpers;
using jvbproductions_services.Interfaces;
using jvbproductions_services.Models;
using Microsoft.AspNetCore.Mvc;

namespace jvbproductions_services.Controllers
{

    [ApiController]
    public class LessonController : Controller
    {

        private readonly IDataProvider dataProvider;

        public LessonController(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        //GET api/lesson/GetAllLessons
        [HttpGet]
        [Route("api/lesson/getAllPackages")]
        //public ActionResult<List<PackageModel>> GetAllPackages()
        public ActionResult<string> GetAllPackages()
        {
            var dataGot = dataProvider.Get();

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
            return dataGot;
        }

        //GET api/lesson/GetExcersisesForLesson
        [HttpGet]
        [Route("api/lesson/GetExcersisesForPackage/{packageName}")]
        public ActionResult<List<ExerciseModel>> GetExcersisesForPackage(string packageName)
        {
            List<ExerciseModel> allExcersises = new List<ExerciseModel>();
            var queryHelper = new QueryHelper();
            try
            {
                allExcersises = queryHelper.getExcersisesForPackage(packageName);
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
        public ActionResult<AccessModel> RequestResourceAccess(string userId, string lessonName)
        {
 
            var queryHelper = new QueryHelper();
            var lesson = queryHelper.getPackage(lessonName);
            AccessModel acces = new AccessModel();

            if(lesson.LessonType == "Free")
            {
                acces.Status = "Allowed";
                return acces;
            }

            try
            {
                acces = queryHelper.getRecourseAccess(userId, lessonName);

            }
            catch (Exception e)
            {
                acces.Status = "Error";
            }
            return acces;
        }

    }
}