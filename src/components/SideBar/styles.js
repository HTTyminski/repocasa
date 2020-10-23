import styled from 'styled-components';

export const StyledSideBar = styled.aside`
  background: ${({ theme }) => theme.cWhite};
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
  text-align: left;
  margin-right: ${({ open }) => (open ? '0' : '-247px')};
  transition: all 300ms ease;
  min-width: 247px;
  max-width: 247px;
  z-index: 2;
  position: relative;

  /* @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  } */

  .aside__header {
    align-items: center;
    border-bottom: solid 1px #f2f3ff;
    display: flex;
    padding: 0 17px;
  }

  .aside__header-title {
    align-items: center;
    display: flex;
    flex: 1;
    font-weight: 500;
    padding: 11px 0;

    svg {
      fill: #00305e;
      height: 24px;
      width: 24px;
    }

    span {
      color: #6d7882;
      margin-left: 13px;
    }
  }

  .aside__header-button {
    svg {
      fill: #00305e;
      height: 12px;
      width: 6px;
    }
  }

  .aside__content {
    padding: 0 11px 0 17px;
  }

  .aside__content-title {
    display: block;
    color: #6d7882;
    font-weight: 500;
    margin-top: 28px;
  }

  .aside__content-button {
    align-items: center;
    background-color: #f2f3ff;
    border-radius: 3px;
    border: solid 1px #fff;
    cursor: pointer;
    color: #8a97b1;
    display: flex;
    font-size: 16px;
    margin-top: 10px;
    padding: 5px 12px;
    justify-content: space-between;

    &:hover,
    &--selected {
      background-color: #00305e;
      color: #fff;
      font-weight: 500;

      span {
        svg {
          fill: #fff !important;
        }
      }
    }

    span {
      display: flex;
      align-items: center;

      svg {
        fill: #8a97b1;
        margin-right: 12px;
      }
    }

    > div {
      display: flex;
    }
  }
`;

export const IconCheckBox = styled.svg`
  fill: none;
  /* stroke: white; */
`;

export const HiddenCheckBox = styled.input.attrs({
  type: 'radio',
})`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const StyledCheckBox = styled.div`
  /* background: ${props => (props.checked ? '#00305e' : '#f6f7ff')}; */
  border-radius: 3px;
  display: inline-block;
  /* height: 16px; */
  transition: all 150ms;
  width: 16px;

  ${HiddenCheckBox}:focus + & {
    /* box-shadow: 0 0 0 3px red; */
  }

  ${IconCheckBox} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`;

export const CheckBoxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;
