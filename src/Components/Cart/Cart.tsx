import { Product } from "../../Containers/product"
import React from 'react';
import './Cart.css';
import { Wrapper } from "../Wrapper/Wrapper";

export const Cart: React.FC<{
  selectedProduct?: Product;
  clearCart: () => void;
}> = ({selectedProduct, clearCart}) => {
  return(
    <Wrapper centralizeContent>
      <div className="cart">
        {
          selectedProduct ?
              <div>
                <div>Je hebt gekozen voor: {selectedProduct.name}</div>
              </div>
          :
          <div>Je hebt nog geen producten in je mandje</div>
        }
      </div>
      <div onClick={clearCart} className="cart__clearButton">Mandje legen</div>
    </Wrapper>
  )
}