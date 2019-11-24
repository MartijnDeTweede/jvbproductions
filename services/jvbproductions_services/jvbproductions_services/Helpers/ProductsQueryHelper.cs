using jvbproductions_services.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace jvbproductions_services.Helpers
{
    public class ProductsQueryHelper
    {
        private string connString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=JvBProductions;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        public List<ProductModel> getProductsByCategory(string category)
        {
            List<ProductModel> products = new List<ProductModel>();
            try
            {
                using (SqlConnection conn = new SqlConnection(connString))
                {
                    string query = @"SELECT * FROM Products where Category=@category";

                    SqlCommand cmd = new SqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@category", category);
                    conn.Open();

                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        var newProduct = new ProductModel();
                        newProduct.Name = dr["Name"].ToString();
                        newProduct.Category = dr["Category"].ToString();

                        newProduct.ProductCode = dr["ProductCode"].ToString();
                        newProduct.Description = dr["Description"].ToString();
                        newProduct.ActionText = dr["ActionText"].ToString();

                        decimal price;
                        bool succes = Decimal.TryParse(dr["Price"].ToString(), out price);
                        newProduct.Price = succes ? price : 0;

                        int id;
                        bool idSuccess = Int32.TryParse(dr["Id"].ToString(), out id);
                        newProduct.Id = idSuccess ? id : 0;
                        products.Add(newProduct);
                    }
                    dr.Close();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            return products;
        }
    }
}
