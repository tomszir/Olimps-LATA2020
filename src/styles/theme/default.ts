import { darken, rgba } from 'polished';

const defaultTheme = {
  borderRadius: '4px',
  containerWidth: '978px',

  primaryColor: '#7bc678',
  primaryColorContrast: '#347A33',

  backgroundColor: '#f1f1f1',

  text: {
    color: '#1f1f1f',
    fontFamily: 'Roboto, sans-serif',
  },

  sideNav: {
    item: {
      color: '#aeaeaf',
      colorHover: '#f1f1f1',
      colorActive: '#7bc678',
    },
    backgroundColor: '#141419',
    dividerColor: '#242429',
  },

  mainNav: {
    dividerColor: '#e4e4e7',
    backgroundColor: 'transparent',
  },

  input: {
    contentColor: '#1f1f1f',
    placeholderColor: '#343434',

    borderColor: 'transparent',
    borderColorActive: '#7bc678',

    backgroundColor: '#e4e4e7',
    backgroundColorActive: '#e4e4e75f',
  },

  button: {
    primary: {
      color: '#fff',
      borderColor: 'transparent',
      backgroundColor: darken('0.15', '#7bc678'),
    },
    secondary: {
      color: darken('0.15', '#7bc678'),
      borderColor: darken('0.15', '#7bc678'),
      backgroundColor: rgba(darken('0.15', '#7bc678'), 0.05),
    },
  },
};

export default defaultTheme;
