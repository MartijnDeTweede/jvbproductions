using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jvbproductions_services.Models
{
    public class Song
    {
        public string Artist { get; set; }
        public string Title { get; set; }

        public Song(string artist, string title)
        {
            Artist = artist;
            Title = title;
        }
    }

    public class LessonModel
    {
        public Song Song {get; set;}
        public string Category { get; set; }
        public string LessonType { get; set; }
        public string Difficulty { get; set; }
        public string Src { get; set; }
        public int Cost { get; set; }
    }
}
