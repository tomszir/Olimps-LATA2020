import styled from 'styled-components';
import React from 'react';
import { rgba } from 'polished';

export type ButtonType = 'primary' | 'secondary';

export interface ButtonProps {
  type?: ButtonType;
  onClick?: () => void;
}

const S_Button = styled.button<{ themeType: ButtonType }>`
  cursor: pointer;

  outline: none;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 4px;
  padding: 8px 14px;

  border-radius: 4px;

  color: ${p => p.theme.button[p.themeType].color};
  border: 1px solid ${p => p.theme.button[p.themeType].borderColor};
  background-color: ${p => p.theme.button[p.themeType].backgroundColor};

  font-family: 'Poppins', sans-serif;

  &:active,
  &:hover {
    background-color: ${p => p.theme.button[p.themeType].backgroundColor};
  }

  &:active {
    box-shadow: 0 0 0 4px ${p => rgba(p.theme.primaryColor, 0.3)};
  }
`;

const Button: React.FC<ButtonProps> = ({ children, type = 'primary', ...props }) => {
  return (
    <S_Button themeType={type} {...props}>
      {children}
    </S_Button>
  );
};

export default Button;
