import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";
import ProductCard from "./ProductCard";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();
  const addProduct = (product) => dispatch(addCart(product));

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      if (componentMounted) {
        const cloned = await response.clone().json();
        setData(cloned);
        setFilter(cloned);
        setLoading(false);
      }
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);

  const filterProduct = (cat) => {
    if (!cat) return setFilter(data);
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const Loading = () => (
    <>
      <div className="col-12 py-5 text-center">
        <Skeleton height={40} width={560} />
      </div>
      {[...Array(6)].map((_, i) => (
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4" key={i}>
          <Skeleton height={360} />
        </div>
      ))}
    </>
  );

  const ShowProducts = () => (
    <>
      <div className="buttons text-center py-4">
        {[
          { label: "All", val: null },
          { label: "Men's Clothing", val: "men's clothing" },
          { label: "Women's Clothing", val: "women's clothing" },
          { label: "Jewelery", val: "jewelery" },
          { label: "Electronics", val: "electronics" },
        ].map((b) => (
          <button
            key={b.label}
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct(b.val)}
          >
            {b.label}
          </button>
        ))}
      </div>

      {filter.map((product) => (
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4" key={product.id}>
          <ProductCard
            product={product}
            onAdd={(p) => {
              toast.success("Added to cart");
              addProduct(p);
            }}
          />
        </div>
      ))}
    </>
  );

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-6 text-center">Latest Products</h2>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Products;
