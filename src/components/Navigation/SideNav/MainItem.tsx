import styled from 'styled-components';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const PADDING = [10, 16];

const S_Indicator = styled.span`
  width: 4px;
  height: 100%;

  margin-right: 18px;

  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;

  background-color: transparent;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const S_Icon = styled.span<{
  color?: string;
  size?: string | number;
}>`
  color: ${p => p.theme.sideNav.item.color};
  margin-right: ${PADDING[1] - 2}px;

  @media only screen and (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 2px;
  }
`;

const S_Label = styled.span`
  color: ${p => p.theme.sideNav.item.color};
  font-size: 16px;
  font-family: 'Poppins', sans-serif;

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const S_Item = styled(NavLink)`
  outline: none;
  position: relative;
  text-decoration: none;

  display: flex;
  align-items: center;
  flex-direction: space-between;

  padding: ${PADDING[0]}px ${PADDING[1]}px;
  padding-left: 0;

  &:hover {
    & ${S_Icon}, & ${S_Label} {
      color: ${p => p.theme.sideNav.item.colorHover};
    }
  }

  &.active {
    & ${S_Icon}, & ${S_Label} {
      color: ${p => p.theme.sideNav.item.colorActive};
    }

    ${S_Indicator} {
      background-color: ${p => p.theme.sideNav.item.colorActive};
    }
  }

  @media only screen and (max-width: 768px) {
    flex: 1;
    padding: 0;
    height: 100%;
    flex-direction: column;
    justify-content: center;
  }
`;

export interface MainItemProps {
  to: string;
  label: string;
  icon: React.FC<{
    color?: string;
    size?: string | number;
  }>;
}

const MainItem: React.FC<MainItemProps> = ({ to, icon, label }) => {
  return (
    <S_Item exact to={to} activeClassName='active'>
      <S_Indicator />
      <S_Icon as={icon} size={20} />
      <S_Label>{label}</S_Label>
    </S_Item>
  );
};

export default MainItem;
