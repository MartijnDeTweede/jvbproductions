import React from "react";
import { TextBlock } from "../Components/TextBlock/TextBlock"
import { Button, ButtonColors } from "../Components/Buttons/Button";

export const ThankYouContainer: React.FC<{}> = () => {
  return(
  <div>
    <TextBlock 
      title="Bedankt voor je aankoop"
      text="We hebben je credits bijgewerkt. Je kunt ze dus direct gebruiken."
      cta={<Button colour={ButtonColors.Gray} text="Naar lessen" onClick={() => window.location.href = "/lessen"}/>}
    />
  </div>)
}