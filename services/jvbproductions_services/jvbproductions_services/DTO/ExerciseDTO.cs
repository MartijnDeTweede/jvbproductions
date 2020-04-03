using jvbproductions_services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jvbproductions_services.DTO
{
    public class ExerciseDTO
    {
        public string UserId { get; set; }
        public Exercise Exercise { get; set; }
    }
}
