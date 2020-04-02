using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jvbproductions_services.Models
{
    public class Exercise: Resource
    {
        public string LessonName { get; set; }
        public string ExerciseName { get; set; }
    }
}
