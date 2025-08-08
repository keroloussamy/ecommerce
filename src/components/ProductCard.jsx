import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAdd }) => {
  const variantOptions = useMemo(() => {
    const cat = (product?.category || "").toLowerCase();
    if (cat.includes("men") || cat.includes("women")) return ["S", "M", "L", "XL"];
    if (cat.includes("jewel")) return ["6", "7", "8", "9"];
    if (cat.includes("electronic")) return ["64 GB", "128 GB", "256 GB"];
    return ["Standard"];
  }, [product?.category]);

  const [variant, setVariant] = useState(variantOptions[0]);

  const stockCount = product?.rating?.count ?? 0;
  const outOfStock = stockCount < 5;

  return (
    <div className="card h-100 shadow-sm border-0">
      <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
        <div className="ratio ratio-1x1 bg-light">
          <img
            src={product.image}
            alt={product.title}
            className="card-img-top p-3 object-fit-contain"
            loading="lazy"
            style={{ maxHeight: 300, objectFit: "contain" }}
          />
        </div>
      </Link>

      <div className="card-body d-flex flex-column">
        <h6 className="text-muted text-uppercase mb-1" style={{ fontSize: 12 }}>
          {product.category}
        </h6>
        <h5 className="card-title mb-2" title={product.title} style={{ lineHeight: 1.3 }}>
          {product.title.length > 60 ? product.title.slice(0, 57) + "..." : product.title}
        </h5>

        <div className="d-flex align-items-center justify-content-between mt-auto">
          <strong className="fs-5">${product.price}</strong>
          <div className="d-flex align-items-center gap-2">
            <select
              aria-label="Select variant"
              className="form-select form-select-sm"
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              style={{ minWidth: 110 }}
            >
              {variantOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="d-grid mt-3">
          {outOfStock ? (
            <button className="btn btn-secondary" disabled>
              Out of stock
            </button>
          ) : (
            <button
              className="btn btn-dark"
              onClick={() => onAdd({ ...product, selectedVariant: variant })}
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
