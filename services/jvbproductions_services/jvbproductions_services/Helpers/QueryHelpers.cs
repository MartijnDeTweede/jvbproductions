using jvbproductions_services.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace jvbproductions_services.Helpers
{
    public class QueryHelper
    {
        private string connString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=JvBProductions;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        public bool userExists(string userId)
        {
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
                    var rows = dr.HasRows;
                    conn.Close();
                    return rows;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public User getUser(string userId)
        {
            var userModel = new User();
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
                        while (dr.Read())
                        {
                            bool isAdmin;
                            bool succesIsAdminParse = bool.TryParse(dr["isAdmin"].ToString(), out isAdmin);

                            userModel.isAdmin = succesIsAdminParse ? isAdmin : false;

                            int credits;
                            bool succes = Int32.TryParse(dr["Credits"].ToString(), out credits);

                            if (succes)
                            {
                                userModel.Credits = credits;
                                return userModel;
                            }
                            else
                            {
                                dr.Close();
                                throw new Exception("Could not parse credits");
                            }

                        }
                        dr.Close();
                    }
                }
                return userModel;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public User updateUserCredit(string userId, int currentCredit, int creditMutation)
        {
            var userModel = new User();
            int newCredit = currentCredit + creditMutation;
            userModel.Credits = newCredit;

            try
            {
                using (SqlConnection conn = new SqlConnection(connString))
                {

                    string insertQuery = "UPDATE dbo.Users SET credits = @credits Where userId=@userId";
                    SqlCommand cmd = new SqlCommand(insertQuery, conn);
                    cmd.Parameters.AddWithValue("@userId", userId);
                    cmd.Parameters.AddWithValue("@credits", newCredit);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();

                }
            }
            catch (Exception e)
            {
                throw e;
            }

            return userModel;
        }

        public User createNewUser(string userId)
        {
            var userModel = new User();
            try
            {
                using (SqlConnection conn = new SqlConnection(connString))
                {
                    int defaultCredits = 100;
                    userModel.Credits = defaultCredits;

                    string insertQuery = "INSERT INTO dbo.Users (userId, credits) VALUES (@userId, @credits)";
                    SqlCommand cmd = new SqlCommand(insertQuery, conn);
                    cmd.Parameters.AddWithValue("@userId", userId);
                    cmd.Parameters.AddWithValue("@credits", 100);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                    return userModel;

                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool packageExists(string packageName)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connString))
                {
                    string selectQuery = @"SELECT * FROM Lessons Where Title=@Title";

                    SqlCommand cmd = new SqlCommand(selectQuery, conn);
                    cmd.Parameters.AddWithValue("@Title", packageName);

                    conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    cmd.Parameters.Clear();

                    return dr.HasRows;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Package getPackage(string packageName)
        {
            var lesson = new Package();
            try
            {

                using (SqlConnection conn = new SqlConnection(connString))
                {
                    string query = @"SELECT * FROM Lessons where Title=@title";
                    SqlCommand cmd = new SqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@title", packageName);
                    conn.Open();

                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {


                        lesson.Song = new Song() { Artist = dr["Artist"].ToString(), Title = dr["Title"].ToString() };
                        lesson.Category = dr["Category"].ToString();

                        int credits;
                        bool succes = Int32.TryParse(dr["Cost"].ToString(), out credits);
                        lesson.Cost = succes ? credits : 0;
                        lesson.Difficulty = dr["Difficulty"].ToString();
                        lesson.LessonType = dr["LessonType"].ToString();
                        lesson.Src = dr["Src"].ToString();
                    }
                    dr.Close();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            return lesson;
        }

        public void addRecourceAccess(string userId, string resource)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connString))
                {

                    string insertQuery = String.Format("INSERT INTO Access (userId, resource) VALUES (@userId, @resource)");
                    SqlCommand cmd = new SqlCommand(insertQuery, conn);
                    conn.Open();
                    cmd.Parameters.AddWithValue("@userId", userId);
                    cmd.Parameters.AddWithValue("@resource", resource);
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        public Access getRecourseAccess(string userId, string resource)
        {
            Access access = new Access();

            try
            {
                using (SqlConnection conn = new SqlConnection(connString))
                {

                    string query = String.Format("select * from Access where userId=@userId AND resource=@resource");
                    SqlCommand cmd = new SqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@userId", userId);
                    cmd.Parameters.AddWithValue("@resource", resource);

                    conn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    if (dr.HasRows)
                    {
                        access.Status = "Allowed";
                    }
                    else
                    {
                        access.Status = "NotBought";
                    }
                    dr.Close();
                }

            }
            catch (Exception e)
            {
                access.Status = "Error";
            }
            return access;
        }

        public List<Package> getAllPackages ()
        {
            List<Package> allPackages = new List<Package>();
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
                        var newPackage = new Package();
                        newPackage.Song = new Song() { Artist = dr["Artist"].ToString(), Title = dr["Title"].ToString() };
                        newPackage.Category = dr["Category"].ToString();

                        int credits;
                        bool succes = Int32.TryParse(dr["Cost"].ToString(), out credits);
                        newPackage.Cost = succes ? credits : 0;

                        newPackage.Difficulty = dr["Difficulty"].ToString();
                        newPackage.LessonType = dr["LessonType"].ToString();
                        newPackage.Image = dr["Image"].ToString();
                        newPackage.AltText = dr["AltText"].ToString();
                        newPackage.Src = dr["Src"].ToString();

                        int id;
                        bool idSuccess = Int32.TryParse(dr["Id"].ToString(), out id);
                        newPackage.Id = idSuccess ? id : 0;
                        allPackages.Add(newPackage);
                    }
                    dr.Close();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        return allPackages;
        }

        public List<Exercise> getExcersisesForPackage(string packageName) {
            List<Exercise> allExcersises = new List<Exercise>();

            try
            {
                using (SqlConnection conn = new SqlConnection(connString))
                {
                    string query = @"SELECT * FROM Excersises where LessonName=@lessonName";

                    SqlCommand cmd = new SqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@lessonName", packageName);
                    conn.Open();

                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        var newExcersise = new Exercise();

                        newExcersise.LessonName = packageName;
                        newExcersise.ExerciseName = dr["ExcersiseName"].ToString();
                        newExcersise.Category = dr["Category"].ToString();

                        newExcersise.Difficulty = dr["Difficulty"].ToString();
                        newExcersise.LessonType = dr["LessonType"].ToString();
                        newExcersise.Image = dr["Image"].ToString();
                        newExcersise.AltText = dr["AltText"].ToString();
                        newExcersise.Src = dr["Src"].ToString();

                        int id;
                        bool idSuccess = Int32.TryParse(dr["Id"].ToString(), out id);
                        newExcersise.Id = idSuccess ? id : 0;

                        allExcersises.Add(newExcersise);
                    }
                    dr.Close();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            return allExcersises;
        }

    }
}
