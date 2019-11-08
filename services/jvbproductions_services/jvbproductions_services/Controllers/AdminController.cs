using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using jvbproductions_services.DTO;
using jvbproductions_services.Helpers;
using jvbproductions_services.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace jvbproductions_services.Controllers
{
    public class AdminController : Controller
    {


        // Post api/admin/addLesson
        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        [Route("api/admin/addLesson/")]
        public ActionResult<List<PackageModel>> addLesson([FromBody] PackageDTO dto)
        {
            var package = dto.Package;
            var adminQuryHelper = new AdminQueryHelper();
            try
            {
                adminQuryHelper.addLesson(package);
            }
            catch (Exception e)
            {
                BadRequest(e);
            }
        
            // Return all lessons
            List<PackageModel> allLessons = new List<PackageModel>();
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

        // Post api/admin/updateLesson
        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        [Route("api/admin/updateLesson/")]
        public ActionResult<List<PackageModel>> updateLesson([FromBody] PackageDTO dto)
        {

            var package = dto.Package;
            var adminQuryHelper = new AdminQueryHelper();
            try
            {
                adminQuryHelper.updateLesson(package);
            }
            catch (Exception e)
            {
                BadRequest(e);
            }

            // Return all lessons
            List<PackageModel> allLessons = new List<PackageModel>();
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

        // Post api/admin/deleteLesson
        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        [Route("api/admin/deleteLesson/")]
        public ActionResult<List<PackageModel>> deleteLesson([FromBody] PackageDTO dto)
        {

            var lessonName = dto.Package.Song.Title;
            var adminQuryHelper = new AdminQueryHelper();
            try
            {
                adminQuryHelper.deleteLesson(lessonName);
            }
            catch (Exception e)
            {
                BadRequest(e);
            }

            // Return all lessons
            List<PackageModel> allLessons = new List<PackageModel>();
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
    }
}