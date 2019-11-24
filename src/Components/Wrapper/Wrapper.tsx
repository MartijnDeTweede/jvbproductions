import React from 'react';
import './Wrapper.css';
import classNames from 'classnames';
export const Wrapper: React.FC<{centralizeContent?: boolean}> = ({children, centralizeContent = false}) => {
  return (
    <div className={classNames("Wrapper", {
      "Wrapper__CentrizeContent": centralizeContent
    })}>
      {children}
    </div>
  )
}