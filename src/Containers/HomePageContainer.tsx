import React from   'react';
import { TextBlock } from '../Components/TextBlock/TextBlock';
import { Button, ButtonColors } from '../Components/Buttons/Button';

export const HomePageContainer: React.FC = () => {
  return <div>
    <h1>Welcome to Joe Guitar</h1>
    <TextBlock 
      title="How does it work?"
      text="We offer online lesson as a service. You first select a lesson and then an exercise. Afterwards you can play the song."
      cta={<Button colour={ButtonColors.Gray} text="To lessons" onClick={() => window.location.href = "/lessons"}/>}
    />

    <TextBlock 
      title="Are all lessons for free?"
      text="Some lessons are free, some are not, however, they are never expensive."
      cta={<Button colour={ButtonColors.Gray} text="To webshop" onClick={() => window.location.href = "/webshop"}/>}
    />


    <TextBlock 
      title="How dan I pay?"
      text="You can pay using iDeal in the webshop."
      cta={<Button colour={ButtonColors.Gray} text="To webshop" onClick={() => window.location.href = "/webshop"}/>}
    />


    <TextBlock 
      title="I have a question or a complaint."
      text="Please contact us at info@jvbproductions.nl."
    />
    </div>;
};
