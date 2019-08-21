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


        // GET api/lesson/RequestLessonAccess
        [HttpGet]
        [Route("api/lesson/RequestLessonAccess/{userId}/{lessonName}")]
        public ActionResult<AccessModel> RequestLessonAccess(string userId, string lessonName)
        {
 
            AccessModel acces = new AccessModel();
            var queryHelper = new QueryHelper();
            try
            {
                acces = queryHelper.getLessonAccess(userId, lessonName);

            }
            catch (Exception e)
            {
                acces.Status = "Error";
            }
            return acces;
        }

    }
}