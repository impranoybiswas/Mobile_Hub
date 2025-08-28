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

// Fetch a single product by id
async function fetchProduct(id: string): Promise<Product | null> {
  try {
    const response = await axios.get<Product>(`${process.env.NEXTAUTH_URL}/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

interface ProductPageProps {
  params: { id: string };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await fetchProduct(params.id);

  if (!product) {
    return <div className="p-8 text-red-500">Product not found.</div>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Image src={product.thumbnail} alt={product.name} className="w-full h-64 object-cover rounded mb-6" />
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.brand}</p>
      <p className="text-xl font-bold mb-4">BDT {product.price}</p>
      <p className="text-gray-700">{product.description}</p>
    </div>
  );
};

export default ProductPage;
