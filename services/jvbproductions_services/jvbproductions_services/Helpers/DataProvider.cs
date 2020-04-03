using jvbproductions_services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jvbproductions_services.Helpers
{
    public class DataProvider : IDataProvider
    {
        public string Get()
        {
            return "Test data";
        }
    }
}
