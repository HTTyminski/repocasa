import styled from 'styled-components';

export const UserDropDownContent = styled.div`
  align-items: center;
  border-left: solid 1px #f6f7ff;
  color: #fff;
  display: flex;
  height: 80px;
  margin-left: auto;
  max-width: 247px;
  position: relative;
  width: 100%;
  z-index: 3;

  button {
    align-items: center;
    appearance: none;
    background-color: transparent;
    border: 0;
    color: #8a97b1;
    display: flex;
    margin-left: 30px;
    margin-right: 27px;
    width: 100%;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100px;
    }

    svg {
      color: #00305e;
      height: 32px;
      margin-right: 12px;
      width: 32px;
    }

    .UserAvatar {
      margin-right: 12px;

      &--inner {
        color: #fff;
      }
    }

    .icon-arrow {
      fill: #8a97b1;
      height: 7px;
      margin-left: auto;
      margin-right: 15px;
      width: 12px;
    }
  }

  .dropdown {
    align-items: center;
    background-color: #fff;
    border-radius: 3px;
    border: 2px solid #f6f7ff;
    box-shadow: 0px 3px 6px 0px #f6f7ff;
    display: flex;
    flex-direction: column;
    right: 12px;
    margin-top: -15px;
    max-width: 135px;
    position: absolute;
    top: 100%;
    width: 100%;
    z-index: 2;

    &:after,
    &:before {
      bottom: 100%;
      left: 75%;
      border: solid transparent;
      content: ' ';
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }

    &:after {
      border-color: rgba(255, 255, 255, 0);
      border-bottom-color: #fff;
      border-width: 8px;
      margin-left: -8px;
    }

    &:before {
      border-color: rgba(246, 247, 255, 0);
      border-bottom-color: #f6f7ff;
      border-width: 11px;
      margin-left: -11px;
    }

    a {
      color: #8a97b1;
      font-size: 12px;
      padding: 7px 0;
      text-decoration: none;
      transition: all 300ms ease-out;
      width: 100%;

      &:hover {
        background-color: #f6f7ff;
      }

      span {
        padding: 0 11px;
      }
    }
  }
`;
