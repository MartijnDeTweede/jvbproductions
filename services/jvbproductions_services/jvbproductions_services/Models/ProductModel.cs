﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jvbproductions_services.Models
{
    public class ProductModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string ProductCode { get; set; }
        public string Description { get; set; }
        public string ActionText { get; set; }
        public decimal Price { get; set; }
    }
}
