using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entity
{
    [Table("BasketItems")]
    public class BasketItems
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        //Navigation properties
        public int ProductId { get; set; }
        public ProductEntity Product { get; set; }
        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}