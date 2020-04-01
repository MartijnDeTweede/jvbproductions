using jvbproductions_services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jvbproductions_services.DTO
{
    public class PackageDTO
    {
        public string UserId { get; set; }
        public Package Package { get; set; }
    }
}
