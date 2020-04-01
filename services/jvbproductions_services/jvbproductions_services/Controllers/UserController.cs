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
using jvbproductions_services.Interfaces;

namespace jvbproductions_services.Controllers
{
    [ApiController]
    public class UserController : Controller
    {

        private readonly IUserService userService;
        private readonly IPackageService packageService;

        public UserController(IUserService userService, IPackageService packageService)
        {
            this.userService = userService;
            this.packageService = packageService;
        }

        // GET api/user/getUserInfo
        [HttpGet("{userId}")]
        [Route("api/user/getUser/{userId}")]
        public ActionResult<User> getUser(string userId)
        {
            var userModel = new User();
            try
            {
                if(userService.UserExists(userId))
                {
                    userModel = userService.GetUser(userId);
                } else
                {
                    userModel = userService.CreateNewUser(userId);
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
        [Route("api/user/buyResource/")]
        public ActionResult<User> buyResource([FromBody] UserLessonDTO dto)
        {
            string userId = dto.userId;
            string lessonName = dto.lessonName;

            var user = new User();
            var lesson = new Package();
            try
            {
                if (userService.UserExists(userId))
                {
                    user = userService.GetUser(userId);
                }
                else
                {
                    BadRequest("User was not found.");
                }

            } catch(Exception e)
            {
                BadRequest(e);
            }

            if(packageService.PackageExists(lessonName))
            {
                lesson = packageService.GetPackage(lessonName);
            }
            else
            {
                BadRequest("Lesson was not found.");
            }

            if(user.Credits ==0 || lesson.Cost > user.Credits)
            {
                BadRequest("User has too little credits to buy this lesson.");
            }

            user = userService.UpdateUserCredit(userId, user.Credits, -lesson.Cost);
            packageService.AddRecourceAccess(userId, lessonName);
            return user;
        }
    }
}
