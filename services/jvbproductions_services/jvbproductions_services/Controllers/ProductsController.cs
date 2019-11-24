using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using jvbproductions_services.Helpers;
using jvbproductions_services.Models;
using Microsoft.AspNetCore.Mvc;

namespace jvbproductions_services.Controllers
{
    public class ProductsController : Controller
    {
        [HttpGet]
        [Route("api/products/getProductsForCategory/{category}")]
        public ActionResult<List<ProductModel>> getProductsForCategory(string category)
        {
            var products = new List<ProductModel>();
            var productsQueryHelper = new ProductsQueryHelper();

            try
            {
                products = productsQueryHelper.getProductsByCategory(category);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
            return products;
        }
    }
}