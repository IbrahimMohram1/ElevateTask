import Loading from "@/app/loading";
import Image from "next/image";
import React from "react";
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
};
export default async function ProductDetails({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) {
    return <Loading />;
  }
  const product: Product = await response.json();

  return (
    <>
      <div className="container">
        <div className="flex justify-center items-center flex-wrap my-5">
          <div className="w-full md:w-1/2">
            <Image
              className="object-cover"
              alt={product.title}
              width={300}
              height={100}
              src={product.image}
            ></Image>
          </div>
          <div className="w-full md:w-1/2">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p> Category: {product.category}</p>
          </div>
        </div>
      </div>
    </>
  );
}
