using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jvbproductions_services.Models
{
    public class User
    {
        public string Id { get; set; }
        public string FireBaseId { get; set; }
        public int Credits { get; set; }
        public bool isAdmin { get; set; }
    }
}
