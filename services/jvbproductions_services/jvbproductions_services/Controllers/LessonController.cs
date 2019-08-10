using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using jvbproductions_services.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace jvbproductions_services.Controllers
{
    [Route("api/[controller]")]
    public class LessonController : Controller
    {
        // GET api/RequestLessonAccess
        [HttpGet("{userId, lessonName}")]
        public ActionResult<AccessModel> RequestLessonAccess(string userId, string lessonName)
        {
            AccessModel accessModel = new AccessModel();
            accessModel.Status = "NotBought";
            return accessModel;
        }
    }
}