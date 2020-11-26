import styled from 'styled-components';
import React from 'react';

export interface ButtonProps {
  onClick?: () => void;
}

const S_Button = styled.button`
  cursor: pointer;
  outline: none;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px;

  border-radius: 4px;
  border: 1px solid transparent;

  color: #fff;
  background-color: #343439;

  font-family: 'Poppins', sans-serif;

  &:active,
  &:hover {
    border: 1px solid ${p => p.theme.primaryColor};
  }

  &:active {
    box-shadow: 0 0 0 4px ${p => p.theme.primaryColor + '3f'};
  }
`;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <S_Button {...props}>{children}</S_Button>;
};

export default Button;
