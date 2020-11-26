import styled from 'styled-components';
import React from 'react';

export interface AlertProps {
  message: string;
}

const S_Alert = styled.div`
  padding: 8px 12px;
  display: flex;
  align-items: center;

  color: ${p => p.theme.text.color};
  background-color: #c531512f;
  border: 1px solid #c531514f;
`;

const S_Label = styled.p`
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
`;

const Alert: React.FC<AlertProps> = ({ message }) => {
  return (
    <S_Alert>
      <S_Label>{message}</S_Label>
    </S_Alert>
  );
};

export default Alert;
