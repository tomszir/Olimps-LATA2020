import styled, { css } from 'styled-components';
import React, { useRef, useState } from 'react';
import { X } from 'react-feather';

import { useOutsideAlerter } from '../hooks';
import { mobile } from '../utils/breakpoints';

const S_Modal = styled.a`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;

  ${mobile(css`
    padding: 0;
  `)}
`;

const S_ModalContainer = styled.div`
  max-width: 568px;
  width: 100%;
  display: flex;
  flex-direction: column;

  ${mobile(css`
    height: 100%;
    max-width: 100%;
  `)}

  border-radius: 4px;
  background-color: ${p => p.theme.backgroundColor};

  & > * {
    color: ${p => p.theme.text.color};
  }
`;

const S_ModalHeader = styled.div`
  height: 80px;
  padding: 0 16px;
  border-bottom: 1px solid ${p => p.theme.mainNav.dividerColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const S_ModalContent = styled.div`
  padding: 16px;
  padding-bottom: 0;
  flex: 1;
  max-height: calc(100vh - 32px - 80px);
  overflow-y: auto;

  ${mobile(css`
    max-height: calc(100vh - 80px - 60px);
  `)}
`;

const S_HeaderLeft = styled.div`
  flex: 1;
`;

const S_HeaderMiddle = styled.div`
  flex: 10;
  display: flex;
  justify-content: center;
`;

const S_HeaderRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const S_HeaderTitle = styled.h4`
  text-align: center;
  font-family: 'Poppins', sans-serif;
`;

const S_CloseButton = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  padding: 8px;
  border-radius: 100%;
  color: ${p => p.theme.text.color};
  background-color: transparent;

  &:hover {
    background-color: ${p => p.theme.mainNav.dividerColor};
  }
`;

const S_Padding = styled.div`
  height: 16px;
`;

const S_Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  const modalContainerRef = useRef(null);

  useOutsideAlerter(modalContainerRef, () => {
    onClose();
  });

  if (!isOpen) {
    return null;
  }

  return (
    <S_Modal>
      <S_ModalContainer ref={modalContainerRef}>
        <S_ModalHeader>
          <S_HeaderLeft />
          <S_HeaderMiddle>
            <S_HeaderTitle>{title}</S_HeaderTitle>
          </S_HeaderMiddle>
          <S_HeaderRight>
            <S_CloseButton onClick={onClose}>
              <S_Icon as={X} size={20} />
            </S_CloseButton>
          </S_HeaderRight>
        </S_ModalHeader>
        <S_ModalContent>
          {children}
          <S_Padding />
        </S_ModalContent>
      </S_ModalContainer>
    </S_Modal>
  );
};

export const useModal = () => {
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return {
    isOpen,
    setOpen,
    open,
    close,
    handlers: {
      isOpen,
      onClose: close,
    },
  };
};

export default Modal;
