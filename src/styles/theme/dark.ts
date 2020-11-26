import { rgba } from 'polished';
import { merge } from 'lodash';

import defaultTheme from './default';

const darkTheme = merge({}, defaultTheme, {
  borderRadius: 4,

  primaryColorContrast: '#7bc678',
  backgroundColor: '#383842',

  text: {
    color: '#f1f1f1',
    fontFamily: 'Roboto, sans-serif',
  },

  mainNav: {
    dividerColor: '#545462',
    backgroundColor: '#383842',
  },

  input: {
    contentColor: '#f1f1f1',
    placeholderColor: '#a3a3a3',

    backgroundColor: '#545462',
    backgroundColorActive: '#5454625f',
  },

  button: {
    primary: {
      color: '#fff',
      borderColor: 'transparent',
      backgroundColor: '#7bc678',
    },
    secondary: {
      color: '#7bc678',
      borderColor: '#7bc678',
      backgroundColor: rgba('#7bc678', 0.05),
    },
  },
});

export default darkTheme;
