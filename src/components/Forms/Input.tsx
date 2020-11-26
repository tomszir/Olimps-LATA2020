import { rgba } from 'polished';
import React from 'react';
import styled from 'styled-components';

export interface InputProps {
  label?: string;

  placeholder?: string;

  validationMessages?: {
    empty?: string;
    invalid?: string;
  };

  value?: any;
  onFocus?: () => void;
  onSubmit?: () => void;
  onEnter?: () => void;
  onChange?: (value: string) => void;
}

const SInputWrapper = styled.div`
  width: 100%;
  & + & {
    margin-top: 12px;
  }
`;

const SInputLabel = styled.h5`
  margin-bottom: 10px;
  color: ${p => rgba(p.theme.text.color, 0.8)};
  font-family: 'Poppins', sans-serif;
`;

const SInput = styled.input`
  outline: none;

  padding: 8px 10px;
  width: 100%;

  color: ${p => p.theme.input.contentColor};

  border-radius: 4px;
  border: 1px solid ${p => p.theme.input.borderColor};
  background-color: ${p => p.theme.input.backgroundColor};

  font-size: 14px;
  font-family: 'Poppins', sans-serif;

  &:hover,
  &:focus {
    border-color: ${p => p.theme.input.borderColorActive};
    background-color: ${p => p.theme.input.backgroundColorActive};
  }

  &:focus {
    box-shadow: 0 0 0 4px ${p => p.theme.primaryColor + '3f'};
  }
`;

const Input: React.FC<InputProps> = ({ label, value, onChange, onEnter, ...props }) => {
  const [_value, setValue] = React.useState<any>('');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (onChange) {
      onChange(e.target.value as string);
    }
  };

  const onKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      if (onEnter) {
        onEnter();
      }
    }
  };

  return (
    <SInputWrapper>
      {label && <SInputLabel>{label}</SInputLabel>}
      <SInput
        value={value ? value : _value}
        onChange={onInputChange}
        onKeyDown={onKeydown}
        {...props}
      />
    </SInputWrapper>
  );
};

export default Input;
