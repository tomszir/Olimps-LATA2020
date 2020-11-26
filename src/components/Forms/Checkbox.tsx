import React from 'react';

export interface CheckboxProps {}

const Checkbox: React.FC<CheckboxProps> = ({ ...props }) => {
  return <input type='checkbox' {...props} />;
};

export default Checkbox;
