using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using jvbproductions_services.Models;
using jvbproductions_services.Helpers;
using Microsoft.AspNetCore.Mvc;
using jvbproductions_services.DTO;
using Microsoft.AspNetCore.Cors;

namespace jvbproductions_services.Controllers
{
    [ApiController]
    public class UserController : Controller
    {
        // GET api/user/getUserInfo
        [HttpGet("{userId}")]
        [Route("api/user/getUser/{userId}")]
        public ActionResult<UserModel> getUser(string userId)
        {
            var userModel = new UserModel();
            var queryHelper = new QueryHelper();
            try
            {
                if(queryHelper.userExists(userId))
                {
                    userModel = queryHelper.getUser(userId);
                } else
                {
                    userModel = queryHelper.createNewUser(userId);
                }

            } catch(Exception e)
            {
                BadRequest(e);
            }
            return userModel;
        }

        // Post api/user/getUserInfo
        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        [Route("api/user/buyLesson/")]
        public ActionResult<UserModel> buyLesson([FromBody] UserLessonDTO dto)
        {
            string userId = dto.userId;
            string lessonName = dto.lessonName;

            var user = new UserModel();
            var lesson = new LessonModel();
            var queryHelper = new QueryHelper();
            try
            {
                if (queryHelper.userExists(userId))
                {
                    user = queryHelper.getUser(userId);
                }
                else
                {
                    BadRequest("User was not found.");
                }

            } catch(Exception e)
            {
                BadRequest(e);
            }

            if(queryHelper.lessonExists(lessonName))
            {
                lesson = queryHelper.getLesson(lessonName);
            }
            else
            {
                BadRequest("Lesson was not found.");
            }

            if(user.Credits ==0 || lesson.Cost > user.Credits)
            {
                BadRequest("User has too little credits to buy this lesson.");
            }

            user = queryHelper.updateUserCredit(userId, user.Credits, -lesson.Cost);
            queryHelper.addLessonAccess(userId, lessonName);
            return user;
        }
    }
}
