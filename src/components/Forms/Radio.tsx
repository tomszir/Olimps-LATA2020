import React from 'react';

export interface RadioProps {}

const Radio: React.FC<RadioProps> = ({ ...props }) => {
  return <input type='radio' {...props} />;
};

export default Radio;
