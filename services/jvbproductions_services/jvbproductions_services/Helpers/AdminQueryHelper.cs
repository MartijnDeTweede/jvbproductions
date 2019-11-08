using jvbproductions_services.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace jvbproductions_services.Helpers
{
    public class AdminQueryHelper
    {
        private string connString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=JvBProductions;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        public void addLesson(PackageModel lesson)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connString))
                {

                    string insertQuery = String.Format("INSERT INTO Lessons (Artist, Title, Category, LessonType, Difficulty, Src, Image, AltText, Cost) VALUES (@artist, @title, @category, @lessonType, @difficulty, @src, @image, @altText, @cost)");
                    SqlCommand cmd = new SqlCommand(insertQuery, conn);
                    conn.Open();
                    cmd.Parameters.AddWithValue("@artist", lesson.Song.Artist);
                    cmd.Parameters.AddWithValue("@title", lesson.Song.Title);
                    cmd.Parameters.AddWithValue("@category", lesson.Category);
                    cmd.Parameters.AddWithValue("@lessonType", lesson.LessonType);
                    cmd.Parameters.AddWithValue("@difficulty", lesson.Difficulty);
                    cmd.Parameters.AddWithValue("@src", lesson.Src);
                    cmd.Parameters.AddWithValue("@image", lesson.Image);
                    cmd.Parameters.AddWithValue("@altText", lesson.AltText);
                    cmd.Parameters.AddWithValue("@cost", lesson.Cost);


                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void updateLesson(PackageModel lesson)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connString))
                {

                    string insertQuery = String.Format("UPDATE Lessons set Artist = @artist, Title = @title, Category = @category, LessonType= @lessonType, Difficulty= @difficulty, Src=@src, Image=@image, AltText=@altText, Cost= @cost where Title = @title");
                    SqlCommand cmd = new SqlCommand(insertQuery, conn);
                    conn.Open();
                    cmd.Parameters.AddWithValue("@artist", lesson.Song.Artist);
                    cmd.Parameters.AddWithValue("@title", lesson.Song.Title);
                    cmd.Parameters.AddWithValue("@category", lesson.Category);
                    cmd.Parameters.AddWithValue("@lessonType", lesson.LessonType);
                    cmd.Parameters.AddWithValue("@difficulty", lesson.Difficulty);
                    cmd.Parameters.AddWithValue("@src", lesson.Src);
                    cmd.Parameters.AddWithValue("@image", lesson.Image);
                    cmd.Parameters.AddWithValue("@altText", lesson.AltText);
                    cmd.Parameters.AddWithValue("@cost", lesson.Cost);


                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void deleteLesson(string lessonName)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connString))
                {

                    string insertQuery = String.Format("Delete from Lessons where Title = @title");
                    SqlCommand cmd = new SqlCommand(insertQuery, conn);
                    conn.Open();
                    cmd.Parameters.AddWithValue("@title", lessonName);


                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
