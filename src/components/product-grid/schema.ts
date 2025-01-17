type Category =  {
    category_id: string;
    name: string;
    created_at: string;
}
  
type Collection = {
collection_id: string;
name: string;
description: string;
image_url: string;
created_at: string;
}

export type Image = {
color: string;
image_url: string;
}

type InventoryItem = {
sku: string;
color: string;
size: string | null;
list_price: number;
discount: number | null;
discount_percentage: number | null;
sale_price: number;
sold: number;
stock: number;
}

type PriceRange = {
highest: number;
lowest: number;
}

export type InfoItem = {
    title: string;
    description: string[];
}

export type Products = {
product_id: string;
name: string;
description: string;
category: Category;
collection: Collection;
created_at: string;
colors: string[];
images: Image[];
inventory: InventoryItem[];
priceRange: PriceRange;
rating: number;
reviews: number;
sizes: string[];
sold: number;
}

export type ProductDetailSchema = {
    product_id: string;
    name: string;
    description: string;
    category: Category;
    collection: Collection;
    created_at: string;
    colors: string[];
    images: Image[];
    info: InfoItem[];
    inventory: InventoryItem[];
    priceRange: PriceRange;
    rating: number;
    reviews: number;
    sizes: string[];
    sold: number;
    }

export type ColorToCodes = 'red' | 'green' | 'blue' | 'yellow' | 'black' | 'white' | 'purple' | 'orange' | 'pink' | 'brown' | 'gray' | 'cyan' | 'magenta' | 'lime' | 'navy' | 'teal' | 'maroon' | 'olive' | 'silver' | 'gold' | 'beige'

  
  