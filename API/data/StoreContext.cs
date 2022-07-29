using API.Entity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<ProductEntity> Product { get; set; }
        public DbSet<Basket> Basket { get; set; }
    }
}