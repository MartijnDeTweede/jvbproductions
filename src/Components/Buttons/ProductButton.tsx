import React from 'react';
import { Product } from "../../Containers/product";
import './ProductButton.css';

export const ProductButton: React.FC<{
  product: Product;
  onClick: () => void
}> = ({
  product,
  onClick,
}) => {
  return (
    <div className="product-button" onClick={() => onClick()}>
      <div className="product-button__name">
      {product.name}
      </div>
      <div className="product-button__price">
      € {product.price.toFixed(2)}
      </div>
    </div>
  )
}