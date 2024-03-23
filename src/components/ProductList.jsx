import { useEffect, useRef, useState } from "react";
import Product from "./Product";

const productsPerPage = 12;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${productsPerPage}&skip=${
          page * productsPerPage
        }`
      );
      const data = await response.json();
      if (data.products.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        setPage((prevPage) => prevPage + 1);
      }
    };

    function onIntersection(items) {
      const loaderItem = items[0];
      if (loaderItem.isIntersecting && hasMore) {
        fetchProducts();
      }
    }

    const observer = new IntersectionObserver(onIntersection);
    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [hasMore, page]);

  return (
    <div className="m-4">
      <div>Product List</div>
      <div className="flex justify-center items-center">
        <div className="grid gap-14 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {products.map((product) => (
            <Product key={product.id} productData={product} />
          ))}
        </div>
      </div>
      {hasMore && (
        <div className="text-2xl text-center mt-4 text-red-500" ref={loaderRef}>
          Loading more products......
        </div>
      )}
    </div>
  );
};

export default ProductList;
