using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace jvbproductions_services.Controllers
{
    [Route("api/[controller]")]
    public class LessonController : Controller
    {
        // GET api/RequestLessonAccess
        [HttpGet("{userId, lessonName}")]
        public ActionResult<string> RequestLessonAccess(string userId, string lessonName)
        {
            string notbought = "not bought:";
            var result = notbought+ userId + lessonName;
            return result;
        }
    }
}