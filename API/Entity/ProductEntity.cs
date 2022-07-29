using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entity
{
    public class ProductEntity
    {
        public int ID { get; set; }
        public string ProductName {get; set;}
        public string Description { get; set; }
        public long Price { get; set; }
        public string PictureURL { get; set; }
        public string Type { get; set; }
        public string Brand { get; set; }
        public int QuantityInStock { get; set; }
    }
}