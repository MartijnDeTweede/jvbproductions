using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using jvbproductions_services.Models;
using Microsoft.AspNetCore.Mvc;

namespace jvbproductions_services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private string connString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=JvBProductions;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
        // GET api/user/getUserInfo
        [HttpGet("{userId}")]
        public ActionResult<UserModel> get(string userId)
        {
            var userModel = new UserModel();
            try
            {
                using (SqlConnection conn = new SqlConnection(connString))
                {
                    string selectQuery = @"SELECT * FROM Users Where userId=@userId";

                    SqlCommand cmd = new SqlCommand(selectQuery, conn);
                    cmd.Parameters.AddWithValue("@userId", userId);

                    conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    cmd.Parameters.Clear();

                    if (dr.HasRows)
                    {
                        while(dr.Read())
                        {
                            int credits; 
                            bool succes = Int32.TryParse(dr["Credits"].ToString(), out credits);

                            if(succes)
                            {
                                userModel.Credits = credits;
                                return userModel;
                            }
                            else
                            {
                                return BadRequest();
                            }

                        }
                    dr.Close();
                    }
                    else
                    {
                        dr.Close();
                        int defaultCredits = 100;
                        userModel = new UserModel();
                        userModel.Credits = defaultCredits;

                        string insertQuery = "INSERT INTO dbo.Users (userId, credits) VALUES (@userId, @credits)";
                        cmd.CommandText = insertQuery;
                        cmd.Parameters.AddWithValue("@userId", userId);
                        cmd.Parameters.AddWithValue("@credits", defaultCredits);

                        cmd.ExecuteNonQuery();
                    }
                    
                }
                return userModel;
            }


            catch (Exception e)
            {
                return BadRequest();
            }
        }

        // Post api/user/getUserInfo
        [HttpPost("{userId, lessonName}")]
        public ActionResult<UserModel> buyLesson(string userId, string lessonName)
        {
            var userModel = new UserModel();
            // Getcredit
            // Ophalen kosten
            
            // CheckCredit
            // UpdateCredit
            // Update LessonTable


            return userModel;
        }

    }
}