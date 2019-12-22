import React, { ReactNode } from "react";
import "./TextBlock.css";
import { Wrapper } from "../Wrapper/Wrapper";

export const TextBlock: React.FC<{title: string; text: string, cta?: ReactNode}> = ({title, text, cta}) => {
  return (
    <Wrapper>
    <div className="textBlock">
      <h2>{title}</h2>
      <div className="textBlock__text">{text}</div>
      {
       cta && <div className="textBlock__cta">
         {cta}
        </div>
      }
    </div>

    </Wrapper>
  )
}