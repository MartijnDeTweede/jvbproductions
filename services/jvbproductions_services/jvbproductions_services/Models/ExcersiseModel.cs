using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jvbproductions_services.Models
{
    public class ExerciseModel
    {
        public string LessonName { get; set; }
        public string ExerciseName { get; set; }
        public string Category { get; set; }
        public string LessonType { get; set; }
        public string Difficulty { get; set; }
        public string Src { get; set; }
        public int Cost { get; set; }
    }
}
