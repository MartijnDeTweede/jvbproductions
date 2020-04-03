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
        private readonly IResourceService packageService;

        public UserController(IUserService userService, IResourceService packageService)
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
            var userExists = userService.UserExists(userId);

            try
            {
                if(userExists)
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
            var user = new User();
            var lesson = new Package();
            try
            {
                if (userService.UserExists(dto.userId))
                {
                    user = userService.GetUser(dto.userId);
                }
                else
                {
                    BadRequest("User was not found.");
                }

            } catch(Exception e)
            {
                BadRequest(e);
            }

            if(packageService.PackageExists(dto.lessonName))
            {
                lesson = packageService.GetPackage(dto.lessonName);
            }
            else
            {
                BadRequest("Lesson was not found.");
            }

            if(user.Credits ==0 || lesson.Cost > user.Credits)
            {
                BadRequest("User has too little credits to buy this lesson.");
            }

            user = userService.UpdateUserCredit(dto.userId, user.Credits, -lesson.Cost);
            packageService.AddRecourceAccess(dto.userId, dto.lessonName);
            return user;
        }
    }
}
