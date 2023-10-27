import { CSSProperties, css } from "styled-components";

export const xs = (props: {}) => {
  return css`
    @media screen and (min-width: 360px) {
      ${props}
    }
  `;
};

export const sm = (props: {}) => {
  return css`
    @media screen and (min-width: 460px) {
      ${props}
    }
  `;
};

export const md = (props: {}) => {
  return css`
    @media screen and (min-width: 768px) {
      ${props}
    }
  `;
};

export const lg = (props: {}) => {
  return css`
    @media screen and (min-width: 1024px) {
      ${props}
    }
  `;
};
