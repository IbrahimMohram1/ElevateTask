"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearch] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProduct();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <div className="container">
      <div className="w-1/2 m-auto my-4">
        <form>
          <input
            type="search"
            id="search"
            className="w-full p-3 text-sm text-gray-900 rounded-lg dark:placeholder-gray-400 border border-black"
            placeholder="Search Your Products Here"
            value={searchTerm}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      {filteredProducts.length > 0 ? (
        <div className="flex flex-wrap justify-center items-center">
          {filteredProducts.map((product) => (
            <Link
              href={`product/${product.id}`}
              key={product.id}
              className="relative md:w-1/4 w-full text-center m-auto my-3 h-[200px] overflow-hidden flex justify-center items-center flex-wrap"
            >
              <Image
                className="m-auto"
                width={200}
                height={100}
                src={product.image}
                alt={product.category}
              />
              <div className="overlay absolute bg-[#00000080] w-[200px] h-full opacity-0 hover:opacity-100 transition-opacity duration-1000 flex items-center justify-center flex-wrap p-1 flex-col gap-y-2">
                <h2 className="text-xs font-bold">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h2>
                <p className="text-sm">{product.price}</p>
                <p className="text-sm">
                  {product.description.split(" ").slice(0, 5).join(" ")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
