using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using jvbproductions_services.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace jvbproductions_services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonController : Controller
    {
        private string connString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=JvBProductions;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
        //GET api/lesson/GetAllLessons
       [HttpGet]
        public ActionResult<List<LessonModel>> GetAllLessons()
        {
            List<LessonModel> allLessons = new List<LessonModel>();
            try
            {
                using (SqlConnection conn = new SqlConnection(connString))
                {
                    string query = @"SELECT * FROM Lessons";

                    SqlCommand cmd = new SqlCommand(query, conn);
                    conn.Open();

                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        var newLesson = new LessonModel();

                        newLesson.Song = new Song(dr["Artist"].ToString(), dr["Title"].ToString());
                        newLesson.Category = dr["Category"].ToString();

                        newLesson.Difficulty = dr["Difficulty"].ToString();
                        newLesson.LessonType = dr["LessonType"].ToString();
                        newLesson.Src = dr["Src"].ToString();

                        allLessons.Add(newLesson);
                    }
                    dr.Close();
                }
            }
            catch (Exception e)
            {
                return BadRequest();
            }
            return allLessons;

        }


        // GET api/lesson/RequestLessonAccess
        [HttpGet("{userId, lessonName}")]
        public ActionResult<AccessModel> RequestLessonAccess(string userId, string lessonName)
        {
            AccessModel accessModel = new AccessModel();

            try
            {
                using (SqlConnection conn = new SqlConnection(connString))
                {

                    string query = String.Format("select * from [{0}] where userId=@userId", lessonName);
                    SqlCommand cmd = new SqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@userId", userId);

                    conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    if (dr.HasRows)
                    {
                        accessModel.Status = "Allowed";
                    }
                    else
                    {
                        accessModel.Status = "NotBought";
                    }
                    dr.Close();
                }

            }
            catch (Exception e)
            {
                accessModel.Status = "Error";
            }
            return accessModel;
        }

    }
}