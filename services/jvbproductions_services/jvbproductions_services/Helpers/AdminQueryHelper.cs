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

        public void AddPackage(PackageModel package)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connString))
                {

                    string insertQuery = String.Format("INSERT INTO Lessons (Artist, Title, Category, LessonType, Difficulty, Src, Image, AltText, Cost) VALUES (@artist, @title, @category, @lessonType, @difficulty, @src, @image, @altText, @cost)");
                    SqlCommand cmd = new SqlCommand(insertQuery, conn);
                    conn.Open();
                    cmd.Parameters.AddWithValue("@artist", package.Song.Artist);
                    cmd.Parameters.AddWithValue("@title", package.Song.Title);
                    cmd.Parameters.AddWithValue("@category", package.Category);
                    cmd.Parameters.AddWithValue("@lessonType", package.LessonType);
                    cmd.Parameters.AddWithValue("@difficulty", package.Difficulty);
                    cmd.Parameters.AddWithValue("@src", package.Src);
                    cmd.Parameters.AddWithValue("@image", package.Image);
                    cmd.Parameters.AddWithValue("@altText", package.AltText);
                    cmd.Parameters.AddWithValue("@cost", package.Cost);


                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void addExercise(ExerciseModel exercise)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connString))
                {

                    string insertQuery = String.Format("INSERT INTO Excersises (LessonName, ExcersiseName, Category, LessonType, Difficulty, Src, Image, AltText, Cost) VALUES (@lessonName, @exercisename, @category, @lessonType, @difficulty, @src, @image, @altText, @cost)");
                    SqlCommand cmd = new SqlCommand(insertQuery, conn);
                    conn.Open();
                    cmd.Parameters.AddWithValue("@lessonName", exercise.LessonName);
                    cmd.Parameters.AddWithValue("@exercisename", exercise.ExerciseName);
                    cmd.Parameters.AddWithValue("@category", exercise.Category);
                    cmd.Parameters.AddWithValue("@lessonType", exercise.LessonType);
                    cmd.Parameters.AddWithValue("@difficulty", exercise.Difficulty);
                    cmd.Parameters.AddWithValue("@src", exercise.Src);
                    cmd.Parameters.AddWithValue("@image", exercise.Image);
                    cmd.Parameters.AddWithValue("@altText", exercise.AltText);
                    cmd.Parameters.AddWithValue("@cost", exercise.Cost);

                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void UpdatePackage(PackageModel package)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connString))
                {

                    string insertQuery = String.Format("UPDATE Lessons set Artist = @artist, Title = @title, Category = @category, LessonType= @lessonType, Difficulty= @difficulty, Src=@src, Image=@image, AltText=@altText, Cost= @cost where Title = @title");
                    SqlCommand cmd = new SqlCommand(insertQuery, conn);
                    conn.Open();
                    cmd.Parameters.AddWithValue("@artist", package.Song.Artist);
                    cmd.Parameters.AddWithValue("@title", package.Song.Title);
                    cmd.Parameters.AddWithValue("@category", package.Category);
                    cmd.Parameters.AddWithValue("@lessonType", package.LessonType);
                    cmd.Parameters.AddWithValue("@difficulty", package.Difficulty);
                    cmd.Parameters.AddWithValue("@src", package.Src);
                    cmd.Parameters.AddWithValue("@image", package.Image);
                    cmd.Parameters.AddWithValue("@altText", package.AltText);
                    cmd.Parameters.AddWithValue("@cost", package.Cost);


                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void updateExercise(ExerciseModel exercise)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connString))
                {

                    string insertQuery = String.Format("UPDATE Excersises set LessonName = @lessonName, ExcersiseName = @exercisename, Category = @category, LessonType= @lessonType, Difficulty= @difficulty, Src=@src, Image=@image, AltText=@altText, Cost= @cost where Id = @id");
                    SqlCommand cmd = new SqlCommand(insertQuery, conn);
                    conn.Open();
                    cmd.Parameters.AddWithValue("@id", exercise.Id);
                    cmd.Parameters.AddWithValue("@lessonName", exercise.LessonName);
                    cmd.Parameters.AddWithValue("@exercisename", exercise.ExerciseName);
                    cmd.Parameters.AddWithValue("@category", exercise.Category);
                    cmd.Parameters.AddWithValue("@lessonType", exercise.LessonType);
                    cmd.Parameters.AddWithValue("@difficulty", exercise.Difficulty);
                    cmd.Parameters.AddWithValue("@src", exercise.Src);
                    cmd.Parameters.AddWithValue("@image", exercise.Image);
                    cmd.Parameters.AddWithValue("@altText", exercise.AltText);
                    cmd.Parameters.AddWithValue("@cost", exercise.Cost);


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

                    string query = String.Format("Delete from Lessons where Title = @title");
                    SqlCommand cmd = new SqlCommand(query, conn);
                    conn.Open();
                    cmd.Parameters.AddWithValue("@title", lessonName);

                    cmd.ExecuteNonQuery();
                    conn.Close();

                    string deleteExerciseQuery = String.Format("Delete from Excersises where LessonName = @lessonName");
                    cmd = new SqlCommand(deleteExerciseQuery, conn);
                    conn.Open();
                    cmd.Parameters.AddWithValue("@lessonName", lessonName);

                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void deleteExercise(ExerciseModel exercise)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connString))
                {

                    string insertQuery = String.Format("Delete from Excersises where Id = @id");
                    SqlCommand cmd = new SqlCommand(insertQuery, conn);
                    conn.Open();
                    cmd.Parameters.AddWithValue("@id", exercise.Id);


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
