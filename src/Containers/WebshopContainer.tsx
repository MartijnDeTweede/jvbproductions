import React, {useState, useEffect } from 'react';
import { Product } from './product';
import { getProductsByCategory, finalizeCheckout } from '../Helpers/ApiHelpers';
import { Message, MessageType } from '../Components/ClassRoom/ClassRoom';
import { Button, ButtonColors } from '../Components/Buttons/Button';
import { Cart } from '../Components/Cart/Cart';
import { ProductButton } from '../Components/Buttons/ProductButton';
import { Wrapper } from '../Components/Wrapper/Wrapper';

enum WebshopState {
  SelectProduct = "SelectProduct",
  Error = "Error",
  Login = "Login",
}

export const WebshopContainer: React.FC<{
  user: firebase.User | undefined
  signInWithGoogle: () => void,
}> = (user, signInWithGoogle) => {

  const [creditProducts, setCreditProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const defaultLessonState = user ? WebshopState.SelectProduct : WebshopState.Login;
  const [webshopState, setWebshopState] = useState<WebshopState>(defaultLessonState);
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
          <Wrapper centralizeContent>
            {
              creditProducts.map(creditproduct => (
                <ProductButton
                  product={creditproduct}
                  onClick={() => setSelectedProduct(creditproduct)}
                />
              ))
            }
          </Wrapper>
          <Wrapper centralizeContent>
            <Cart
              selectedProduct={selectedProduct}
              clearCart={() => setSelectedProduct(undefined)}
            />
          </Wrapper>
          <Button
            text="Bestelling plaatsen"
            disabled={!user || !selectedProduct}
            onClick={() => {
              if(user && user.user && selectedProduct) {
                finalizeCheckout(user.user.uid, selectedProduct.productCode)
              }
            }}
            colour={ButtonColors.Green}
            large
          />
        </div>
      }
            {
        webshopState === WebshopState.Login &&
        <div>
          <Message message="Je moet inloggen om de webshhop te kunnen gebruiken." messageType={MessageType.Error} />
          <Button onClick={signInWithGoogle} text="Login met Google" colour={ButtonColors.Gray} />
        </div>
        }
      {
        webshopState === WebshopState.Error &&
        <Message message="Er is iets mis gegaan, ververs de pagina of neem contact op met ons." messageType={MessageType.Error} />
      }
    </div>
  )
}