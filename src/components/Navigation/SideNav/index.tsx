import styled, { css } from 'styled-components';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Map, Home, Menu, Book, Settings, Sun, Moon, BarChart2 } from 'react-feather';

import { Theme } from '@/types';
import { setTheme } from '@/context/theme';
import { useIsMobile } from '@/hooks';
import { mobile } from '@/utils/breakpoints';
import { RootState } from '@/context';

import Button from './Button';
import MainItem from './MainItem';

const S_Header = styled.div`
  height: 60px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  padding: 0 18px;
  border-bottom: 1px solid ${p => p.theme.sideNav.dividerColor};

  ${mobile(css`
    display: none;
  `)}
`;

const S_HeaderTitle = styled.h3`
  color: #fff;
  font-family: 'Poppins', sans-serif;
`;

const S_Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  width: 100%;
  height: 50px;
  padding: 8px 0;

  ${mobile(css`
    padding: 0;
    flex-direction: row;
  `)}
`;

const S_FooterContent = styled.div`
  display: flex;
  flex-direction: row;

  padding: 8px;
  width: 100%;
  border-top: 1px solid ${p => p.theme.sideNav.dividerColor};

  justify-content: flex-end;

  & > *:first-child {
    flex: 1;
    margin-right: 8px;
  }

  ${mobile(css`
    display: none;
  `)}
`;

const S_SideNav = styled.nav`
  width: 240px;
  height: 100%;

  display: flex;
  flex-direction: column;

  background-color: ${p => p.theme.sideNav.backgroundColor};
  border-right: 1px solid ${p => p.theme.sideNav.dividerColor};

  ${mobile(css`
    z-index: 1000000;
    width: 100%;
    height: 60px;
    position: absolute;
    bottom: 0;
  `)}
`;

const SideNavBar: React.FC<{
  onSettingsClick?: () => void;
}> = ({ onSettingsClick }) => {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.theme);

  const toggleTheme = () => {
    dispatch(setTheme(theme === Theme.DEFAULT ? Theme.DARK : Theme.DEFAULT));
  };

  return (
    <S_SideNav>
      <S_Header>
        <S_HeaderTitle>Tripoo</S_HeaderTitle>
      </S_Header>
      <S_Content>
        <MainItem to='/' label='Home' icon={Home} />
        <MainItem to='/map' label='Map' icon={Map} />
        <MainItem to='/trips' label='My Trips' icon={Book} />
        <MainItem to='/scoreboard' label='Scoreboard' icon={BarChart2} />
        {/*isMobile && <MainItem to='/none' label='Menu' icon={Menu} />*/}
      </S_Content>
      <S_FooterContent>
        <Button onClick={onSettingsClick && onSettingsClick}>
          <Settings size={20} />
        </Button>
        <Button onClick={toggleTheme}>
          {theme === Theme.DARK && <Sun size={20} />}
          {theme === Theme.DEFAULT && <Moon size={20} />}
        </Button>
      </S_FooterContent>
    </S_SideNav>
  );
};

export default SideNavBar;
