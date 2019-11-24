import React, {useState, useEffect } from 'react';
import { Product } from './product';
import { getProductsByCategory } from '../Helpers/ApiHelpers';

enum WebshopState {
  SelectProduct = "SelectProduct",
  Error = "Error"
}

export const WebshopContainer: React.FC<{
  user: firebase.User | undefined
  signInWithGoogle: () => void,
}> = () => {

  const [creditProducts, setCreditProducts] = useState<Product[]>([]);
  const [webshopState, setWebshopState] = useState<WebshopState>(WebshopState.SelectProduct);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() =>{
    getProductsByCategory('Credits').then(data => {
      setCreditProducts(data);
      setIsLoading(false);
    }).catch(() => {
      setWebshopState(WebshopState.Error);
      setIsLoading(false);
    });
  }, [])

  return(
    <div>
      {
        webshopState === WebshopState.SelectProduct  &&
        <div>
          <div>Hier komt de cart</div>
          <div>Hier komen de buttons</div>
          <div>Hier komt de confirm</div>
        </div>
      }
      {
        webshopState === WebshopState.Error &&
          <div>Er is iets fout gegaan, ververs de pagina.</div>
      }
    </div>
  )
}