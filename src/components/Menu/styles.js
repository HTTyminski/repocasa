import styled from 'styled-components';
import { transparentize } from 'polished';

export const MenuContent = styled.ul`
  list-style: none;
  padding: 0;

  .menu__item {
    position: relative;

    a,
    button {
      appearance: none;
      align-items: center;
      background-color: transparent;
      border: 0;
      color: #fff;
      display: flex;
      padding: 14.5px 14px;
      text-decoration: none;
      width: 100%;

      span,
      svg {
        opacity: 0.5;
      }

      svg {
        height: 23px;
        margin-right: 15px;
        width: 23px;

        path {
          fill: #fff;
        }
      }

      &:hover {
        background: ${transparentize(0.9, '#fff')};
      }

      &.active {
        font-weight: 700;

        &:after {
          background-color: #fff;
          content: '';
          display: block;
          height: 50px;
          position: absolute;
          left: 0;
          top: 0;
          width: 6px;
        }

        span,
        svg {
          opacity: 1;
        }
      }
    }
  }

  .submenu {
    /* max-height: 0; */
    overflow: hidden;
    transition: all 0.5s ease-out;

    li {
      position: relative;

      > a {
        background-color: ${({ theme }) =>
          theme.cWhite && transparentize(0.9, theme.cWhite)};
        border-top: solid 1px ${({ theme }) => theme.hotelTwo};
        color: ${transparentize(0.3, '#fff')};
        padding: 11px 10px 11px 49px;

        &:hover {
          background-color: ${({ theme }) =>
            theme.cWhite && transparentize(0.8, theme.cWhite)};
          color: ${transparentize(0.3, '#fff')};
        }

        &.active {
          background-color: ${({ theme }) =>
            theme.cWhite && transparentize(0.9, theme.cWhite)};
          color: #fff;
          font-weight: 700;

          &:after {
            background-color: ${transparentize(0.3, '#fff')};
            content: '';
            display: block;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            width: 6px;
          }
        }
      }
    }

    &.open {
      display: block;
      max-height: 310px;
    }
  }
`;
