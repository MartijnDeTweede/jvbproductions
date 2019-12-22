import React from   'react';
import { Link } from 'react-router-dom';
import { TextBlock } from '../Components/TextBlock/TextBlock';
import { Button, ButtonColors } from '../Components/Buttons/Button';

export const HomePageContainer: React.FC = () => {
  return <div>
    <h1>Welkom op Joe Guitar</h1>
    <div>Placeholder voor CTA naar lessen</div>
    <TextBlock 
      title="Hoe werkt het?"
      text="Wij bieden online lessen aan. Je selecteerd eerst een lespakket. Ieder lespakket bestaat uit meerdere oefeningen.
      Als je alle oefeningen gedaan hebt kan je een liedje spelen."
      cta={<Button colour={ButtonColors.Gray} text="Naar lessen" onClick={() => window.location.href = "/lessen"}/>}
    />

    <TextBlock 
      title="Zijn alle lessen gratis?"
      text="Sommige lessen zijn gratis, andere niet. Ook wij moeten natuurlijk een boterham verdienen. Maar, we zijn nooit duur."
      cta={<Button colour={ButtonColors.Gray} text="Naar webshop" onClick={() => window.location.href = "/webshop"}/>}
    />


    <TextBlock 
      title="Hoe kan ik betalen?"
      text="Je kunt credits kopen in de webshop. Deze kan je gewoon met iDeal afrekenen."
      cta={<Button colour={ButtonColors.Gray} text="Naar webshop" onClick={() => window.location.href = "/webshop"}/>}
    />


    <TextBlock 
      title="Ik heb een vraag of klacht."
      text="Neem gewoon contact met ons op, we bijten niet, maar helpen je wel. je kunt ons bereiken op info@jvbproductions.nl."
    />
    </div>;
};
