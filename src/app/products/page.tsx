// src/app/products/page.tsx
import React from "react";
import axios from "axios";
import Image from "next/image";

type Product = {
  _id: string;
  brand: string;
  name: string;
  thumbnail: string;
  price: number;
  description: string;
};


// Fetch products using Axios
async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>(`${process.env.NEXTAUTH_URL}/api/products`);
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
    <Image src={product.thumbnail} alt={product.name} className="w-full h-48 object-cover rounded" />
    <h2 className="font-semibold text-xl mt-2">{product.name}</h2>
    <p className="font-bold mt-1">BDT {product.price}</p>
    <a
      href={`/products/${product._id}`}
      className="mt-3 inline-block text-blue-500 hover:underline"
    >
      View Details
    </a>
  </div>
))}
      </div>
    </div>
  );
};

export default ProductsPage;
