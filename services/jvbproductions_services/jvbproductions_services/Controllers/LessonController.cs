using System;
using System.Collections.Generic;
using jvbproductions_services.DTO;
using jvbproductions_services.Helpers;
using jvbproductions_services.Models;
using Microsoft.AspNetCore.Mvc;

namespace jvbproductions_services.Controllers
{

    [ApiController]
    public class LessonController : Controller
    {
        //GET api/lesson/GetAllLessons
        [HttpGet]
        [Route("api/lesson/GetAllLessons")]
        public ActionResult<List<LessonModel>> GetAllLessons()
        {
            List<LessonModel> allLessons = new List<LessonModel>();
            var queryHelper = new QueryHelper();
            try
            {
                allLessons = queryHelper.getAllLessons();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
            return allLessons;
        }

        //GET api/lesson/GetExcersisesForLesson
        [HttpGet]
        [Route("api/lesson/GetExcersisesForLesson/{lessonName}")]
        public ActionResult<List<ExerciseModel>> GetExcersisesForLesson(string lessonName)
        {
            List<ExerciseModel> allExcersises = new List<ExerciseModel>();
            var queryHelper = new QueryHelper();
            try
            {
                allExcersises = queryHelper.getExcersisesForLesson(lessonName);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
            return allExcersises;
        }



        // GET api/lesson/RequestLessonAccess
        [HttpGet]
        [Route("api/lesson/RequestLessonAccess/{userId}/{lessonName}")]
        public ActionResult<AccessModel> RequestLessonAccess(string userId, string lessonName)
        {
 
            var queryHelper = new QueryHelper();
            var lesson = queryHelper.getLesson(lessonName);
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