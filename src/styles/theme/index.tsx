import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { Theme } from '@/types';
import { RootState } from '@/context';

import darkTheme from './dark';
import defaultTheme from './default';

export const themes: { [key in Theme]: any } = {
  [Theme.DEFAULT]: defaultTheme,
  [Theme.DARK]: darkTheme,
};

const StyledThemeProvider: React.FC = ({ children }) => {
  const { theme } = useSelector((state: RootState) => state.theme);
  console.log(theme);

  return <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>;
};

export default StyledThemeProvider;
