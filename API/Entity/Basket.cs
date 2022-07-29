namespace API.Entity
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItems> Items { get; set; } = new();

        //Functions 

        public void addItem(ProductEntity product, int quantity)
        {
            if (Items.All(item => item.ProductId != product.ID))
            {
                Items.Add(new BasketItems { Product = product, Quantity = quantity });
            }

            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.ID);
            if (existingItem != null) existingItem.Quantity += quantity;
        }

        public void removeItem(int productId, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if (item == null) return;
            item.Quantity -= quantity;
            if (item.Quantity == 0 || item.Quantity < 0) Items.Remove(item);
        }
    }
}