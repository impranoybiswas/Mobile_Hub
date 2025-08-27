// src/app/products/page.tsx
import React from "react";
import axios from "axios";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
};

// Fetch products using Axios
async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>("http://localhost:3000/api/products");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

const ProductsPage = async () => {
  const products = await fetchProducts();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow">
            <h2 className="font-semibold text-xl">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold mt-2">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
