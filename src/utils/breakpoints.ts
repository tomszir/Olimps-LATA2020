import { css } from 'styled-components';

export const MOBILE_BREAKPOINT = 768;
export const SMALL_SCREEN_BREAKPOINT = 978;

export const mobile = (s: any) => css`
  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    ${s}
  }
`;

export const smallScreen = (s: any, p: number = 0) => css`
  @media only screen and (max-width: ${SMALL_SCREEN_BREAKPOINT - p}px) {
    ${s}
  }
`;
