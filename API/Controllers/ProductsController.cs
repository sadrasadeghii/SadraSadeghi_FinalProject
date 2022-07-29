using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseAPIController
    {
        private readonly StoreContext context;
        public ProductsController(StoreContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductEntity>>> getProducts()
        {
            return await context.Product.ToListAsync();

        }
        [HttpGet("server-error")]
        public ProblemDetails GetServerError()
        {
            return new ProblemDetails { Title = "این خطای سمت سرور است", Status = 500 };
            // return new Exception("این خطای سمت سرور است");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductEntity>> getProduct(int id)
        {
            var product = await context.Product.FindAsync(id);
            if (product == null)
            {
                return NotFound(new ProblemDetails
                {
                    Title = "محصولی یافت نشد",
                    Status = 500
                });
            }
            return product;
        }
    }
}